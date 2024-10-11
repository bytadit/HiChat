// import { internalMutation, mutation } from "./_generated/server";
// import { createUser } from "@/../../convex/users"; // Assuming createUser is in this file
// import { createRoom } from "@/../../convex/rooms"; // Assuming createRoom is in this file
// import { sendTextMessage } from "@/../../convex/messages"; // Assuming sendTextMessage is in this file
// import { Id } from "convex/values"; // Importing Id from convex

// export const seedDatabase = internalMutation({
//   handler: async (ctx) => {
//     // Check if there are already users in the database to avoid re-seeding
//     const existingUsers = await ctx.db.query("users").collect();
//     if (existingUsers.length > 0) {
//       console.log("Users already exist, skipping seed.");
//       return;
//     }

//     // Users data
//     const users = [
//       {
//         _id: "j97e3v52akaej4rbha85e4bqz172fs5g",
//         name: "Admin",
//         email: "admin@mail.com",
//         imageUrl:
//           "https://static.vecteezy.com/system/resources/thumbnails/043/900/708/small_2x/user-profile-icon-illustration-vector.jpg",
//         isOnline: true,
//         tokenIdentifier: "token_admin",
//       },
//       {
//         _id: "j975rjztz53wrwb139dq02dp4d72d6qg",
//         name: "Agent A",
//         email: "agent@mail.com",
//         imageUrl:
//           "https://static.vecteezy.com/system/resources/previews/017/329/584/non_2x/parent-smiling-icon-flat-happy-person-vector.jpg",
//         isOnline: false,
//         tokenIdentifier: "token_agent",
//       },
//       {
//         _id: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         name: "King Customer",
//         email: "kingcust@mail.com",
//         imageUrl:
//           "https://static.vecteezy.com/system/resources/previews/034/874/688/large_2x/ai-generated-king-avatar-gamer-icon-clip-art-sticker-decoration-simple-background-free-photo.jpg",
//         isOnline: true,
//         tokenIdentifier: "token_kingcustomer",
//       },
//       {
//         _id: "j97pl01jkk3w5ghh56gsbhu6788bshjj",
//         name: "Queen Customer",
//         email: "queencust@mail.com",
//         imageUrl:
//           "https://static.vecteezy.com/system/resources/previews/021/804/982/non_2x/queen-icon-style-vector.jpg",
//         isOnline: true,
//         tokenIdentifier: "token_queencustomer",
//       },
//     ];

//     for (const user of users) {
//       await ctx.db.insert("users", user);
//     }

//     const rooms = [
//       {
//         admin: Id("users", "j97e3v52akaej4rbha85e4bqz172fs5g"),
//         isGroup: true,
//         name: "Group Product A",
//         participants: [
//           Id("users", "j97e3v52akaej4rbha85e4bqz172fs5g"),
//           Id("users", "j975rjztz53wrwb139dq02dp4d72d6qg"),
//           Id("users", "j97dv01bwg3w5arcd9c9c6p3xn72crp7"),
//         ],
//       },
//       {
//         isGroup: false,
//         participants: [
//           Id("users", "j97dv01bwg3w5arcd9c9c6p3xn72crp7"),
//           Id("users", "j97pl01jkk3w5ghh56gsbhu6788bshjj"),
//         ],
//       },
//     ];

//     // Insert rooms using createRoom mutation
//     const roomIds = [];
//     for (const room of rooms) {
//       const roomId = await createRoom(ctx, room);
//       roomIds.push(roomId);
//     }

//     const messages = [
//       {
//         room: roomIds[0],
//         message: "Selamat malam",
//         sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         type: "text",
//       },
//       {
//         room: roomIds[0],
//         message: "Malam",
//         sender: "j975rjztz53wrwb139dq02dp4d72d6qg",
//         type: "text",
//       },
//       {
//         room: roomIds[0],
//         message: "Ada yang bisa saya bantu?",
//         sender: "j975rjztz53wrwb139dq02dp4d72d6qg",
//         type: "text",
//       },
//       {
//         room: roomIds[0],
//         message:
//           "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
//         sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         type: "text",
//       },
//       {
//         room: roomIds[0],
//         message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
//         sender: "j975rjztz53wrwb139dq02dp4d72d6qg",
//         type: "text",
//       },

//       {
//         room: roomIds[0],
//         message:
//           "https://agreeable-koala-997.convex.cloud/api/storage/2e207bbc-7b6e-4f67-844c-48e333362d46",
//         sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         type: "image",
//       },
//       {
//         room: roomIds[0],
//         message:
//           "https://agreeable-koala-997.convex.cloud/api/storage/17d77201-a793-402a-8150-e566e606ff76",
//         sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         type: "video",
//       },
//       {
//         room: roomIds[0],
//         message:
//           "https://agreeable-koala-997.convex.cloud/api/storage/945d2d50-d982-4f97-8bdb-68f176cccef9",
//         sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         type: "document",
//       },

//       {
//         room: roomIds[1],
//         message:
//           "Hello King! Bukti bayarnya dah kamu kirim belom? Cepetan bilang ke grup dong!",
//         sender: "j97pl01jkk3w5ghh56gsbhu6788bshjj",
//         type: "text",
//       },
//       {
//         room: roomIds[0],
//         message: "Iyaa mami queen ini udah disampein...",
//         sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
//         type: "text",
//       },
//     ];

//     // Insert messages using sendTextMessage mutation
//     for (const msg of messages) {
//       await sendTextMessage(ctx, msg);
//     }

//     console.log("Seeding completed successfully.");
//   },
// });

