import { Crown, House, ShoppingCart, User2 } from "lucide-react";

export const reelsData = [
  {
    id: 1,
    user: {
      name: "Maulana Ibnu",
      avatar: "/avatar.png",
      isSuggested: true,
    },
    timestamp: "19h",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?si=ScZ_5aMdfz-2aH7j",
    likes: "1,234",
    caption: {
      text: "Pesona Indonesia yang tak terlupakan! Jangan lupa dukung finalis favorit kalian ya! ✨",
      hashtags: "#DutaPariwisata #PesonaIndonesia #VoteNow",
    },
  },
  {
    id: 2,
    user: {
      name: "Duta Pariwisata Official",
      avatar: "/avatar.png",
      isSuggested: true,
    },
    timestamp: "1d",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?si=ScZ_5aMdfz-2aH7j",
    likes: "856",
    caption: {
      text: "Keseruan karantina hari ke-3! Semangat para finalis! 🔥",
      hashtags: "#Karantina #DutaPariwisata2026",
    },
  },
  {
    id: 3,
    user: {
      name: "Duta Pariwisata Official",
      avatar: "/avatar.png",
      isSuggested: true,
    },
    timestamp: "1d",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?si=ScZ_5aMdfz-2aH7j",
    likes: "856",
    caption: {
      text: "Keseruan karantina hari ke-3! Semangat para finalis! 🔥",
      hashtags: "#Karantina #DutaPariwisata2026",
    },
  },
  {
    id: 4,
    user: {
      name: "Duta Pariwisata Official",
      avatar: "/avatar.png",
      isSuggested: true,
    },
    timestamp: "1d",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?si=ScZ_5aMdfz-2aH7j",
    likes: "856",
    caption: {
      text: "Keseruan karantina hari ke-3! Semangat para finalis! 🔥",
      hashtags: "#Karantina #DutaPariwisata2026",
    },
  },
];

export const NavbarItem = [
  {
    name: "Beranda",
    icon: House,
    page: "home",
  },
  {
    name: "Vote",
    icon: Crown,
    page: "vote",
  },
  {
    name: "Shop",
    icon: ShoppingCart,
    page: "shop",
  },
  {
    name: "Profile",
    icon: User2,
    page: "profile",
  },
];

export const candidates = [
  {
    id: 1,
    name: "Bunga Sanjaya",
    region: "Jawa Tengah",
    image: "/avatar.png",
  },
  {
    id: 2,
    name: "Sabrina Kartika",
    region: "Jawa Timur",
    image: "/avatar.png",
  },
  {
    id: 3,
    name: "Nabila Salsabila",
    region: "Jawa Barat",
    image: "/avatar.png",
  },
  {
    id: 4,
    name: "Fajar Putra Pratama",
    region: "Sumatera Utara",
    image: "/avatar.png",
  },
  {
    id: 5,
    name: "Aditya Wardhana",
    region: "DKI Jakarta",
    image: "/avatar.png",
  },
  {
    id: 6,
    name: "Citra Lestari",
    region: "Bali",
    image: "/avatar.png",
  },
];
