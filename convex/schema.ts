import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
        email: v.string(),
		name: v.optional(v.string()),
		imageUrl: v.string(),
		tokenIdentifier: v.string(),
        isOnline: v.boolean(),
	}).index("by_tokenIdentifier", ["tokenIdentifier"]),

	rooms: defineTable({
		participants: v.array(v.id("users")),
		isGroup: v.boolean(),
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
		admin: v.optional(v.id("users")),
	}),

	messages: defineTable({
		room: v.id("rooms"),
		sender: v.string(),
		message: v.string(),
		type: v.union(v.literal("text"), v.literal("image"), v.literal("video"), v.literal("document")),
	}).index("by_room", ["room"]),
});