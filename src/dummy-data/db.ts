export const dummyRooms = [
  {
    _id: "jh7f73nf801hf91bd3acp0bke972f7de",
    admin: "j97e3v52akaej4rbha85e4bqz172fs5g",
    imageUrl: "https://picsum.photos/id/237/200/300",
    name: "Product A",
    participants: [
      "j97e3v52akaej4rbha85e4bqz172fs5g",
      "j975rjztz53wrwb139dq02dp4d72d6qg",
      "j97dv01bwg3w5arcd9c9c6p3xn72crp7",
    ],
    _creationTime: 1728609650334.9045,
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

export const dummyMessages = [
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

export const dummyUsers = [
  {
    _id: "admin@mail.com",
    email: "admin@mail.com",
    name: "Admin",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/9703/9703596.png",
    role: 0,
    isOnline: true,
  },
  {
    _id: "agent@mail.com",
    email: "agent@mail.com",
    name: "Agent",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1029/1029023.png",
    role: 1,
    isOnline: true,
  },
  {
    _id: "user1@mail.com",
    email: "user1@mail.com",
    name: "User 1",
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    role: 2,
    isOnline: false,
  },
  {
    _id: "user2@mail.com",
    email: "user2@mail.com",
    name: "User 2",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    role: 2,
    isOnline: true,
  },
];
