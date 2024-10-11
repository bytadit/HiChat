import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const sendTextMessage = mutation({
	args: {
		sender: v.string(),
		message: v.string(),
		room: v.id("rooms"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Not authenticated");
		}

		const user = await ctx.db
			.query("users")
			.withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
			.unique();

		if (!user) {
			throw new ConvexError("User not found");
		}

		const room = await ctx.db
			.query("rooms")
			.filter((q) => q.eq(q.field("_id"), args.room))
			.first();

		if (!room) {
			throw new ConvexError("Room not found");
		}

		if (!room.participants.includes(user._id)) {
			throw new ConvexError("You are not part of this room");
		}

		await ctx.db.insert("messages", {
			sender: args.sender,
			message: args.message,
			room: args.room,
			type: "text",
		});

		// // TODO => add @gpt check later
		// if (args.message.startsWith("@gpt")) {
		// 	// Schedule the chat action to run immediately
		// 	await ctx.scheduler.runAfter(0, api.openai.chat, {
		// 		messageBody: args.content,
		// 		conversation: args.conversation,
		// 	});
		// }

		// if (args.content.startsWith("@dall-e")) {
		// 	await ctx.scheduler.runAfter(0, api.openai.dall_e, {
		// 		messageBody: args.content,
		// 		conversation: args.conversation,
		// 	});
		// }
	},
});

// export const sendChatGPTMessage = mutation({
// 	args: {
// 		content: v.string(),
// 		conversation: v.id("conversations"),
// 		messageType: v.union(v.literal("text"), v.literal("image")),
// 	},
// 	handler: async (ctx, args) => {
// 		await ctx.db.insert("messages", {
// 			content: args.content,
// 			sender: "ChatGPT",
// 			messageType: args.messageType,
// 			conversation: args.conversation,
// 		});
// 	},
// });

// Optimized
export const getMessages = query({
	args: {
		room: v.id("rooms"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const messages = await ctx.db
			.query("messages")
			.withIndex("by_room", (q) => q.eq("room", args.room))
			.collect();

		const userProfileCache = new Map();

		const messagesWithSender = await Promise.all(
			messages.map(async (message) => {
				// if (message.sender === "ChatGPT") {
				// 	const image = message.messageType === "text" ? "/gpt.png" : "dall-e.png";
				// 	return { ...message, sender: { name: "ChatGPT", image } };
				// }
				let sender;
				// Check if sender profile is in cache
				if (userProfileCache.has(message.sender)) {
					sender = userProfileCache.get(message.sender);
				} else {
					// Fetch sender profile from the database
					sender = await ctx.db
						.query("users")
						.filter((q) => q.eq(q.field("_id"), message.sender))
						.first();
					// Cache the sender profile
					userProfileCache.set(message.sender, sender);
				}

				return { ...message, sender };
			})
		);

		return messagesWithSender;
	},
});

export const sendImage = mutation({
	args: { imgId: v.id("_storage"), sender: v.id("users"), room: v.id("rooms") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const message = (await ctx.storage.getUrl(args.imgId)) as string;

		await ctx.db.insert("messages", {
			message: message,
			sender: args.sender,
			type: "image",
			room: args.room,
		});
	},
});

export const sendVideo = mutation({
	args: { videoId: v.id("_storage"), sender: v.id("users"), room: v.id("rooms") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const message = (await ctx.storage.getUrl(args.videoId)) as string;

		await ctx.db.insert("messages", {
			message: message,
			sender: args.sender,
			type: "video",
			room: args.room,
		});
	},
});

export const sendDocument = mutation({
	args: { docId: v.id("_storage"), sender: v.id("users"), room: v.id("rooms") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const message = (await ctx.storage.getUrl(args.docId)) as string;

		await ctx.db.insert("messages", {
			message: message,
			sender: args.sender,
			type: "document",
			room: args.room,
		});
	},
});

// unoptimized

// export const getMessages = query({
// 	args:{
// 		conversation: v.id("conversations"),
// 	},
// 	handler: async (ctx, args) => {
// 		const identity = await ctx.auth.getUserIdentity();
// 		if (!identity) {
// 			throw new ConvexError("Not authenticated");
// 		}

// 		const messages = await ctx.db
// 		.query("messages")
// 		.withIndex("by_conversation", q=> q.eq("conversation", args.conversation))
// 		.collect();

// 		// john => 200 , 1
// 		const messagesWithSender = await Promise.all(
// 			messages.map(async (message) => {
// 				const sender = await ctx.db
// 				.query("users")
// 				.filter(q => q.eq(q.field("_id"), message.sender))
// 				.first();

// 				return {...message,sender}
// 			})
// 		)

// 		return messagesWithSender;
// 	}
// });