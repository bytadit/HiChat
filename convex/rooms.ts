import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRoom = mutation({
  args: {
    participants: v.array(v.id("users")),
    isGroup: v.boolean(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.id("_storage")),
    admin: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");
    const existingRoom = await ctx.db
      .query("rooms")
      .filter((q) =>
        q.or(
          q.eq(q.field("participants"), args.participants),
          q.eq(q.field("participants"), args.participants.reverse())
        )
      )
      .first();
    if (existingRoom) {
      return existingRoom._id;
    }
    let imageUrl;
    if (args.imageUrl) {
      imageUrl = (await ctx.storage.getUrl(args.imageUrl)) as string;
    }
    const roomId = await ctx.db.insert("rooms", {
      participants: args.participants,
      isGroup: args.isGroup,
      name: args.name,
      imageUrl,
      admin: args.admin,
    });
    return roomId;
  },
});

export const getMyRooms = query({
  args: {},
  handler: async (ctx, args) => {
    const customerKingToken = "token_kingcustomer";
    const identity = await ctx.auth.getUserIdentity();
    const user = !identity
      ? await ctx.db
          .query("users")
          .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", customerKingToken)
          )
          .unique()
      : await ctx.db
          .query("users")
          .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier)
          )
          .unique();
    if (!user) throw new ConvexError("User not found");
    const rooms = await ctx.db.query("rooms").collect();
    const myRooms = rooms.filter((room) => {
      return room.participants.includes(user._id);
    });
    const roomsWithDetails = await Promise.all(
      myRooms.map(async (room) => {
        let userDetails = {};
        if (!room.isGroup) {
          const otherUserId = room.participants.find((id) => id !== user._id);
          const userProfile = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), otherUserId))
            .take(1);
          userDetails = userProfile[0];
        }
        const lastMessage = await ctx.db
          .query("messages")
          .filter((q) => q.eq(q.field("room"), room._id))
          .order("desc")
          .take(1);
        return {
          ...userDetails,
          ...room,
          lastMessage: lastMessage[0] || null,
        };
      })
    );
    return roomsWithDetails;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
