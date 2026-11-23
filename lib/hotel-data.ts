export type Lang = "id" | "en";

export type RoomCategory = "solo" | "couple" | "family";

export interface LocalizedText {
  id: string;
  en: string;
}

export interface RoomPhoto {
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface RoomType {
  id: string;
  name: string;
  pricePerNight: number;
  dimensions: string;
  areaSqm: number;
  maxAdults: number;
  category: RoomCategory;
  featured?: boolean;
  bedConfig: LocalizedText;
  summary: LocalizedText;
  amenities: LocalizedText[];
  photos: RoomPhoto[];
}

export interface GeneralFacility {
  key:
    | "breakfast"
    | "wifi"
    | "parking"
    | "ac"
    | "no-smoking"
    | "family";
  title: LocalizedText;
  detail: LocalizedText;
}

export interface LandmarkItem {
  name: LocalizedText;
  distance: LocalizedText;
  note: LocalizedText;
}

export interface GuestReview {
  id: string;
  author: string;
  badge?: string;
  rating: number;
  quote: LocalizedText;
}

export const HOTEL = {
  name: "Hotel GM Inn Syariah",
  shortName: "GM Inn",
  city: "Banda Aceh",
  district: "Peunayong, Kuta Alam",
  whatsappNumber: "6285320377277",
  whatsappDisplay: "0853-2037-7277",
  checkIn: "14:00 WIB",
  checkOut: "12:00 WIB",
  address:
    "Jl. Khairil Anwar No. 15–19, Peunayong, Kec. Kuta Alam, Kota Banda Aceh, Aceh",
  mapsUrl:
    "https://www.google.com/maps/place/Hotel+GM+Inn+Syariah/@5.5578239,95.318459,17z/data=!4m10!3m9!1s0x304037395512888b:0xd71753ea4dca80bb!5m3!1s2026-11-30!4m1!1i2!8m2!3d5.5578239!4d95.3210393!16s%2Fg%2F11fhr750kk",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Hotel+GM+Inn+Syariah,+Peunayong,+Banda+Aceh&ll=5.5578239,95.3210393&z=16&output=embed",
  heroImage: {
    src: "/images/hero/exterior.jpg",
    width: 2535,
    height: 2584,
    alt: {
      id: "Fasad bangunan Hotel GM Inn Syariah di Peunayong Banda Aceh dengan panel toska dan kanopi Rooftop Coffee & Food",
      en: "Exterior architecture of Hotel GM Inn Syariah in Peunayong, Banda Aceh featuring teal cladding and Rooftop Coffee & Food canopy",
    },
  },
  // Future photo slot: place dedicated rooftop image at public/images/rooftop/1.jpg and update path below.
  rooftopImage: null as string | null,
  promoCallout: {
    id: "Silakan hubungi kami untuk info promo harga",
    en: "Please contact us directly for current promo rates",
  },
} as const;

export const ROOMS: RoomType[] = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    pricePerNight: 195000,
    dimensions: "4 × 3,5 m",
    areaSqm: 14,
    maxAdults: 1,
    category: "solo",
    bedConfig: {
      id: "1 Tempat Tidur 4 Kaki",
      en: "1 Bed (4 ft)",
    },
    summary: {
      id: "Dirancang efisien untuk tamu solo atau perjalanan dinas singkat, lengkap dengan meja kerja, TV, dan kamar mandi air hangat.",
      en: "Efficiently laid out for solo travelers or brief business stays, complete with a work desk, TV, and hot-water shower.",
    },
    amenities: [
      { id: "AC", en: "Air Conditioning" },
      { id: "TV", en: "Television" },
      { id: "Water Heater", en: "Water Heater" },
      { id: "Meja Kerja", en: "Work Desk" },
      { id: "Handuk", en: "Fresh Towels" },
      { id: "Sabun & Sikat Gigi", en: "Soap & Dental Kit" },
    ],
    photos: [
      {
        src: "/images/rooms/deluxe-room/1.jpg",
        width: 3148,
        height: 2081,
        orientation: "landscape",
        alt: {
          id: "Deluxe Room Hotel GM Inn Syariah dengan tempat tidur 4 kaki, meja kerja, dan TV",
          en: "Deluxe Room at Hotel GM Inn Syariah with 4 ft bed, work desk, and wall-mounted TV",
        },
        caption: {
          id: "Tata ruang kamar Deluxe dengan meja kerja dan pencahayaan bersih",
          en: "Deluxe room layout featuring dedicated work desk and crisp lighting",
        },
      },
    ],
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    pricePerNight: 275000,
    dimensions: "4 × 4 m",
    areaSqm: 16,
    maxAdults: 2,
    category: "couple",
    bedConfig: {
      id: "1 Tempat Tidur 6 Kaki (Queen)",
      en: "1 Queen Bed (6 ft)",
    },
    summary: {
      id: "Kamar nyaman dengan ranjang ukuran Queen 6 kaki dan area wastafel praktis untuk dua tamu dewasa.",
      en: "Comfortable room with a 6 ft Queen bed and practical vanity sink area suited for two adult guests.",
    },
    amenities: [
      { id: "AC", en: "Air Conditioning" },
      { id: "TV", en: "Television" },
      { id: "Water Heater", en: "Water Heater" },
      { id: "Wastafel", en: "Vanity Sink" },
      { id: "Handuk", en: "Fresh Towels" },
      { id: "Sabun & Sikat Gigi", en: "Soap & Dental Kit" },
    ],
    photos: [
      {
        src: "/images/rooms/junior-suite/1.jpg",
        width: 4320,
        height: 2836,
        orientation: "landscape",
        alt: {
          id: "Junior Suite Hotel GM Inn Syariah dengan tempat tidur 6 kaki dan jendela terang",
          en: "Junior Suite at Hotel GM Inn Syariah with 6 ft Queen bed and bright window",
        },
        caption: {
          id: "Tempat tidur 6 kaki yang lega untuk istirahat dua tamu",
          en: "Spacious 6 ft bed prepared for two adult guests",
        },
      },
      {
        src: "/images/rooms/junior-suite/2.jpg",
        width: 1080,
        height: 713,
        orientation: "landscape",
        alt: {
          id: "Sudut ruangan Junior Suite dengan AC dan pencahayaan alami",
          en: "Side perspective of Junior Suite showing AC unit and natural daylight",
        },
        caption: {
          id: "Sirkulasi udara sejuk dengan AC dan jendela berpenutup rapi",
          en: "Cool air circulation with AC and clean window blinds",
        },
      },
    ],
  },
  {
    id: "suite-room",
    name: "Suite Room",
    pricePerNight: 335000,
    dimensions: "4 × 7 m",
    areaSqm: 28,
    maxAdults: 2,
    category: "couple",
    featured: true,
    bedConfig: {
      id: "1 Tempat Tidur 6 Kaki (Queen)",
      en: "1 Queen Bed (6 ft)",
    },
    summary: {
      id: "Kamar lapang berukuran 4 × 7 meter dengan meja kerja luas, area rias, dan kamar mandi shower air hangat.",
      en: "Generously proportioned 4 × 7 m suite featuring a wide work desk, vanity corner, and hot-water rain shower.",
    },
    amenities: [
      { id: "AC", en: "Air Conditioning" },
      { id: "TV", en: "Television" },
      { id: "Water Heater", en: "Water Heater" },
      { id: "Meja Kerja", en: "Work Desk" },
      { id: "Handuk", en: "Fresh Towels" },
      { id: "Sabun & Sikat Gigi", en: "Soap & Dental Kit" },
    ],
    photos: [
      {
        src: "/images/rooms/suite-room/1.jpg",
        width: 4320,
        height: 2844,
        orientation: "landscape",
        alt: {
          id: "Suite Room Hotel GM Inn Syariah dengan ranjang 6 kaki, panel kayu gelap, meja kerja, dan wastafel",
          en: "Suite Room at Hotel GM Inn Syariah with 6 ft bed, dark wood headboard wall, work desk, and sink",
        },
        caption: {
          id: "Suite Room lapang 28 m² dengan ranjang 6 kaki dan area kerja terpisah",
          en: "Spacious 28 m² Suite Room with 6 ft bed and separate work area",
        },
      },
      {
        src: "/images/rooms/suite-room/2.jpg",
        width: 1080,
        height: 712,
        orientation: "landscape",
        alt: {
          id: "Sudut kabinet TV dan pintu masuk kamar Suite Room",
          en: "TV console cabinet and room entryway view inside Suite Room",
        },
        caption: {
          id: "Area TV dan kabinet penyimpanan menghadap tempat tidur",
          en: "Television console and storage credenza facing the bed",
        },
      },
      {
        src: "/images/rooms/suite-room/3.jpg",
        width: 1080,
        height: 712,
        orientation: "landscape",
        alt: {
          id: "Kamar mandi Suite Room bersih dengan rain shower dan water heater",
          en: "Clean Suite Room bathroom equipped with rain shower and water heater",
        },
        caption: {
          id: "Kamar mandi pribadi lengkap dengan rain shower air hangat",
          en: "Private bathroom fitted with a hot-water rain shower",
        },
      },
    ],
  },
  {
    id: "suite-family",
    name: "Suite Family",
    pricePerNight: 425000,
    dimensions: "8 × 4 m",
    areaSqm: 32,
    maxAdults: 3,
    category: "family",
    bedConfig: {
      id: "3 Tempat Tidur Single",
      en: "3 Single Beds",
    },
    summary: {
      id: "Kamar luas 32 m² dengan tiga tempat tidur single terpisah, ideal untuk keluarga kecil, rombongan kerja, atau teman seperjalanan.",
      en: "Wide 32 m² room furnished with three individual single beds, ideal for small families, colleagues, or travel companions.",
    },
    amenities: [
      { id: "AC", en: "Air Conditioning" },
      { id: "TV", en: "Television" },
      { id: "Water Heater", en: "Water Heater" },
      { id: "Meja Kerja", en: "Work Desk" },
      { id: "Ketel Listrik & Air Mineral", en: "Electric Kettle & Bottled Water" },
      { id: "Kulkas Mini", en: "Mini Fridge" },
      { id: "Handuk", en: "Fresh Towels" },
      { id: "Sabun & Sikat Gigi", en: "Soap & Dental Kit" },
    ],
    photos: [
      {
        src: "/images/rooms/suite-family/1.jpg",
        width: 2160,
        height: 1624,
        orientation: "landscape",
        alt: {
          id: "Suite Family Hotel GM Inn Syariah dengan tiga tempat tidur single berjajar rapi",
          en: "Suite Family at Hotel GM Inn Syariah featuring three single beds arranged in a row",
        },
        caption: {
          id: "Tiga tempat tidur single dalam ruang 8 × 4 meter yang lega",
          en: "Three single beds inside an expansive 8 × 4 m floor plan",
        },
      },
      {
        src: "/images/rooms/suite-family/2.jpg",
        width: 1080,
        height: 1432,
        orientation: "portrait",
        alt: {
          id: "Detail susunan tiga ranjang empuk di Suite Family",
          en: "Closer view of the three padded headboard beds in Suite Family",
        },
        caption: {
          id: "Masing-masing tamu menikmati tempat tidur terpisah yang nyaman",
          en: "Dedicated single bed comfort for every guest",
        },
      },
      {
        src: "/images/rooms/suite-family/3.jpg",
        width: 1080,
        height: 1431,
        orientation: "portrait",
        alt: {
          id: "Area TV, ketel listrik, kulkas mini, dan meja panjang di Suite Family",
          en: "TV wall, electric kettle, mini fridge, and long desk console in Suite Family",
        },
        caption: {
          id: "Dilengkapi ketel listrik, air mineral, kulkas mini, dan meja kerja",
          en: "Equipped with electric kettle, mineral water, mini fridge, and desk",
        },
      },
      {
        src: "/images/rooms/suite-family/4.jpg",
        width: 1080,
        height: 1440,
        orientation: "portrait",
        alt: {
          id: "Wastafel dan area kamar mandi Suite Family",
          en: "Vanity sink and bathroom interior of Suite Family",
        },
        caption: {
          id: "Area wastafel dan kamar mandi bersih dengan perlengkapan lengkap",
          en: "Clean vanity sink and bathroom with full shower setup",
        },
      },
    ],
  },
  {
    id: "vip-executive",
    name: "VIP Executive",
    pricePerNight: 505000,
    dimensions: "8 × 4 m",
    areaSqm: 32,
    maxAdults: 4,
    category: "family",
    bedConfig: {
      id: "Pilihan 2 Kasur 6 Kaki atau 1 Kasur Besar + 2 Single",
      en: "Choice of 2 Queen Beds (6 ft) or 1 Queen + 2 Singles",
    },
    summary: {
      id: "Tipe tertinggi seluas 32 m² untuk hingga 4 tamu dewasa dengan fleksibilitas tata kasur keluarga, meja kerja, dan kamar mandi rain shower.",
      en: "Our flagship 32 m² suite accommodating up to 4 adult guests with flexible family bedding configurations, work desk, and rain shower.",
    },
    amenities: [
      { id: "AC", en: "Air Conditioning" },
      { id: "TV", en: "Television" },
      { id: "Water Heater", en: "Water Heater" },
      { id: "Meja Kerja", en: "Work Desk" },
      { id: "2 Pilihan Tata Kasur", en: "2 Bed Layout Options" },
      { id: "Handuk", en: "Fresh Towels" },
      { id: "Sabun & Sikat Gigi", en: "Soap & Dental Kit" },
    ],
    photos: [
      {
        src: "/images/rooms/vip-executive/1.jpg",
        width: 4320,
        height: 2820,
        orientation: "landscape",
        alt: {
          id: "VIP Executive Hotel GM Inn Syariah dengan area ruang lapang, meja kerja, dan lemari TV",
          en: "VIP Executive suite at Hotel GM Inn Syariah showcasing wide floor space, work desk, and TV cabinet",
        },
        caption: {
          id: "Tampak keseluruhan VIP Executive seluas 8 × 4 meter dengan meja kerja",
          en: "Wide perspective of the 8 × 4 m VIP Executive with work desk",
        },
      },
      {
        src: "/images/rooms/vip-executive/2.jpg",
        width: 1080,
        height: 812,
        orientation: "landscape",
        alt: {
          id: "Opsi tata kasur VIP Executive dengan 1 kasur besar dan 2 kasur single",
          en: "VIP Executive layout option with 1 Queen bed and 2 single beds",
        },
        caption: {
          id: "Opsi tata kasur A: 1 kasur besar (6 kaki) + 2 kasur single",
          en: "Bedding Option A: 1 Queen bed (6 ft) + 2 single beds",
        },
      },
      {
        src: "/images/rooms/vip-executive/3.jpg",
        width: 1080,
        height: 798,
        orientation: "landscape",
        alt: {
          id: "Opsi tata kasur VIP Executive dengan 2 tempat tidur 6 kaki berdampingan",
          en: "VIP Executive layout option featuring two 6 ft Queen beds",
        },
        caption: {
          id: "Opsi tata kasur B: 2 tempat tidur besar ukuran 6 kaki",
          en: "Bedding Option B: 2 full 6 ft Queen beds",
        },
      },
      {
        src: "/images/rooms/vip-executive/4.jpg",
        width: 1080,
        height: 1618,
        orientation: "portrait",
        alt: {
          id: "Kamar mandi VIP Executive dengan rain shower, tirai, dan water heater",
          en: "VIP Executive bathroom featuring rain shower, privacy curtain, and water heater",
        },
        caption: {
          id: "Kamar mandi modern dengan rain shower air hangat dan pembatas tirai",
          en: "Modern bathroom with hot-water rain shower and curtain divider",
        },
      },
    ],
  },
];

