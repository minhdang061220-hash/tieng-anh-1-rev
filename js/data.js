// Dữ liệu toàn bộ 16 Unit của Sách Giáo Khoa Tiếng Anh 1 - Global Success
// NXB Giáo Dục Việt Nam - Kết Nối Tri Thức Với Cuộc Sống

const BOOK_PAGES_BASE = "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/";

const BOOK_PAGE_URLS = [
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-1-1779701257101.png", // 1 (Bìa)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-2-1779701257445.png", // 2 (Thông tin xuất bản)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-3-1779701257772.png", // 3 (Lời nói đầu)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-4-1779701258066.png", // 4 (Ký hiệu icon - trang 3 SGK)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-5-1779701258364.png", // 5 (Book Map HK1 - trang 4 SGK)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-6-1779701258730.png", // 6 (Book Map HK2 - trang 5 SGK)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-7-1779701259183.png", // 7 (Unit 1 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-8-1779701259697.png", // 8 (Unit 1 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-9-1779701260034.png", // 9 (Unit 1 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-10-1779701260460.png", // 10 (Unit 2 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-11-1779701260779.png", // 11 (Unit 2 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-12-1779701261118.png", // 12 (Unit 2 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-13-1779701261492.png", // 13 (Fun Time 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-14-1779701261842.png", // 14 (Fun Time 1 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-15-1779701262257.png", // 15 (Unit 3 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-16-1779701262633.png", // 16 (Unit 3 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-17-1779701262980.png", // 17 (Unit 3 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-18-1779701263471.png", // 18 (Unit 4 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-19-1779701263813.png", // 19 (Unit 4 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-20-1779701264148.png", // 20 (Unit 4 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-21-1779701264547.png", // 21 (Review 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-22-1779701264888.png", // 22 (Review 1 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-23-1779701265240.png", // 23 (Review 1 p3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-24-1779701265651.png", // 24 (Unit 5 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-25-1779701266030.png", // 25 (Unit 5 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-26-1779701266351.png", // 26 (Unit 5 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-27-1779701266724.png", // 27 (Unit 6 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-28-1779701267043.png", // 28 (Unit 6 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-29-1779701267360.png", // 29 (Unit 6 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-30-1779701267724.png", // 30 (Fun Time 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-31-1779701268071.png", // 31 (Fun Time 2 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-32-1779701268485.png", // 32 (Unit 7 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-33-1779701268843.png", // 33 (Unit 7 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-34-1779701269247.png", // 34 (Unit 7 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-35-1779701269635.png", // 35 (Unit 8 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-36-1779701270036.png", // 36 (Unit 8 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-37-1779701270451.png", // 37 (Unit 8 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-38-1779701270825.png", // 38 (Review 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-39-1779701271180.png", // 39 (Review 2 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-40-1779701271513.png", // 40 (Review 2 p3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-41-1779701272009.png", // 41 (Unit 9 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-42-1779701272362.png", // 42 (Unit 9 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-43-1779701272698.png", // 43 (Unit 9 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-44-1779701273122.png", // 44 (Unit 10 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-45-1779701273460.png", // 45 (Unit 10 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-46-1779701273838.png", // 46 (Unit 10 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-47-1779701274217.png", // 47 (Fun Time 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-48-1779701274553.png", // 48 (Fun Time 3 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-49-1779701274989.png", // 49 (Unit 11 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-50-1779701275400.png", // 50 (Unit 11 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-51-1779701275732.png", // 51 (Unit 11 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-52-1779701276144.png", // 52 (Unit 12 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-53-1779701276522.png", // 53 (Unit 12 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-54-1779701276891.png", // 54 (Unit 12 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-55-1779701277335.png", // 55 (Review 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-56-1779701277696.png", // 56 (Review 3 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-57-1779701278027.png", // 57 (Review 3 p3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-58-1779701278411.png", // 58 (Unit 13 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-59-1779701278740.png", // 59 (Unit 13 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-60-1779701279080.png", // 60 (Unit 13 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-61-1779701279532.png", // 61 (Unit 14 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-62-1779701279867.png", // 62 (Unit 14 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-63-1779701280213.png", // 63 (Unit 14 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-64-1779701280539.png", // 64 (Fun Time 4)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-65-1779701280871.png", // 65 (Fun Time 4 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-66-1779701281291.png", // 66 (Unit 15 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-67-1779701281638.png", // 67 (Unit 15 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-68-1779701281985.png", // 68 (Unit 15 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-69-1779701282429.png", // 69 (Unit 16 Lesson 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-70-1779701282811.png", // 70 (Unit 16 Lesson 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-71-1779701283184.png", // 71 (Unit 16 Lesson 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-72-1779701283577.png", // 72 (Review 4)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-73-1779701283926.png", // 73 (Review 4 p2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-74-1779701284299.png", // 74 (Review 4 p3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-75-1779701284617.png", // 75 (Glossary 1)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-76-1779701284962.png", // 76 (Glossary 2)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-77-1779701285315.png", // 77 (Glossary 3)
  "https://taphuan.nxbgd.vn/storage/upload/taphuan/2026/0525/4914061146-page-78-1779701285685.png"  // 78 (Glossary 4 & Bìa sau)
];

