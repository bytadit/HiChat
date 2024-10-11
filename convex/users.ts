import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.string(),
    role: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      isOnline: true,
      role: 2,
    });
  },
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), imageUrl: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
    });
  },
});

export const setUserOnline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, { isOnline: true });
  },
});

export const setUserOffline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, { isOnline: false });
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    // if (!identity) {
    //     return;
    //   }
    if (!identity) throw new ConvexError("Unauthorized");

    const users = await ctx.db.query("users").collect();
    return users.filter(
      (user) => user.tokenIdentifier !== identity.tokenIdentifier
    );
  },
});

export const getMe = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    // if (!identity) {
    //   return;
    // }
    if (!identity) throw new ConvexError("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getGroupMembers = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //     return;
    //   }
    if (!identity) throw new ConvexError("Unauthorized");

    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("_id"), args.roomId))
      .first();
    if (!room) {
      throw new ConvexError("room not found");
    }

    const users = await ctx.db.query("users").collect();
    const groupMembers = users.filter((user) =>
      room.participants.includes(user._id)
    );

    return groupMembers;
  },
});