export const GENERAL_FACILITIES: GeneralFacility[] = [
  {
    key: "breakfast",
    title: { id: "Sarapan Gratis", en: "Complimentary Breakfast" },
    detail: {
      id: "Tersedia sajian sarapan setiap pagi bagi tamu yang menginap.",
      en: "Morning breakfast included for staying guests.",
    },
  },
  {
    key: "wifi",
    title: { id: "Wi-Fi Gratis", en: "Complimentary Wi-Fi" },
    detail: {
      id: "Akses internet nirkabel di seluruh kamar dan area hotel.",
      en: "Wireless internet coverage across guest rooms and common spaces.",
    },
  },
  {
    key: "parking",
    title: { id: "Parkir Gratis", en: "Free On-Site Parking" },
    detail: {
      id: "Area parkir kendaraan tamu tersedia tanpa biaya tambahan.",
      en: "Dedicated guest parking available at no extra charge.",
    },
  },
  {
    key: "ac",
    title: { id: "Ruangan Full AC", en: "Air-Conditioned Rooms" },
    detail: {
      id: "Setiap tipe kamar dilengkapi pendingin udara terawat.",
      en: "Every room category features maintained air conditioning.",
    },
  },
  {
    key: "no-smoking",
    title: { id: "Bebas Asap Rokok", en: "Non-Smoking Environment" },
    detail: {
      id: "Menjaga udara kamar tetap bersih, segar, dan nyaman.",
      en: "Keeping indoor rooms fresh, clean, and smoke-free.",
    },
  },
  {
    key: "family",
    title: { id: "Cocok untuk Anak & Keluarga", en: "Family & Child Friendly" },
    detail: {
      id: "Suasana tenang, ramah keluarga, dengan pilihan kamar berkapasitas besar.",
      en: "Calm family-oriented hospitality with spacious multi-bed room options.",
    },
  },
];

