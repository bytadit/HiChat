export const rooms = [
  {
    _id: "1",
    admin: "admin@mail.com",
    imageUrl: "https://picsum.photos/id/237/200/300",
    name: "Product A",
    participants: [
      "admin@mail.com",
      "agent@mail.com",
      "customer1@mail.com",
      "customer2@mail.com",
    ],
    _creationTime: 1638232272, // Unix timestamp for 2021-11-30 12:04:32 UTC
    lastMessage: {
      _id: "1",
      type: "image",
      message: "image_url.jpg",
      sender: "customer1@mail.com",
    },
    sender: "customer1@mail.com",
    isOnline: false,
  },
  {
    _id: "2",
    admin: null,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1029/1029023.png",
    name: null,
    participants: ["agent@mail.com", "customer2@mail.com"],
    _creationTime: 1638235872,
    lastMessage: {
      _id: "2",
      type: "text",
      message: "Selamat malam",
      sender: "customer2@mail.com",
    },
    sender: "customer2@mail.com",
    isOnline: true,
  },
];

export const messages = [
  {
    _id: 885512,
    type: "text",
    message: "Selamat malam",
    sender: "customer@mail.com",
  },
  {
    _id: 885513,
    type: "text",
    message: "Malam",
    sender: "agent@mail.com",
  },
  {
    _id: 885514,
    type: "text",
    message: "Ada yang bisa saya bantu?",
    sender: "agent@mail.com",
  },
  {
    _id: 885515,
    type: "text",
    message:
      "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
    sender: "customer@mail.com",
  },
  {
    _id: 885516,
    type: "text",
    message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
    sender: "agent@mail.com",
  },
];

export const users = [
  {
    _id: "admin@mail.com",
    name: "Admin",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/9703/9703596.png",
    role: 0,
    isOnline: true,
  },
  {
    _id: "agent@mail.com",
    name: "Agent",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1029/1029023.png",
    role: 1,
    isOnline: true,
  },
  {
    _id: "user1@mail.com",
    name: "User 1",
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    role: 2,
    isOnline: false,
  },
  {
    _id: "user2@mail.com",
    name: "User 2",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    role: 2,
    isOnline: true,
  },
];
