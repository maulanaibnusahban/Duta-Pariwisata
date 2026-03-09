import { Banknote, Building2, CreditCard, Crown, House, QrCode, ShoppingCart, User2, Wallet } from "lucide-react";

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
    href: "/",
  },
  {
    name: "Vote",
    icon: Crown,
    href: "/vote",
  },
  {
    name: "Shop",
    icon: ShoppingCart,
    href: "/shop",
  },
  {
    name: "Profile",
    icon: User2,
    href: "/profile",
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

export const PAYMENT_CATEGORIES = [
  {
    category: "E-Wallet",
    methods: [
      {
        id: "gopay",
        name: "GoPay",
        description: "Bayar dengan saldo GoPay",
        icon: Wallet,
        className: "w-5 h-5 text-[#00AED6]",
        badge: "Populer",
      },
      {
        id: "dana",
        name: "DANA",
        description: "Bayar dengan saldo DANA",
        icon: Wallet,
        className: "w-5 h-5 text-[#118EEA]",
      },
      {
        id: "ovo",
        name: "OVO",
        description: "Bayar dengan saldo OVO",
        icon: Wallet,
        className: "w-5 h-5 text-[#4C3494]",
      },
      {
        id: "shopeepay",
        name: "ShopeePay",
        description: "Bayar dengan saldo ShopeePay",
        icon: Wallet,
        className: "w-5 h-5 text-[#EE4D2D]",
      },
    ],
  },
  {
    category: "Transfer Bank",
    methods: [
      {
        id: "bca",
        name: "BCA Virtual Account",
        description: "Transfer via BCA",
        icon: Building2,
        className: "w-5 h-5 text-blue-600",
      },
      {
        id: "bni",
        name: "BNI Virtual Account",
        description: "Transfer via BNI",
        icon: Building2,
        className: "w-5 h-5 text-orange-500",
      },
      {
        id: "bri",
        name: "BRI Virtual Account",
        description: "Transfer via BRI",
        icon: Building2,
        className: "w-5 h-5 text-blue-500",
      },
      {
        id: "mandiri",
        name: "Mandiri Virtual Account",
        description: "Transfer via Mandiri / Livin",
        icon: Building2,
        className: "w-5 h-5 text-yellow-500",
      },
    ],
  },
  {
    category: "Kartu Kredit / Debit",
    methods: [
      {
        id: "credit_card",
        name: "Kartu Kredit / Debit",
        description: "Visa, Mastercard, JCB",
        icon: CreditCard,
        className: "w-5 h-5 text-gold-500",
        badge: "3D Secure",
      },
    ],
  },
  {
    category: "QRIS",
    methods: [
      {
        id: "qris",
        name: "QRIS",
        description: "Scan QR dari semua aplikasi",
        icon: QrCode,
        className: "w-5 h-5 text-black",
        badge: "Semua Bank",
      },
    ],
  },
  {
    category: "Gerai Tunai",
    methods: [
      {
        id: "alfamart",
        name: "Alfamart",
        description: "Bayar di kasir Alfamart",
        icon: Banknote,
        className: "w-5 h-5 text-red-500",
      },
      {
        id: "indomaret",
        name: "Indomaret",
        description: "Bayar di kasir Indomaret",
        icon: Banknote,
        className: "w-5 h-5 text-red-600",
      },
    ],
  },
];