export const LANDMARKS: LandmarkItem[] = [
  {
    name: {
      id: "Masjid Raya Baiturrahman",
      en: "Baiturrahman Grand Mosque",
    },
    distance: {
      id: "~700 meter (10–12 menit jalan kaki)",
      en: "~700 meters (10–12 min walk)",
    },
    note: {
      id: "Ikon wisata religi dan pusat aktivitas warga Banda Aceh.",
      en: "Banda Aceh's landmark mosque and cultural centerpiece.",
    },
  },
  {
    name: {
      id: "Pasar Aceh Central & Suzuya Kampung Baru",
      en: "Pasar Aceh Central & Suzuya Kampung Baru",
    },
    distance: {
      id: "680 meter – 1 km",
      en: "680 meters – 1 km",
    },
    note: {
      id: "Akses cepat untuk kebutuhan belanja, suvenir, dan oleh-oleh khas Aceh.",
      en: "Quick access to daily essentials, shopping, and Acehnese souvenirs.",
    },
  },
  {
    name: {
      id: "Taman Sari (Bustanussalatin) & Museum Tsunami Aceh",
      en: "Taman Sari (Bustanussalatin) & Aceh Tsunami Museum",
    },
    distance: {
      id: "~1 km (area pusat kota)",
      en: "~1 km (city center)",
    },
    note: {
      id: "Ruang terbuka hijau bersejarah serta destinasi edukasi utama di Banda Aceh.",
      en: "Historic green park and major educational landmark in downtown Banda Aceh.",
    },
  },
  {
    name: {
      id: "Bandara Internasional Sultan Iskandar Muda (BTJ)",
      en: "Sultan Iskandar Muda International Airport (BTJ)",
    },
    distance: {
      id: "11–18 km (jalur darat)",
      en: "11–18 km (via road)",
    },
    note: {
      id: "Terhubung mudah dengan transportasi darat dari kawasan Peunayong.",
      en: "Easily connected by road transport from the Peunayong district.",
    },
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: "ahlul-khairi",
    author: "Ahlul Khairi",
    rating: 5,
    quote: {
      id: "Alhamdulillah saya pernah nginap di GM inn Hotel, kamar bagus bersih dan nyaman dan harga nya terjangkau pelayanan nya bagus karyawan nya ramah2 dan Hotel nya dekat pusat kota dan Mesjid raya Baiturrahman, semua serba dekat, sovenir, mie Aceh Razali, Nasi goreng Daus khas Aceh, warung kopi khas Aceh yg pasti siapa yg nginap di GM inn Hotel pasti puas",
      en: "I stayed at GM Inn Hotel and the room was clean and comfortable at an affordable rate. The service was attentive, the staff were friendly, and the hotel is right near the city center and Baiturrahman Grand Mosque—everything is close by, from souvenirs and Mie Aceh Razali to Nasi Goreng Daus and Acehnese coffee shops.",
    },
  },
  {
    id: "rovi-ka",
    author: "ROVI KA",
    badge: "Local Guide",
    rating: 5,
    quote: {
      id: "Nyaman, staf ramah, lokasi strategis pusat kota, harga terjangkau, toilet ada air panas jg ..rekomended deh",
      en: "Comfortable stay, friendly staff, strategic city-center location, affordable pricing, and hot water in the bathroom. Truly recommended.",
    },
  },
  {
    id: "reza-widya-noor",
    author: "Reza Widya Noor",
    rating: 5,
    quote: {
      id: "Wahh.. Ini salah satu hotel budget terbaik sih. Untuk hotel bintang 2 pelayanan nya sudah jauh diatas itu. Recepsionist nya cantik ramah, siapa ya namanya, Rista ya kalo gak salah. Saya pesan kamar Suite Room dapat harga promo 378.000. Kamarnya bersih, wangi, AC nya juga dingin. Kemarin ada kendala kerannya macet, teknisinya juga cepet tanggapnya. Sarapannya enak, nasi goreng nya best. Kalo ada ke Banda Aceh lagi, saya bakalan balik kesini.",
      en: "One of the best budget hotels around. The service feels well above its class, with a warm and helpful receptionist. I booked the Suite Room on a promo rate—clean, fresh-smelling, and cool AC. When a tap needed attention, maintenance responded promptly. The breakfast is delicious, especially the fried rice. I will definitely return on my next trip to Banda Aceh.",
    },
  },
];