const UNITS_DATA = [
  {
    id: 1,
    title: "Unit 1: In the school playground",
    titleVi: "Bài 1: Trong sân trường",
    semester: 1,
    themeColor: "#FF6B6B",
    bgGradient: "from-red-400 to-orange-400",
    phonics: { letter: "Bb", sound: "/b/", guide: "Âm /b/ giống chữ 'bờ' tiếng Việt nhưng bật môi nhẹ nhàng" },
    bookPages: [6, 7, 8],
    pageIndices: [6, 7, 8],
    vocabulary: [
      { word: "ball", vi: "quả bóng", ipa: "/bɔːl/", icon: "⚽", example: "a ball" },
      { word: "bike", vi: "xe đạp", ipa: "/baɪk/", icon: "🚲", example: "a bike" },
      { word: "book", vi: "quyển sách", ipa: "/bʊk/", icon: "📖", example: "a book" },
      { word: "Bill", vi: "bạn Bill", ipa: "/bɪl/", icon: "👦🏼", example: "Bill" },
      { word: "Ba", vi: "bạn Ba", ipa: "/baː/", icon: "👦🏻", example: "Ba" }
    ],
    sentences: [
      { en: "Hi, I'm Bill.", vi: "Xin chào, mình là Bill." },
      { en: "Bye, Bill.", vi: "Tạm biệt Bill." },
      { en: "Hi, I'm Ba.", vi: "Xin chào, mình là Ba." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "B, b, ball. A ball, a ball.",
        "B, b, a ball.",
        "B, b, book. A book, a book.",
        "B, b, a book.",
        "B, b, bike. A bike, a bike.",
        "B, b, a bike."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Hi, I'm Ba.",
        "Hi, I'm Bill.",
        "Hi, Bill. I'm Ba.",
        "Hi, Ba. I'm Bill."
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a bike",
        options: [
          { id: "a", text: "a ball", icon: "⚽" },
          { id: "b", text: "a bike", icon: "🚲" }
        ],
        answer: "b"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a book",
        options: [
          { id: "a", text: "a ball", icon: "⚽" },
          { id: "b", text: "a book", icon: "📖" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["B", "b", "Bb", "ball", "book", "bike"]
  },
  {
    id: 2,
    title: "Unit 2: In the dining room",
    titleVi: "Bài 2: Trong phòng ăn",
    semester: 1,
    themeColor: "#4ECDC4",
    bgGradient: "from-teal-400 to-emerald-400",
    phonics: { letter: "Cc", sound: "/k/", guide: "Âm /k/ phát âm như tiếng 'cờ/k' bật hơi trong cổ họng" },
    bookPages: [9, 10, 11],
    pageIndices: [9, 10, 11],
    vocabulary: [
      { word: "cake", vi: "bánh ngọt, bánh sinh nhật", ipa: "/keɪk/", icon: "🎂", example: "a cake" },
      { word: "car", vi: "xe ô tô đồ chơi", ipa: "/kɑːr/", icon: "🚗", example: "a car" },
      { word: "cat", vi: "con mèo", ipa: "/kæt/", icon: "🐱", example: "a cat" },
      { word: "cup", vi: "cái cốc, tách trà", ipa: "/kʌp/", icon: "🍵", example: "a cup" }
    ],
    sentences: [
      { en: "I have a car.", vi: "Mình có một chiếc ô tô đồ chơi." },
      { en: "I have a cake.", vi: "Mình có một chiếc bánh ngọt." },
      { en: "I have a cat.", vi: "Mình có một chú mèo." },
      { en: "I have a cup.", vi: "Mình có một cái cốc." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "C, c, cake. A cake, a cake.",
        "C, c, a cake.",
        "C, c, car. A car, a car.",
        "C, c, a car.",
        "C, c, cat. A cat, a cat.",
        "C, c, a cat.",
        "C, c, cup. A cup, a cup.",
        "C, c, a cup."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "I have a car.",
        "I have a cake.",
        "I have a cat and I have a cup."
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a car",
        options: [
          { id: "a", text: "a cat", icon: "🐱" },
          { id: "b", text: "a car", icon: "🚗" }
        ],
        answer: "b"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a cake",
        options: [
          { id: "a", text: "a cake", icon: "🎂" },
          { id: "b", text: "a cup", icon: "🍵" }
        ],
        answer: "a"
      }
    ],
    traceLetters: ["C", "c", "Cc", "cake", "car", "cat", "cup"]
  },
  {
    id: 3,
    title: "Unit 3: At the street market",
    titleVi: "Bài 3: Tại chợ đường phố",
    semester: 1,
    themeColor: "#FFB03B",
    bgGradient: "from-amber-400 to-orange-400",
    phonics: { letter: "Aa", sound: "/æ/", guide: "Âm /æ/ mở rộng khẩu hình miệng giữa chữ 'a' và 'e'" },
    bookPages: [14, 15, 16],
    pageIndices: [14, 15, 16],
    vocabulary: [
      { word: "apple", vi: "quả táo đỏ", ipa: "/ˈæpl/", icon: "🍎", example: "an apple" },
      { word: "bag", vi: "cái túi xách, cặp sách", ipa: "/bæɡ/", icon: "🎒", example: "a bag" },
      { word: "can", vi: "lon nước, hộp thiếc", ipa: "/kæn/", icon: "🥫", example: "a can" },
      { word: "hat", vi: "cái mũ, nón", ipa: "/hæt/", icon: "🧢", example: "a hat" }
    ],
    sentences: [
      { en: "This is my bag.", vi: "Đây là chiếc cặp của mình." },
      { en: "This is my apple.", vi: "Đây là quả táo của mình." },
      { en: "This is my hat.", vi: "Đây là chiếc mũ của mình." },
      { en: "This is my can.", vi: "Đây là lon nước của mình." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "A, a, apple. An apple, an apple.",
        "A, a, bag. A bag, a bag.",
        "A, a, can. A can, a can.",
        "A, a, hat. A hat, a hat."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "This is my apple.",
        "This is my bag.",
        "This is my can and this is my hat."
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "an apple",
        options: [
          { id: "a", text: "an apple", icon: "🍎" },
          { id: "b", text: "a bag", icon: "🎒" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a hat",
        options: [
          { id: "a", text: "a can", icon: "🥫" },
          { id: "b", text: "a hat", icon: "🧢" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["A", "a", "Aa", "apple", "bag", "can", "hat"]
  },
  {
    id: 4,
    title: "Unit 4: In the bedroom",
    titleVi: "Bài 4: Trong phòng ngủ",
    semester: 1,
    themeColor: "#6C5CE7",
    bgGradient: "from-indigo-400 to-purple-500",
    phonics: { letter: "Dd", sound: "/d/", guide: "Âm /d/ chạm đầu lưỡi lên vòm họng bật hơi nhẹ" },
    bookPages: [17, 18, 19],
    pageIndices: [17, 18, 19],
    vocabulary: [
      { word: "desk", vi: "bàn học sinh", ipa: "/desk/", icon: "🪑", example: "a desk" },
      { word: "dog", vi: "chú cún con", ipa: "/dɒɡ/", icon: "🐶", example: "a dog" },
      { word: "door", vi: "cửa ra vào", ipa: "/dɔːr/", icon: "🚪", example: "a door" },
      { word: "duck", vi: "chú vịt con", ipa: "/dʌk/", icon: "🦆", example: "a duck" }
    ],
    sentences: [
      { en: "This is a dog.", vi: "Đây là một chú chó." },
      { en: "This is a desk.", vi: "Đây là một cái bàn học." },
      { en: "This is a door.", vi: "Đây là một cánh cửa." },
      { en: "This is a duck.", vi: "Đây là một chú vịt." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "D, d, dog. A dog, a dog.",
        "D, d, desk. A desk, a desk.",
        "D, d, door. A door, a door.",
        "D, d, duck. A duck, a duck."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "This is a desk.",
        "This is a door.",
        "This is a duck and this is a dog."
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a desk",
        options: [
          { id: "a", text: "a desk", icon: "🪑" },
          { id: "b", text: "a door", icon: "🚪" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a dog",
        options: [
          { id: "a", text: "a duck", icon: "🦆" },
          { id: "b", text: "a dog", icon: "🐶" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["D", "d", "Dd", "desk", "dog", "door", "duck"]
  },
  {
    id: 5,
    title: "Unit 5: At the fish and chip shop",
    titleVi: "Bài 5: Tại tiệm cá và khoai tây chiên",
    semester: 1,
    themeColor: "#0984E3",
    bgGradient: "from-blue-400 to-cyan-500",
    phonics: { letter: "Ii", sound: "/ɪ/", guide: "Âm /ɪ/ phát âm chữ 'i' ngắn và dứt khoát" },
    bookPages: [23, 24, 25],
    pageIndices: [23, 24, 25],
    vocabulary: [
      { word: "chicken", vi: "thịt gà giòn", ipa: "/ˈtʃɪkɪn/", icon: "🍗", example: "chicken" },
      { word: "chips", vi: "khoai tây chiên giòn", ipa: "/tʃɪps/", icon: "🍟", example: "chips" },
      { word: "fish", vi: "con cá, món cá", ipa: "/fɪʃ/", icon: "🐟", example: "fish" },
      { word: "milk", vi: "hộp sữa tươi", ipa: "/mɪlk/", icon: "🥛", example: "milk" }
    ],
    sentences: [
      { en: "I like milk.", vi: "Mình thích sữa." },
      { en: "I like fish.", vi: "Mình thích ăn cá." },
      { en: "I like chips.", vi: "Mình thích khoai tây chiên." },
      { en: "I like chicken.", vi: "Mình thích ăn thịt gà." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "I, i, fish. Fish, fish, fish.",
        "I, i, chips. Chips, chips, chips.",
        "I, i, chicken. Chicken, chicken, chicken.",
        "I, i, milk. Milk, milk, milk."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "I like chips.",
        "I like fish.",
        "I like chicken and I like milk."
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "fish",
        options: [
          { id: "a", text: "fish", icon: "🐟" },
          { id: "b", text: "chips", icon: "🍟" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "milk",
        options: [
          { id: "a", text: "chicken", icon: "🍗" },
          { id: "b", text: "milk", icon: "🥛" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["I", "i", "Ii", "fish", "chips", "milk", "chicken"]
  },
  {
    id: 6,
    title: "Unit 6: In the classroom",
    titleVi: "Bài 6: Trong lớp học thân yêu",
    semester: 1,
    themeColor: "#E17055",
    bgGradient: "from-rose-400 to-red-500",
    phonics: { letter: "Ee", sound: "/e/", guide: "Âm /e/ mở miệng vừa phải như chữ 'e' tiếng Việt" },
    bookPages: [26, 27, 28],
    pageIndices: [26, 27, 28],
    vocabulary: [
      { word: "bell", vi: "cái chuông reo", ipa: "/bel/", icon: "🔔", example: "a bell" },
      { word: "pen", vi: "bút mực", ipa: "/pen/", icon: "🖊️", example: "a pen" },
      { word: "pencil", vi: "bút chì viết", ipa: "/ˈpensl/", icon: "✏️", example: "a pencil" },
      { word: "red", vi: "màu đỏ tươi", ipa: "/red/", icon: "🔴", example: "red" }
    ],
    sentences: [
      { en: "It's a red pen.", vi: "Đó là một chiếc bút mực màu đỏ." },
      { en: "It's a red pencil.", vi: "Đó là một chiếc bút chì màu đỏ." },
      { en: "It's a red bell.", vi: "Đó là một cái chuông màu đỏ." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "E, e, pen. A pen, a pen.",
        "E, e, pencil. A pencil, a pencil.",
        "E, e, bell. A bell, a bell.",
        "E, e, red. A red pen!"
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "A red pen.",
        "A red pencil.",
        "A red bell in the classroom!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a red pen",
        options: [
          { id: "a", text: "a red pen", icon: "🖊️" },
          { id: "b", text: "a pencil", icon: "✏️" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a bell",
        options: [
          { id: "a", text: "a pencil", icon: "✏️" },
          { id: "b", text: "a bell", icon: "🔔" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["E", "e", "Ee", "pen", "pencil", "bell", "red"]
  },
  {
    id: 7,
    title: "Unit 7: In the garden",
    titleVi: "Bài 7: Trong khu vườn xinh xắn",
    semester: 1,
    themeColor: "#27AE60",
    bgGradient: "from-green-400 to-emerald-500",
    phonics: { letter: "Gg", sound: "/ɡ/", guide: "Âm /ɡ/ phát âm như chữ 'gờ' trầm nhẹ ở cuống họng" },
    bookPages: [31, 32, 33],
    pageIndices: [31, 32, 33],
    vocabulary: [
      { word: "garden", vi: "khu vườn xanh mát", ipa: "/ˈɡɑːdn/", icon: "🏡", example: "a garden" },
      { word: "gate", vi: "cánh cổng vườn", ipa: "/ɡeɪt/", icon: "🚪", example: "a gate" },
      { word: "girl", vi: "bạn bé gái đáng yêu", ipa: "/ɡɜːl/", icon: "👧", example: "a girl" },
      { word: "goat", vi: "chú dê trắng", ipa: "/ɡəʊt/", icon: "🐐", example: "a goat" }
    ],
    sentences: [
      { en: "There's a garden.", vi: "Có một khu vườn." },
      { en: "There's a gate.", vi: "Có một cánh cổng." },
      { en: "There's a girl.", vi: "Có một bạn bé gái." },
      { en: "There's a goat.", vi: "Có một chú dê con." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "G, g, goat. A goat in the garden.",
        "G, g, gate. A gate in the garden.",
        "G, g, girl. A girl in the garden."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "There's a garden.",
        "There's a gate.",
        "There's a goat and a girl in the garden."
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a goat",
        options: [
          { id: "a", text: "a goat", icon: "🐐" },
          { id: "b", text: "a girl", icon: "👧" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a gate",
        options: [
          { id: "a", text: "a garden", icon: "🏡" },
          { id: "b", text: "a gate", icon: "🚪" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["G", "g", "Gg", "goat", "girl", "gate", "garden"]
  },
  {
    id: 8,
    title: "Unit 8: In the park",
    titleVi: "Bài 8: Trong công viên vui chơi",
    semester: 1,
    themeColor: "#8E44AD",
    bgGradient: "from-purple-400 to-pink-500",
    phonics: { letter: "Hh", sound: "/h/", guide: "Âm /h/ thở hơi nhẹ nhàng từ trong cổ họng ra" },
    bookPages: [34, 35, 36],
    pageIndices: [34, 35, 36],
    vocabulary: [
      { word: "hair", vi: "mái tóc óng ả", ipa: "/heə/", icon: "💇", example: "hair" },
      { word: "hand", vi: "bàn tay nhỏ nhắn", ipa: "/hænd/", icon: "✋", example: "hand" },
      { word: "head", vi: "cái đầu thông minh", ipa: "/hed/", icon: "🧒", example: "head" },
      { word: "horse", vi: "chú ngựa dũng mãnh", ipa: "/hɔːs/", icon: "🐎", example: "a horse" }
    ],
    sentences: [
      { en: "Touch your hair.", vi: "Bé chạm vào tóc của mình nào." },
      { en: "Touch your head.", vi: "Bé chạm vào đầu của mình nào." },
      { en: "Touch your hand.", vi: "Bé chạm vào bàn tay nào." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "H, h, hair. Touch your hair!",
        "H, h, hand. Touch your hand!",
        "H, h, head. Touch your head!",
        "H, h, horse. Look at the horse!"
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Touch your head.",
        "Touch your hair.",
        "Touch your hand and clap, clap, clap!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "hair",
        options: [
          { id: "a", text: "hair", icon: "💇" },
          { id: "b", text: "hand", icon: "✋" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "horse",
        options: [
          { id: "a", text: "head", icon: "🧒" },
          { id: "b", text: "horse", icon: "🐎" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["H", "h", "Hh", "hair", "hand", "head", "horse"]
  },
  {
    id: 9,
    title: "Unit 9: In the shop",
    titleVi: "Bài 9: Trong cửa hàng bách hóa",
    semester: 2,
    themeColor: "#E67E22",
    bgGradient: "from-orange-400 to-amber-500",
    phonics: { letter: "Oo", sound: "/ɒ/", guide: "Âm /ɒ/ tròn môi mở miệng như chữ 'o' ngắn" },
    bookPages: [40, 41, 42],
    pageIndices: [40, 41, 42],
    vocabulary: [
      { word: "clocks", vi: "những chiếc đồng hồ", ipa: "/klɒks/", icon: "⏰", example: "clocks" },
      { word: "locks", vi: "những cái ổ khóa", ipa: "/lɒks/", icon: "🔒", example: "locks" },
      { word: "mops", vi: "những cây chổi lau nhà", ipa: "/mɒps/", icon: "🧹", example: "mops" },
      { word: "pots", vi: "những chiếc xoong, nồi", ipa: "/pɒts/", icon: "🍲", example: "pots" }
    ],
    sentences: [
      { en: "How many clocks? - Two.", vi: "Có mấy cái đồng hồ? - Hai cái." },
      { en: "How many pots? - Three.", vi: "Có mấy cái nồi? - Ba cái." },
      { en: "How many locks? - Four.", vi: "Có mấy cái ổ khóa? - Bốn cái." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "O, o, clocks. Two clocks, two clocks.",
        "O, o, pots. Three pots, three pots.",
        "O, o, locks. Four locks, four locks.",
        "O, o, mops. Five mops, five mops."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "How many clocks? One, two.",
        "How many pots? One, two, three.",
        "In the shop for you and me!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "clocks",
        options: [
          { id: "a", text: "clocks", icon: "⏰" },
          { id: "b", text: "locks", icon: "🔒" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "pots",
        options: [
          { id: "a", text: "mops", icon: "🧹" },
          { id: "b", text: "pots", icon: "🍲" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["O", "o", "Oo", "clocks", "locks", "mops", "pots"]
  },
  {
    id: 10,
    title: "Unit 10: At the zoo",
    titleVi: "Bài 10: Tại vườn bách thú",
    semester: 2,
    themeColor: "#16A085",
    bgGradient: "from-teal-500 to-green-500",
    phonics: { letter: "Mm", sound: "/m/", guide: "Âm /m/ mím chặt hai môi và ngân âm mũi 'mờ'" },
    bookPages: [43, 44, 45],
    pageIndices: [43, 44, 45],
    vocabulary: [
      { word: "mango", vi: "quả xoài chín vàng", ipa: "/ˈmæŋɡəʊ/", icon: "🥭", example: "a mango" },
      { word: "monkey", vi: "chú khỉ tinh nghịch", ipa: "/ˈmʌŋki/", icon: "🐒", example: "a monkey" },
      { word: "mother", vi: "người mẹ dịu hiền", ipa: "/ˈmʌðə/", icon: "👩", example: "mother" },
      { word: "mouse", vi: "chú chuột nhắt", ipa: "/maʊs/", icon: "🐭", example: "a mouse" }
    ],
    sentences: [
      { en: "That's a monkey.", vi: "Đó là một chú khỉ." },
      { en: "That's a mouse.", vi: "Đó là một chú chuột." },
      { en: "That's a mango.", vi: "Đó là một quả xoài." },
      { en: "That's my mother.", vi: "Đó là mẹ của mình." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "M, m, monkey. That's a monkey.",
        "M, m, mouse. That's a mouse.",
        "M, m, mango. That's a mango.",
        "M, m, mother. That's my mother."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Look at the monkey. That's a monkey.",
        "Look at the mouse. That's a mouse.",
        "At the zoo with mother too!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "monkey",
        options: [
          { id: "a", text: "monkey", icon: "🐒" },
          { id: "b", text: "mouse", icon: "🐭" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "mango",
        options: [
          { id: "a", text: "mother", icon: "👩" },
          { id: "b", text: "mango", icon: "🥭" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["M", "m", "Mm", "monkey", "mouse", "mango", "mother"]
  },
  {
    id: 11,
    title: "Unit 11: At the bus stop",
    titleVi: "Bài 11: Tại trạm dừng xe buýt",
    semester: 2,
    themeColor: "#F39C12",
    bgGradient: "from-amber-400 to-yellow-500",
    phonics: { letter: "Uu", sound: "/ʌ/", guide: "Âm /ʌ/ phát âm như chữ 'ă' hoặc 'ơ' ngắn mở miệng vừa" },
    bookPages: [48, 49, 50],
    pageIndices: [48, 49, 50],
    vocabulary: [
      { word: "bus", vi: "chiếc xe buýt lớn", ipa: "/bʌs/", icon: "🚌", example: "a bus" },
      { word: "run", vi: "chạy nhảy tung tăng", ipa: "/rʌn/", icon: "🏃", example: "run" },
      { word: "sun", vi: "ông mặt trời rạng rỡ", ipa: "/sʌn/", icon: "☀️", example: "the sun" },
      { word: "truck", vi: "chiếc xe tải lớn", ipa: "/trʌk/", icon: "🚚", example: "a truck" }
    ],
    sentences: [
      { en: "She's running.", vi: "Bạn nữ đang chạy." },
      { en: "He's running.", vi: "Bạn nam đang chạy." },
      { en: "Look at the bus.", vi: "Nhìn chiếc xe buýt kìa." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "U, u, run. She is running.",
        "U, u, sun. The warm sun.",
        "U, u, bus. A big bus.",
        "U, u, truck. A fast truck."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "The sun is shining in the sky.",
        "She is running running by.",
        "Look at the bus and look at the truck!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "bus",
        options: [
          { id: "a", text: "bus", icon: "🚌" },
          { id: "b", text: "truck", icon: "🚚" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "running",
        options: [
          { id: "a", text: "sun", icon: "☀️" },
          { id: "b", text: "run", icon: "🏃" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["U", "u", "Uu", "bus", "run", "sun", "truck"]
  },
  {
    id: 12,
    title: "Unit 12: At the lake",
    titleVi: "Bài 12: Bên hồ nước trong xanh",
    semester: 2,
    themeColor: "#2980B9",
    bgGradient: "from-sky-400 to-blue-600",
    phonics: { letter: "Ll", sound: "/l/", guide: "Âm /l/ đặt đầu lưỡi chạm lợi trên và phát âm 'lờ'" },
    bookPages: [51, 52, 53],
    pageIndices: [51, 52, 53],
    vocabulary: [
      { word: "lake", vi: "hồ nước phẳng lặng", ipa: "/leɪk/", icon: "🏞️", example: "a lake" },
      { word: "leaf", vi: "chiếc lá cây xanh", ipa: "/liːf/", icon: "🍃", example: "a leaf" },
      { word: "lemons", vi: "những quả chanh mọng nước", ipa: "/ˈlemənz/", icon: "🍋", example: "lemons" }
    ],
    sentences: [
      { en: "Look at the lemons.", vi: "Hãy nhìn những quả chanh kìa." },
      { en: "Look at the lake.", vi: "Hãy nhìn ra mặt hồ kìa." },
      { en: "Look at the leaf.", vi: "Hãy nhìn chiếc lá kìa." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "L, l, lemons. Look at the lemons.",
        "L, l, leaf. Look at the leaf.",
        "L, l, lake. Look at the lake!"
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Look at the lake so calm and blue.",
        "Look at the leaf and lemons too!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "lemons",
        options: [
          { id: "a", text: "lemons", icon: "🍋" },
          { id: "b", text: "leaf", icon: "🍃" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "lake",
        options: [
          { id: "a", text: "lemons", icon: "🍋" },
          { id: "b", text: "lake", icon: "🏞️" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["L", "l", "Ll", "lake", "leaf", "lemons"]
  },
  {
    id: 13,
    title: "Unit 13: In the school canteen",
    titleVi: "Bài 13: Trong căng tin trường học",
    semester: 2,
    themeColor: "#D35400",
    bgGradient: "from-amber-500 to-orange-600",
    phonics: { letter: "Nn", sound: "/n/", guide: "Âm /n/ đặt lưỡi lên vòm miệng và rung âm mũi 'nờ'" },
    bookPages: [57, 58, 59],
    pageIndices: [57, 58, 59],
    vocabulary: [
      { word: "bananas", vi: "những quả chuối ngọt", ipa: "/bəˈnɑːnəz/", icon: "🍌", example: "bananas" },
      { word: "noodles", vi: "món mì thơm ngon", ipa: "/ˈnuːdlz/", icon: "🍜", example: "noodles" },
      { word: "nuts", vi: "các loại hạt bổ dưỡng", ipa: "/nʌts/", icon: "🥜", example: "nuts" }
    ],
    sentences: [
      { en: "She's having noodles.", vi: "Bạn nữ đang ăn mì." },
      { en: "He's having bananas.", vi: "Bạn nam đang ăn chuối." },
      { en: "She's having nuts.", vi: "Bạn nữ đang ăn hạt." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "N, n, noodles. She's having noodles.",
        "N, n, bananas. He's having bananas.",
        "N, n, nuts. They're having nuts."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Noodles and nuts, noodles and nuts.",
        "Bananas so sweet and yummy nuts.",
        "In the school canteen!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "noodles",
        options: [
          { id: "a", text: "noodles", icon: "🍜" },
          { id: "b", text: "nuts", icon: "🥜" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "bananas",
        options: [
          { id: "a", text: "nuts", icon: "🥜" },
          { id: "b", text: "bananas", icon: "🍌" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["N", "n", "Nn", "nuts", "noodles", "bananas"]
  },
  {
    id: 14,
    title: "Unit 14: In the toy shop",
    titleVi: "Bài 14: Trong cửa hàng đồ chơi",
    semester: 2,
    themeColor: "#9B59B6",
    bgGradient: "from-purple-500 to-pink-500",
    phonics: { letter: "Tt", sound: "/t/", guide: "Âm /t/ chạm đầu lưỡi sau răng trên rồi bật hơi dứt khoát" },
    bookPages: [60, 61, 62],
    pageIndices: [60, 61, 62],
    vocabulary: [
      { word: "teddy bear", vi: "chú gấu bông ấm áp", ipa: "/ˈtedi beə/", icon: "🧸", example: "a teddy bear" },
      { word: "tiger", vi: "chú hổ oai vệ", ipa: "/ˈtaɪɡə/", icon: "🐯", example: "a tiger" },
      { word: "top", vi: "con quay xoay tít", ipa: "/tɒp/", icon: "🪀", example: "a top" },
      { word: "turtle", vi: "chú rùa hiền lành", ipa: "/ˈtɜːtl/", icon: "🐢", example: "a turtle" }
    ],
    sentences: [
      { en: "I can see a tiger.", vi: "Mình có thể nhìn thấy một chú hổ." },
      { en: "I can see a teddy bear.", vi: "Mình nhìn thấy một chú gấu bông." },
      { en: "I can see a turtle.", vi: "Mình nhìn thấy một chú rùa." },
      { en: "I can see a top.", vi: "Mình nhìn thấy một con quay." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "T, t, tiger. I can see a tiger.",
        "T, t, teddy bear. I can see a teddy bear.",
        "T, t, top. I can see a top.",
        "T, t, turtle. I can see a turtle."
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "In the toy shop, what can you see?",
        "I can see a teddy bear looking at me!",
        "A tiger, a top and a turtle too!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a teddy bear",
        options: [
          { id: "a", text: "teddy bear", icon: "🧸" },
          { id: "b", text: "tiger", icon: "🐯" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "a turtle",
        options: [
          { id: "a", text: "top", icon: "🪀" },
          { id: "b", text: "turtle", icon: "🐢" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["T", "t", "Tt", "top", "tiger", "turtle", "teddy bear"]
  },
  {
    id: 15,
    title: "Unit 15: At the football match",
    titleVi: "Bài 15: Tại trận đấu bóng đá",
    semester: 2,
    themeColor: "#27AE60",
    bgGradient: "from-green-500 to-teal-500",
    phonics: { letter: "Ff", sound: "/f/", guide: "Âm /f/ răng cửa trên chạm môi dưới thổi hơi ra ngoài" },
    bookPages: [65, 66, 67],
    pageIndices: [65, 66, 67],
    vocabulary: [
      { word: "face", vi: "khuôn mặt rạng rỡ", ipa: "/feɪs/", icon: "😊", example: "face" },
      { word: "father", vi: "người bố thân thương", ipa: "/ˈfɑːðə/", icon: "👨", example: "father" },
      { word: "foot", vi: "bàn chân đá bóng", ipa: "/fʊt/", icon: "🦶", example: "foot" },
      { word: "football", vi: "quả bóng đá tròn", ipa: "/ˈfʊtbɔːl/", icon: "⚽", example: "football" }
    ],
    sentences: [
      { en: "Point to your hand.", vi: "Hãy chỉ vào bàn tay của bạn." },
      { en: "Point to your foot.", vi: "Hãy chỉ vào bàn chân của bạn." },
      { en: "Point to your face.", vi: "Hãy chỉ vào khuôn mặt bạn." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "F, f, football. Kick the football!",
        "F, f, foot. Kick with your foot!",
        "F, f, father. Watch with father!",
        "F, f, face. A happy face!"
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Point to your face, point to your foot.",
        "Kick the football and score a goal!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "foot",
        options: [
          { id: "a", text: "foot", icon: "🦶" },
          { id: "b", text: "face", icon: "😊" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "football",
        options: [
          { id: "a", text: "father", icon: "👨" },
          { id: "b", text: "football", icon: "⚽" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["F", "f", "Ff", "face", "foot", "father", "football"]
  },
  {
    id: 16,
    title: "Unit 16: At home",
    titleVi: "Bài 16: Ở nhà cùng gia đình",
    semester: 2,
    themeColor: "#3498DB",
    bgGradient: "from-blue-500 to-indigo-500",
    phonics: { letter: "Ww", sound: "/w/", guide: "Âm /w/ chu tròn môi như huýt sáo rồi mở ra" },
    bookPages: [68, 69, 70],
    pageIndices: [68, 69, 70],
    vocabulary: [
      { word: "wash", vi: "rửa tay, giặt giũ", ipa: "/wɒʃ/", icon: "🧼", example: "wash" },
      { word: "water", vi: "nước sạch tinh khiết", ipa: "/ˈwɔːtə/", icon: "💧", example: "water" },
      { word: "window", vi: "cửa sổ đón nắng", ipa: "/ˈwɪndəʊ/", icon: "🪟", example: "window" }
    ],
    sentences: [
      { en: "How many windows can you see? - I can see six.", vi: "Bé nhìn thấy mấy cửa sổ? - Mình thấy sáu cái." },
      { en: "How many windows can you see? - I can see four.", vi: "Bé nhìn thấy mấy cửa sổ? - Mình thấy bốn cái." },
      { en: "Wash your hands with water.", vi: "Rửa tay sạch với nước nhé." }
    ],
    chant: {
      title: "Listen and chant",
      lines: [
        "W, w, window. Look out the window.",
        "W, w, water. Wash with water.",
        "W, w, wash. Wash your hands clean!"
      ]
    },
    song: {
      title: "Let's sing!",
      lines: [
        "Wash, wash your hands with clean water.",
        "Look out the window at sweet home together!",
        "One, two, three, four, five and six windows!"
      ]
    },
    quizzes: [
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "water",
        options: [
          { id: "a", text: "water", icon: "💧" },
          { id: "b", text: "wash", icon: "🧼" }
        ],
        answer: "a"
      },
      {
        question: "Bé hãy nghe và chọn hình ảnh đúng nhé:",
        audioText: "window",
        options: [
          { id: "a", text: "water", icon: "💧" },
          { id: "b", text: "window", icon: "🪟" }
        ],
        answer: "b"
      }
    ],
    traceLetters: ["W", "w", "Ww", "wash", "water", "window"]
  }
];

// Special Sections (Fun Time & Review)
const EXTRA_SECTIONS = [
  { id: "fun1", title: "Fun Time 1", titleVi: "Giờ vui học 1", pages: [12, 13], pageIndices: [12, 13], type: "fun" },
  { id: "rev1", title: "Review 1", titleVi: "Ôn tập 1 (Unit 1 - 4)", pages: [20, 21, 22], pageIndices: [20, 21, 22], type: "review" },
  { id: "fun2", title: "Fun Time 2", titleVi: "Giờ vui học 2", pages: [29, 30], pageIndices: [29, 30], type: "fun" },
  { id: "rev2", title: "Review 2", titleVi: "Ôn tập 2 (Unit 5 - 8)", pages: [37, 38, 39], pageIndices: [37, 38, 39], type: "review" },
  { id: "fun3", title: "Fun Time 3", titleVi: "Giờ vui học 3", pages: [46, 47], pageIndices: [46, 47], type: "fun" },
  { id: "rev3", title: "Review 3", titleVi: "Ôn tập 3 (Unit 9 - 12)", pages: [54, 55, 56], pageIndices: [54, 55, 56], type: "review" },
  { id: "fun4", title: "Fun Time 4", titleVi: "Giờ vui học 4", pages: [63, 64], pageIndices: [63, 64], type: "fun" },
  { id: "rev4", title: "Review 4", titleVi: "Ôn tập 4 (Unit 13 - 16)", pages: [71, 72, 73], pageIndices: [71, 72, 73], type: "review" },
  { id: "glossary", title: "Glossary", titleVi: "Bảng tra từ vựng", pages: [74, 75, 76, 77, 78], pageIndices: [74, 75, 76, 77, 78], type: "glossary" }
];