// // // Internal Mutation for seeding users
// // export const seedUsers = mutation(async ({ db }) => {
// //   x13n5kak8y77hw300ws45fthh",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message: "Ada yang bisa saya bantu?",
// //       sender: "j975rjztz53wrwb139dq02dp4d72d6qg",
// //       type: "text",
// //     },
// //     {
// //       _id: "j99dv3qx13n5kak8y93hw300ws83fwkk",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message:
// //         "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
// //       sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       type: "text",
// //     },
// //     {const users = [
// //     {
// //       _id: "j97e3v52akaej4rbha85e4bqz172fs5g",
// //       name: "Admin",
// //       email: "admin@mail.com",
// //       imageUrl:
// //         "https://static.vecteezy.com/system/resources/thumbnails/043/900/708/small_2x/user-profile-icon-illustration-vector.jpg",
// //       isOnline: true,
// //       tokenIdentifier: "token_admin",
// //     },
// //     {
// //       _id: "j975rjztz53wrwb139dq02dp4d72d6qg",
// //       name: "Agent A",
// //       email: "agent@mail.com",
// //       imageUrl:
// //         "https://static.vecteezy.com/system/resources/previews/017/329/584/non_2x/parent-smiling-icon-flat-happy-person-vector.jpg",
// //       isOnline: false,
// //       tokenIdentifier: "token_agent",
// //     },
// //     {
// //       _id: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       name: "King Customer",
// //       email: "kingcust@mail.com",
// //       imageUrl:
// //         "https://static.vecteezy.com/system/resources/previews/034/874/688/large_2x/ai-generated-king-avatar-gamer-icon-clip-art-sticker-decoration-simple-background-free-photo.jpg",
// //       isOnline: true,
// //       tokenIdentifier: "token_kingcustomer",
// //     },
// //     {
// //       _id: "j97pl01jkk3w5ghh56gsbhu6788bshjj",
// //       name: "Queen Customer",
// //       email: "queencust@mail.com",
// //       imageUrl:
// //         "https://static.vecteezy.com/system/resources/previews/021/804/982/non_2x/queen-icon-style-vector.jpg",
// //       isOnline: true,
// //       tokenIdentifier: "token_queencustomer",
// //     },
// //   ];

// //   for (const user of users) {
// //     await db.insert("users", user);
// //   }
// // });

// // export const seedRooms = mutation(async ({ db }) => {
// //   const rooms = [
// //     {
// //       _id: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       admin: "j97e3v52akaej4rbha85e4bqz172fs5g",
// //       imageUrl: "https://picsum.photos/id/237/200/300",
// //       isGroup: true,
// //       name: "Group Product A",
// //       participants: [
// //         "j97e3v52akaej4rbha85e4bqz172fs5g",
// //         "j975rjztz53wrwb139dq02dp4d72d6qg",
// //         "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       ],
// //       _creationTime: 1728648123561.3057,
// //     },
// //     {
// //       _id: "jh7f73nf801hf91bd3acp0bke978f8x",
// //       isGroup: false,
// //       participants: [
// //         "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //         "j97pl01jkk3w5ghh56gsbhu6788bshjj",
// //       ],
// //       _creationTime: 1728648123561.3057,
// //     },
// //   ];

// //   for (const room of rooms) {
// //     await db.insert("rooms", room);
// //   }

// //   // Messages data
// //   const messages = [
// //     {
// //       _id: "j57dv3qx13n5kak8y77hw300ws72ftbd",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message: "Selamat malam",
// //       sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       type: "text",
// //     },
// //     {
// //       _id: "j41dv3qx13n5kak8y77hw300ws77fykk",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message: "Malam",
// //       sender: "j975rjztz53wrwb139dq02dp4d72d6qg",
// //       type: "text",
// //     },
// //     {
// //       _id: "j37dv3q
// //       _id: "j82dv3qx13n5kak8y77hw300ws32ftll",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
// //       sender: "j975rjztz53wrwb139dq02dp4d72d6qg",
// //       type: "text",
// //     },

// //     {
// //       _id: "j57dv3qx46n5kak8y77hw300ws99fccc",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message:
// //         "https://agreeable-koala-997.convex.cloud/api/storage/2e207bbc-7b6e-4f67-844c-48e333362d46",
// //       sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       type: "image",
// //     },
// //     {
// //       _id: "j92dv3qx13n5kak8y43hw300ws77fhhh",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message:
// //         "https://agreeable-koala-997.convex.cloud/api/storage/17d77201-a793-402a-8150-e566e606ff76",
// //       sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       type: "video",
// //     },
// //     {
// //       _id: "j44dv3qx13n5kak8y83hw300ws49ffkk",
// //       room: "jh7f73nf801hf91bd3acp0bke972f7de",
// //       message:
// //         "https://agreeable-koala-997.convex.cloud/api/storage/945d2d50-d982-4f97-8bdb-68f176cccef9",
// //       sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       type: "document",
// //     },

// //     {
// //       _id: "j57dv3qx13n5kak8y77hw300ws72ftbb",
// //       room: "jh7f73nf801hf91bd3acp0bke978f8x",
// //       message:
// //         "Hello King! Bukti bayarnya dah kamu kirim belom? Cepetan bilang ke grup dong!",
// //       sender: "j97pl01jkk3w5ghh56gsbhu6788bshjj",
// //       type: "text",
// //     },
// //     {
// //       _id: "j53dv4qx13n5kak8y99hw300ws72facc",
// //       room: "jh7f73nf801hf91bd3acp0bke978f8x",
// //       message: "Iyaa mami queen ini udah disampein...",
// //       sender: "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
// //       type: "text",
// //     },
// //   ];

// //   // Insert messages
// //   for (const message of messages) {
// //     await db.insert("messages", message);
// //   }
// // });

// // // Combined Seeder to avoid duplication
// // export const init = internalMutation(async (ctx) => {
// //   await seedUsers(ctx);
// //   await seedRooms(ctx);
// // });