export const UI_COPY = {
  nav: {
    rooms: { id: "Kamar", en: "Rooms" },
    rooftop: { id: "Rooftop", en: "Rooftop" },
    facilities: { id: "Fasilitas", en: "Facilities" },
    location: { id: "Lokasi", en: "Location" },
    reviews: { id: "Ulasan", en: "Reviews" },
    bookNow: { id: "Pesan WA", en: "Book via WA" },
  },
  hero: {
    eyebrow: {
      id: "Peunayong · Pusat Kota Banda Aceh",
      en: "Peunayong · Central Banda Aceh",
    },
    title: {
      id: "Kenyamanan Tenang di Jantung Banda Aceh.",
      en: "Quiet Comfort in the Heart of Banda Aceh.",
    },
    subtitle: {
      id: "Penginapan syariah yang bersih, ramah keluarga, dan berjarak jalan kaki dari Masjid Raya Baiturrahman serta pusat kuliner Peunayong.",
      en: "Clean, family-oriented sharia hospitality within walking distance of Baiturrahman Grand Mosque and Peunayong's culinary district.",
    },
    factRate: {
      id: "Mulai Rp 195.000 / malam",
      en: "From Rp 195,000 / night",
    },
    factMosque: {
      id: "700 m ke Masjid Raya Baiturrahman",
      en: "700 m to Baiturrahman Mosque",
    },
    factHours: {
      id: "Check-in 14:00 · Check-out 12:00",
      en: "Check-in 14:00 · Check-out 12:00",
    },
    ctaPrimary: {
      id: "Pesan via WhatsApp",
      en: "Book via WhatsApp",
    },
    ctaSecondary: {
      id: "Lihat Pilihan Kamar",
      en: "Explore Rooms",
    },
    buildingCaption: {
      id: "Jl. Khairil Anwar No. 15–19 · Peunayong, Banda Aceh",
      en: "Jl. Khairil Anwar No. 15–19 · Peunayong, Banda Aceh",
    },
  },
  bookingBar: {
    title: {
      id: "Pemesanan Langsung Tanpa Perantara",
      en: "Direct Reservation Inquiry",
    },
    checkIn: { id: "Tanggal Check-in", en: "Check-in Date" },
    checkOut: { id: "Tanggal Check-out", en: "Check-out Date" },
    roomType: { id: "Pilih Tipe Kamar", en: "Select Room Type" },
    guests: { id: "Jumlah Tamu", en: "Guests" },
    guestUnit: { id: "Tamu", en: "Guests" },
    submit: {
      id: "Cek Ketersediaan & Promo",
      en: "Check Availability & Promo",
    },
    helper: {
      id: "Terhubung langsung ke WhatsApp resmi Hotel GM Inn Syariah",
      en: "Connects directly to Hotel GM Inn Syariah official WhatsApp",
    },
  },
  rooms: {
    eyebrow: { id: "Pilihan Kamar", en: "Accommodations" },
    heading: {
      id: "Lima Tipe Kamar untuk Setiap Perjalanan",
      en: "Five Room Categories for Every Stay",
    },
    lead: {
      id: "Seluruh kamar dilengkapi AC, TV, water heater, handuk bersih, serta perlengkapan mandi.",
      en: "All rooms include air conditioning, television, hot-water shower, fresh towels, and bath essentials.",
    },
    filterAll: { id: "Semua (5)", en: "All (5)" },
    filterSolo: { id: "Solo (1)", en: "Solo (1)" },
    filterCouple: { id: "Pasangan (2)", en: "Couples (2)" },
    filterFamily: { id: "Keluarga & Grup (2)", en: "Family & Group (2)" },
    featuredTag: { id: "Pilihan Populer", en: "Guest Favorite" },
    perNight: { id: "/ malam", en: "/ night" },
    askPromo: { id: "Tanya Harga Promo", en: "Inquire Promo Rate" },
    viewPhotos: { id: "Detail & Foto", en: "Details & Photos" },
    bookRoom: { id: "Pesan via WhatsApp", en: "Book via WhatsApp" },
    specSize: { id: "Luas", en: "Size" },
    specCapacity: { id: "Kapasitas", en: "Capacity" },
    specBed: { id: "Tempat Tidur", en: "Bedding" },
    adultSingular: { id: "Orang Dewasa", en: "Adult" },
    adultPlural: { id: "Orang Dewasa", en: "Adults" },
    photoLabel: { id: "Foto", en: "Photo" },
    ofLabel: { id: "dari", en: "of" },
    closeModal: { id: "Tutup galeri", en: "Close gallery" },
  },
  rooftop: {
    eyebrow: { id: "Pengalaman Lantai Atas", en: "Upper-Floor Experience" },
    heading: {
      id: "Rooftop Coffee & Food",
      en: "Rooftop Coffee & Food",
    },
    lead: {
      id: "Nikmati seduhan kopi Aceh dan hidangan hangat di ruang santai lantai atas tanpa perlu meninggalkan area hotel.",
      en: "Unwind with Acehnese coffee and warm dishes at our upper-level dining lounge without stepping away from the hotel.",
    },
    highlights: [
      {
        title: { id: "Kopi & Sajian Hangat", en: "Coffee & Warm Meals" },
        detail: {
          id: "Pilihan minuman kopi hangat maupun dingin serta menu makanan santai untuk sore hingga malam.",
          en: "Hot and iced coffee selections alongside casual plates for afternoon and evening breaks.",
        },
      },
      {
        title: { id: "Suasana Santai Lantai Atas", en: "Relaxed Rooftop Setting" },
        detail: {
          id: "Tempat nyaman untuk berbincang bersama keluarga, rekan kerja, atau bersantai setelah beraktivitas di kota.",
          en: "A calm vantage point for conversations with family, colleagues, or unwinding after exploring the city.",
        },
      },
      {
        title: { id: "Praktis bagi Tamu Menginap", en: "Convenient for Guests" },
        detail: {
          id: "Berada satu gedung dengan kamar menginap di Jl. Khairil Anwar, Peunayong.",
          en: "Located in the same building as your stay on Jl. Khairil Anwar, Peunayong.",
        },
      },
    ],
    cta: {
      id: "Tanya Jam Buka & Menu via WA",
      en: "Ask Menu & Hours via WhatsApp",
    },
    imageCaption: {
      id: "Fasad Hotel GM Inn Syariah & Kanopi Rooftop Coffee & Food — foto interior rooftop akan segera ditambahkan.",
      en: "Hotel GM Inn Syariah façade & Rooftop Coffee & Food canopy — dedicated rooftop interior photos arriving soon.",
    },
  },
  facilities: {
    eyebrow: { id: "Fasilitas & Ketentuan", en: "Facilities & Stay Info" },
    heading: {
      id: "Kenyamanan Praktis Selama Menginap",
      en: "Essential Comforts Throughout Your Stay",
    },
    checkInLabel: { id: "Waktu Check-in", en: "Check-in Time" },
    checkOutLabel: { id: "Waktu Check-out", en: "Check-out Time" },
    checkInNote: {
      id: "Resepsionis siap membantu proses kedatangan Anda",
      en: "Front desk ready to welcome your arrival",
    },
    checkOutNote: {
      id: "Hubungi resepsionis lebih awal jika memerlukan informasi perpanjangan",
      en: "Contact reception in advance for extension inquiries",
    },
  },
  location: {
    eyebrow: { id: "Lokasi Strategis", en: "Prime Location" },
    heading: {
      id: "Di Tengah Pusat Kuliner & Wisata Banda Aceh",
      en: "Centered Amidst Banda Aceh's Landmarks & Dining",
    },
    culinaryNote: {
      id: "Kawasan Peunayong dikenal sebagai pusat kuliner malam, warung kopi Aceh, dan sentra oleh-oleh yang mudah dijangkau dengan berjalan kaki.",
      en: "The Peunayong neighborhood is renowned for Acehnese coffee houses, local evening dining, and souvenir shops within easy walking reach.",
    },
    openMaps: {
      id: "Buka di Google Maps",
      en: "Open in Google Maps",
    },
  },
  reviews: {
    eyebrow: { id: "Ulasan Tamu Google", en: "Google Guest Reviews" },
    heading: {
      id: "Pengalaman Nyata Para Tamu",
      en: "Verified Impressions from Guests",
    },
    subline: {
      id: "Kutipan ulasan bintang 5 dari halaman Google Maps resmi Hotel GM Inn Syariah.",
      en: "Featured 5-star guest reviews from Hotel GM Inn Syariah's Google Maps listing.",
    },
    translatedNote: {
      id: "",
      en: "Translated from Indonesian Google Review",
    },
    viewGoogle: {
      id: "Lihat Lokasi & Ulasan di Maps",
      en: "View Listing on Google Maps",
    },
  },
  closing: {
    eyebrow: { id: "Reservasi Langsung", en: "Direct Reservation" },
    heading: {
      id: "Siap Berkunjung ke Banda Aceh?",
      en: "Planning Your Visit to Banda Aceh?",
    },
    subtitle: {
      id: "Hubungi tim kami langsung lewat WhatsApp untuk konfirmasi kamar pilihan Anda serta informasi promo harga yang sedang berlaku.",
      en: "Message our front desk directly on WhatsApp to confirm room availability and ask about current promo rates.",
    },
    ctaPrimary: {
      id: "Chat WhatsApp (0853-2037-7277)",
      en: "Chat on WhatsApp (0853-2037-7277)",
    },
  },
  footer: {
    tagline: {
      id: "Penginapan syariah strategis di Peunayong, Banda Aceh.",
      en: "Strategic sharia hospitality in Peunayong, Banda Aceh.",
    },
    navHeading: { id: "Navigasi", en: "Navigation" },
    infoHeading: { id: "Informasi Menginap", en: "Stay Information" },
    contactHeading: { id: "Alamat & Kontak", en: "Address & Contact" },
    hoursLabel: {
      id: "Check-in 14:00 WIB · Check-out 12:00 WIB",
      en: "Check-in 14:00 WIB · Check-out 12:00 WIB",
    },
  },
} as const;

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${HOTEL.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
