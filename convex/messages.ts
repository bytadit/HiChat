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
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
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
  },
});

export const getMessages = query({
  args: {
    room: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const customerKingToken = "token_kingcustomer";
    const customerKingId = "j97b23zqd3ryb5pzhdv37mhqg572ez83";
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", customerKingToken)
      )
      .unique();
    // if (!identity) {
    // 	throw new Error("Unauthorized");
    // }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_room", (q) => q.eq("room", args.room))
      .collect();

    const userProfileCache = new Map();

    const messagesWithSender = await Promise.all(
      messages.map(async (message) => {
        let sender;
        if (userProfileCache.has(message.sender)) {
          sender = userProfileCache.get(message.sender);
        } else {
          sender = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), message.sender))
            .first();
          userProfileCache.set(message.sender, sender);
        }

        return { ...message, sender };
      })
    );

    console.log('messagesWithSender', messagesWithSender)

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
  args: {
    videoId: v.id("_storage"),
    sender: v.id("users"),
    room: v.id("rooms"),
  },
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
