/* 
  Algeria administrative divisions (69 wilayas / 1541 communes)
  Confirmed by Algeria's Journal Officiel, law published April 5, 2026.
*/

export type Commune = {
  id: number;
  name: string;
  name_ar: string;
};

export type Wilaya = {
  id: number;
  name: string;
  name_ar: string;
  communes_count: number;
  communes: Commune[];
};

export type AlgeriaAdministrativeDivisions = {
  country: string;
  total_wilayas: number;
  total_communes: number;
  source_note?: string;
  wilayas: Wilaya[];
};

export const ADMIN_TERMS = {
  ar: {
    wilaya: "الولاية",
    commune: "البلدية",
  },
  en: {
    wilaya: "Wilaya",
    commune: "Municipality",
  },
  fr: {
    wilaya: "Wilaya",
    commune: "Commune",
  },
} as const;

export const algeriaAdministrativeDivisions: AlgeriaAdministrativeDivisions = {
  "country": "Algeria",
  "total_wilayas": 69,
  "total_communes": 1541,
  "source_note": "Built from a 69-wilaya JSON dataset and checked against Algeria's April 2026 territorial law.",
  "wilayas": [
    {
      "id": 1,
      "name": "Adrar",
      "name_ar": "أدرار",
      "communes_count": 16,
      "communes": [
        {
          "id": 1,
          "name": "Timekten",
          "name_ar": "تيمقتن"
        },
        {
          "id": 2,
          "name": "Bouda",
          "name_ar": "بودة"
        },
        {
          "id": 3,
          "name": "Ouled Ahmed Timmi",
          "name_ar": "أولاد أحمد تيمي"
        },
        {
          "id": 4,
          "name": "Adrar",
          "name_ar": "أدرار"
        },
        {
          "id": 5,
          "name": "Fenoughil",
          "name_ar": "فنوغيل"
        },
        {
          "id": 6,
          "name": "In Zghmir",
          "name_ar": "إن زغمير"
        },
        {
          "id": 7,
          "name": "Reggane",
          "name_ar": "رقان"
        },
        {
          "id": 8,
          "name": "Sali",
          "name_ar": "سالي"
        },
        {
          "id": 9,
          "name": "Sebaa",
          "name_ar": "السبع"
        },
        {
          "id": 10,
          "name": "Tsabit",
          "name_ar": "تسابيت"
        },
        {
          "id": 11,
          "name": "Tamest",
          "name_ar": "تامست"
        },
        {
          "id": 12,
          "name": "Tamantit",
          "name_ar": "تامنطيط"
        },
        {
          "id": 13,
          "name": "Tit",
          "name_ar": "تيت"
        },
        {
          "id": 14,
          "name": "Zaouiet Kounta",
          "name_ar": "زاوية كنتة"
        },
        {
          "id": 15,
          "name": "Akabli",
          "name_ar": "اقبلي"
        },
        {
          "id": 16,
          "name": "Aoulef",
          "name_ar": "أولف"
        }
      ]
    },
    {
      "id": 2,
      "name": "Chlef",
      "name_ar": "الشلف",
      "communes_count": 35,
      "communes": [
        {
          "id": 17,
          "name": "Talassa",
          "name_ar": "تلعصة"
        },
        {
          "id": 18,
          "name": "Zeboudja",
          "name_ar": "الزبوجة"
        },
        {
          "id": 19,
          "name": "El Hadjadj",
          "name_ar": "الحجاج"
        },
        {
          "id": 20,
          "name": "Ouled Ben Abdelkader",
          "name_ar": "أولاد بن عبد القادر"
        },
        {
          "id": 21,
          "name": "Ain Merane",
          "name_ar": "عين مران"
        },
        {
          "id": 22,
          "name": "Breira",
          "name_ar": "بريرة"
        },
        {
          "id": 23,
          "name": "Ouled Abbes",
          "name_ar": "أولاد عباس"
        },
        {
          "id": 24,
          "name": "Oued Fodda",
          "name_ar": "وادي الفضة"
        },
        {
          "id": 25,
          "name": "Beni Rached",
          "name_ar": "بني راشد"
        },
        {
          "id": 26,
          "name": "Herenfa",
          "name_ar": "الهرانفة"
        },
        {
          "id": 27,
          "name": "Tadjena",
          "name_ar": "تاجنة"
        },
        {
          "id": 28,
          "name": "El Marsa",
          "name_ar": "المرسى"
        },
        {
          "id": 29,
          "name": "Chlef",
          "name_ar": "الشلف"
        },
        {
          "id": 30,
          "name": "Oum Drou",
          "name_ar": "أم الدروع"
        },
        {
          "id": 31,
          "name": "Sendjas",
          "name_ar": "سنجاس"
        },
        {
          "id": 32,
          "name": "Sidi Abderrahmane",
          "name_ar": "سيدي عبد الرحمن"
        },
        {
          "id": 33,
          "name": "Sidi Akkacha",
          "name_ar": "سيدي عكاشة"
        },
        {
          "id": 34,
          "name": "Tenes",
          "name_ar": "تنس"
        },
        {
          "id": 35,
          "name": "Beni  Bouattab",
          "name_ar": "بني بوعتاب"
        },
        {
          "id": 36,
          "name": "El Karimia",
          "name_ar": "الكريمية"
        },
        {
          "id": 37,
          "name": "Harchoun",
          "name_ar": "حرشون"
        },
        {
          "id": 38,
          "name": "Bouzeghaia",
          "name_ar": "بوزغاية"
        },
        {
          "id": 39,
          "name": "Taougrit",
          "name_ar": "تاوقريت"
        },
        {
          "id": 40,
          "name": "Beni Haoua",
          "name_ar": "بني حواء"
        },
        {
          "id": 41,
          "name": "Abou El Hassane",
          "name_ar": "أبو الحسن"
        },
        {
          "id": 42,
          "name": "Oued Goussine",
          "name_ar": "وادي قوسين"
        },
        {
          "id": 43,
          "name": "Chettia",
          "name_ar": "الشطية"
        },
        {
          "id": 44,
          "name": "Moussadek",
          "name_ar": "مصدق"
        },
        {
          "id": 45,
          "name": "Ouled Fares",
          "name_ar": "أولاد فارس"
        },
        {
          "id": 46,
          "name": "Boukadir",
          "name_ar": "بوقادير"
        },
        {
          "id": 47,
          "name": "Oued Sly",
          "name_ar": "وادي سلي"
        },
        {
          "id": 48,
          "name": "Sobha",
          "name_ar": "الصبحة"
        },
        {
          "id": 49,
          "name": "Benairia",
          "name_ar": "بنايرية"
        },
        {
          "id": 50,
          "name": "Labiod Medjadja",
          "name_ar": "الأبيض مجاجة"
        },
        {
          "id": 51,
          "name": "Dahra",
          "name_ar": "الظهرة"
        }
      ]
    },
    {
      "id": 3,
      "name": "Laghouat",
      "name_ar": "الأغواط",
      "communes_count": 12,
      "communes": [
        {
          "id": 56,
          "name": "Tadjemout",
          "name_ar": "تاجموت"
        },
        {
          "id": 60,
          "name": "Tadjrouna",
          "name_ar": "تاجرونة"
        },
        {
          "id": 64,
          "name": "Laghouat",
          "name_ar": "الأغواط"
        },
        {
          "id": 66,
          "name": "Ksar El Hirane",
          "name_ar": "قصر الحيران"
        },
        {
          "id": 67,
          "name": "El Assafia",
          "name_ar": "العسافية"
        },
        {
          "id": 68,
          "name": "Sidi Makhlouf",
          "name_ar": "سيدي مخلوف"
        },
        {
          "id": 69,
          "name": "Hassi Delaa",
          "name_ar": "حاسي الدلاعة"
        },
        {
          "id": 70,
          "name": "Hassi R'mel",
          "name_ar": "حاسي الرمل"
        },
        {
          "id": 71,
          "name": "Ain Madhi",
          "name_ar": "عين ماضي"
        },
        {
          "id": 72,
          "name": "El Haouaita",
          "name_ar": "الحويطة"
        },
        {
          "id": 73,
          "name": "Kheneg",
          "name_ar": "الخنق"
        },
        {
          "id": 74,
          "name": "Benacer Benchohra",
          "name_ar": "بن ناصر بن شهرة"
        }
      ]
    },
    {
      "id": 4,
      "name": "Oum El Bouaghi",
      "name_ar": "أم البواقي",
      "communes_count": 29,
      "communes": [
        {
          "id": 76,
          "name": "Fkirina",
          "name_ar": "فكيرينة"
        },
        {
          "id": 77,
          "name": "El Fedjoudj Boughrara Sa",
          "name_ar": "الفجوج بوغرارة سعودي"
        },
        {
          "id": 78,
          "name": "Ain Fekroun",
          "name_ar": "عين فكرون"
        },
        {
          "id": 79,
          "name": "Rahia",
          "name_ar": "الرحية"
        },
        {
          "id": 80,
          "name": "Meskiana",
          "name_ar": "مسكيانة"
        },
        {
          "id": 81,
          "name": "El Belala",
          "name_ar": "البلالة"
        },
        {
          "id": 82,
          "name": "Behir Chergui",
          "name_ar": "بحير الشرقي"
        },
        {
          "id": 83,
          "name": "Ksar Sbahi",
          "name_ar": "قصر الصباحي"
        },
        {
          "id": 84,
          "name": "Souk Naamane",
          "name_ar": "سوق نعمان"
        },
        {
          "id": 85,
          "name": "Ouled Zouai",
          "name_ar": "أولاد زواي"
        },
        {
          "id": 86,
          "name": "Oum El Bouaghi",
          "name_ar": "أم البواقي"
        },
        {
          "id": 87,
          "name": "Ain Babouche",
          "name_ar": "عين ببوش"
        },
        {
          "id": 88,
          "name": "Ain Zitoun",
          "name_ar": "عين الزيتون"
        },
        {
          "id": 89,
          "name": "Bir Chouhada",
          "name_ar": "بئر الشهداء"
        },
        {
          "id": 90,
          "name": "Ain Beida",
          "name_ar": "عين البيضاء"
        },
        {
          "id": 91,
          "name": "Berriche",
          "name_ar": "بريش"
        },
        {
          "id": 92,
          "name": "Zorg",
          "name_ar": "الزرق"
        },
        {
          "id": 93,
          "name": "Ain M'lila",
          "name_ar": "عين مليلة"
        },
        {
          "id": 94,
          "name": "Ouled Gacem",
          "name_ar": "أولاد قاسم"
        },
        {
          "id": 95,
          "name": "Ouled Hamla",
          "name_ar": "أولاد حملة"
        },
        {
          "id": 96,
          "name": "El Amiria",
          "name_ar": "العامرية"
        },
        {
          "id": 97,
          "name": "Sigus",
          "name_ar": "سيقوس"
        },
        {
          "id": 98,
          "name": "Oued Nini",
          "name_ar": "وادي نيني"
        },
        {
          "id": 99,
          "name": "Ain Diss",
          "name_ar": "عين الديس"
        },
        {
          "id": 100,
          "name": "Dhalaa",
          "name_ar": "الضلعة"
        },
        {
          "id": 101,
          "name": "El Djazia",
          "name_ar": "الجازية"
        },
        {
          "id": 102,
          "name": "Ain Kercha",
          "name_ar": "عين كرشة"
        },
        {
          "id": 103,
          "name": "El Harmilia",
          "name_ar": "الحرملية"
        },
        {
          "id": 104,
          "name": "Hanchir Toumghani",
          "name_ar": "هنشير تومغني"
        }
      ]
    },
    {
      "id": 5,
      "name": "Batna",
      "name_ar": "باتنة",
      "communes_count": 53,
      "communes": [
        {
          "id": 105,
          "name": "Maafa",
          "name_ar": "معافة"
        },
        {
          "id": 106,
          "name": "Gosbat",
          "name_ar": "القصبات"
        },
        {
          "id": 107,
          "name": "Timgad",
          "name_ar": "تيمقاد"
        },
        {
          "id": 108,
          "name": "Taxlent",
          "name_ar": "تاكسلانت"
        },
        {
          "id": 109,
          "name": "Ouled Si Slimane",
          "name_ar": "أولاد سي سليمان"
        },
        {
          "id": 110,
          "name": "Lemcene",
          "name_ar": "لمسان"
        },
        {
          "id": 111,
          "name": "Talkhamt",
          "name_ar": "تالخمت"
        },
        {
          "id": 112,
          "name": "Ras El Aioun",
          "name_ar": "رأس العيون"
        },
        {
          "id": 113,
          "name": "Rahbat",
          "name_ar": "الرحبات"
        },
        {
          "id": 114,
          "name": "Ouled Sellem",
          "name_ar": "أولاد سلام"
        },
        {
          "id": 115,
          "name": "Guigba",
          "name_ar": "القيقبة"
        },
        {
          "id": 116,
          "name": "Teniet El Abed",
          "name_ar": "ثنية العابد"
        },
        {
          "id": 117,
          "name": "Batna",
          "name_ar": "باتنة"
        },
        {
          "id": 118,
          "name": "Fesdis",
          "name_ar": "فسديس"
        },
        {
          "id": 119,
          "name": "Oued Chaaba",
          "name_ar": "وادي الشعبة"
        },
        {
          "id": 120,
          "name": "Hidoussa",
          "name_ar": "حيدوسة"
        },
        {
          "id": 121,
          "name": "Ksar Bellezma",
          "name_ar": "قصر بلزمة"
        },
        {
          "id": 122,
          "name": "Merouana",
          "name_ar": "مروانة"
        },
        {
          "id": 123,
          "name": "Oued El Ma",
          "name_ar": "وادي الماء"
        },
        {
          "id": 124,
          "name": "Lazrou",
          "name_ar": "لازرو"
        },
        {
          "id": 125,
          "name": "Seriana",
          "name_ar": "سريانة"
        },
        {
          "id": 126,
          "name": "Zanet El Beida",
          "name_ar": "زانة البيضاء"
        },
        {
          "id": 127,
          "name": "Menaa",
          "name_ar": "منعة"
        },
        {
          "id": 128,
          "name": "Tigharghar",
          "name_ar": "تغرغار"
        },
        {
          "id": 129,
          "name": "Ain Yagout",
          "name_ar": "عين ياقوت"
        },
        {
          "id": 130,
          "name": "Boumia",
          "name_ar": "بومية"
        },
        {
          "id": 131,
          "name": "Djerma",
          "name_ar": "جرمة"
        },
        {
          "id": 132,
          "name": "El Madher",
          "name_ar": "المعذر"
        },
        {
          "id": 133,
          "name": "Ouyoun El Assafir",
          "name_ar": "عيون العصافير"
        },
        {
          "id": 134,
          "name": "Tazoult",
          "name_ar": "تازولت"
        },
        {
          "id": 135,
          "name": "Boumagueur",
          "name_ar": "بومقر"
        },
        {
          "id": 136,
          "name": "N Gaous",
          "name_ar": "نقاوس"
        },
        {
          "id": 137,
          "name": "Sefiane",
          "name_ar": "سفيان"
        },
        {
          "id": 138,
          "name": "Arris",
          "name_ar": "أريس"
        },
        {
          "id": 139,
          "name": "Tighanimine",
          "name_ar": "تيغانمين"
        },
        {
          "id": 140,
          "name": "Ain Djasser",
          "name_ar": "عين جاسر"
        },
        {
          "id": 141,
          "name": "El Hassi",
          "name_ar": "الحاسي"
        },
        {
          "id": 144,
          "name": "Foum Toub",
          "name_ar": "فم الطوب"
        },
        {
          "id": 145,
          "name": "Ichemoul",
          "name_ar": "إشمول"
        },
        {
          "id": 146,
          "name": "Inoughissen",
          "name_ar": "إينوغيسن"
        },
        {
          "id": 147,
          "name": "Bouzina",
          "name_ar": "بوزينة"
        },
        {
          "id": 148,
          "name": "Larbaa",
          "name_ar": "لارباع"
        },
        {
          "id": 149,
          "name": "Boulhilat",
          "name_ar": "بولهيلات"
        },
        {
          "id": 150,
          "name": "Chemora",
          "name_ar": "الشمرة"
        },
        {
          "id": 157,
          "name": "Ghassira",
          "name_ar": "غسيرة"
        },
        {
          "id": 158,
          "name": "Kimmel",
          "name_ar": "كيمل"
        },
        {
          "id": 159,
          "name": "T Kout",
          "name_ar": "تكوت"
        },
        {
          "id": 160,
          "name": "Ain Touta",
          "name_ar": "عين التوتة"
        },
        {
          "id": 161,
          "name": "Beni Foudhala El Hakania",
          "name_ar": "بني فضالة الحقانية"
        },
        {
          "id": 162,
          "name": "Ouled Fadel",
          "name_ar": "أولاد فاضل"
        },
        {
          "id": 163,
          "name": "Ouled Aouf",
          "name_ar": "أولاد عوف"
        },
        {
          "id": 164,
          "name": "Chir",
          "name_ar": "شير"
        },
        {
          "id": 165,
          "name": "Oued Taga",
          "name_ar": "وادي الطاقة"
        }
      ]
    },
    {
      "id": 6,
      "name": "Bejaia",
      "name_ar": "بجاية",
      "communes_count": 52,
      "communes": [
        {
          "id": 166,
          "name": "Sidi Ayad",
          "name_ar": "سيدي عياد"
        },
        {
          "id": 167,
          "name": "Barbacha",
          "name_ar": "برباشة"
        },
        {
          "id": 168,
          "name": "Leflaye",
          "name_ar": "الفلاي"
        },
        {
          "id": 169,
          "name": "Kendira",
          "name_ar": "كنديرة"
        },
        {
          "id": 170,
          "name": "Sidi-Aich",
          "name_ar": "سيدي عيش"
        },
        {
          "id": 171,
          "name": "Tifra",
          "name_ar": "تيفرة"
        },
        {
          "id": 172,
          "name": "Tinebdar",
          "name_ar": "تينبدار"
        },
        {
          "id": 173,
          "name": "El Kseur",
          "name_ar": "القصر"
        },
        {
          "id": 174,
          "name": "Fenaia Il Maten",
          "name_ar": "فناية الماثن"
        },
        {
          "id": 175,
          "name": "Toudja",
          "name_ar": "توجة"
        },
        {
          "id": 176,
          "name": "Dra El Caid",
          "name_ar": "ذراع القايد"
        },
        {
          "id": 177,
          "name": "Kherrata",
          "name_ar": "خراطة"
        },
        {
          "id": 178,
          "name": "Bejaia",
          "name_ar": "بجاية"
        },
        {
          "id": 179,
          "name": "Oued Ghir",
          "name_ar": "وادي غير"
        },
        {
          "id": 180,
          "name": "Benimaouche",
          "name_ar": "بني معوش"
        },
        {
          "id": 181,
          "name": "Beni Djellil",
          "name_ar": "بني جليل"
        },
        {
          "id": 182,
          "name": "Feraoun",
          "name_ar": "فرعون"
        },
        {
          "id": 183,
          "name": "Smaoun",
          "name_ar": "سمعون"
        },
        {
          "id": 184,
          "name": "Timezrit",
          "name_ar": "تيمزريت"
        },
        {
          "id": 185,
          "name": "Melbou",
          "name_ar": "مالبو"
        },
        {
          "id": 186,
          "name": "Souk El Tenine",
          "name_ar": "سوق لإثنين"
        },
        {
          "id": 187,
          "name": "Tamridjet",
          "name_ar": "تامريجت"
        },
        {
          "id": 188,
          "name": "Boukhelifa",
          "name_ar": "بوخليفة"
        },
        {
          "id": 189,
          "name": "Tala Hamza",
          "name_ar": "تالة حمزة"
        },
        {
          "id": 190,
          "name": "Tichy",
          "name_ar": "تيشي"
        },
        {
          "id": 191,
          "name": "Ait R'zine",
          "name_ar": "أيت رزين"
        },
        {
          "id": 192,
          "name": "Ighil-Ali",
          "name_ar": "إغيل علي"
        },
        {
          "id": 193,
          "name": "Ait-Smail",
          "name_ar": "أيت إسماعيل"
        },
        {
          "id": 194,
          "name": "Darguina",
          "name_ar": "درقينة"
        },
        {
          "id": 195,
          "name": "Taskriout",
          "name_ar": "تاسكريوت"
        },
        {
          "id": 196,
          "name": "Aokas",
          "name_ar": "أوقاس"
        },
        {
          "id": 197,
          "name": "Tizi-N'berber",
          "name_ar": "تيزي نبربر"
        },
        {
          "id": 198,
          "name": "Adekar",
          "name_ar": "أدكار"
        },
        {
          "id": 199,
          "name": "Beni K'sila",
          "name_ar": "بني كسيلة"
        },
        {
          "id": 200,
          "name": "Taourit Ighil",
          "name_ar": "تاوريرت إغيل"
        },
        {
          "id": 201,
          "name": "Akbou",
          "name_ar": "أقبو"
        },
        {
          "id": 202,
          "name": "Chellata",
          "name_ar": "شلاطة"
        },
        {
          "id": 203,
          "name": "Ighram",
          "name_ar": "اغرم"
        },
        {
          "id": 204,
          "name": "Tamokra",
          "name_ar": "تامقرة"
        },
        {
          "id": 205,
          "name": "Amalou",
          "name_ar": "أمالو"
        },
        {
          "id": 206,
          "name": "Bouhamza",
          "name_ar": "بوحمزة"
        },
        {
          "id": 207,
          "name": "M'cisna",
          "name_ar": "مسيسنة"
        },
        {
          "id": 208,
          "name": "Seddouk",
          "name_ar": "صدوق"
        },
        {
          "id": 209,
          "name": "Beni-Mallikeche",
          "name_ar": "بني مليكش"
        },
        {
          "id": 210,
          "name": "Boudjellil",
          "name_ar": "بو جليل"
        },
        {
          "id": 211,
          "name": "Tazmalt",
          "name_ar": "تازمالت"
        },
        {
          "id": 212,
          "name": "Akfadou",
          "name_ar": "أكفادو"
        },
        {
          "id": 213,
          "name": "Chemini",
          "name_ar": "شميني"
        },
        {
          "id": 214,
          "name": "Souk Oufella",
          "name_ar": "سوق اوفلا"
        },
        {
          "id": 215,
          "name": "Tibane",
          "name_ar": "طيبان"
        },
        {
          "id": 216,
          "name": "Ouzellaguen",
          "name_ar": "أوزلاقن"
        },
        {
          "id": 217,
          "name": "Amizour",
          "name_ar": "أميزور"
        }
      ]
    },
    {
      "id": 7,
      "name": "Biskra",
      "name_ar": "بسكرة",
      "communes_count": 22,
      "communes": [
        {
          "id": 218,
          "name": "El Feidh",
          "name_ar": "الفيض"
        },
        {
          "id": 219,
          "name": "Lichana",
          "name_ar": "ليشانة"
        },
        {
          "id": 220,
          "name": "Bouchakroun",
          "name_ar": "بوشقرون"
        },
        {
          "id": 221,
          "name": "Mekhadma",
          "name_ar": "مخادمة"
        },
        {
          "id": 226,
          "name": "Khenguet Sidi Nadji",
          "name_ar": "خنقة سيدي ناجي"
        },
        {
          "id": 228,
          "name": "Zeribet El Oued",
          "name_ar": "زريبة الوادي"
        },
        {
          "id": 229,
          "name": "Meziraa",
          "name_ar": "المزيرعة"
        },
        {
          "id": 230,
          "name": "Biskra",
          "name_ar": "بسكرة"
        },
        {
          "id": 231,
          "name": "El Hadjab",
          "name_ar": "الحاجب"
        },
        {
          "id": 232,
          "name": "M'lili",
          "name_ar": "مليلي"
        },
        {
          "id": 233,
          "name": "Foughala",
          "name_ar": "فوغالة"
        },
        {
          "id": 234,
          "name": "El Ghrous",
          "name_ar": "الغروس"
        },
        {
          "id": 235,
          "name": "Bordj Ben Azzouz",
          "name_ar": "برج بن عزوز"
        },
        {
          "id": 236,
          "name": "Ourlal",
          "name_ar": "أورلال"
        },
        {
          "id": 237,
          "name": "Oumache",
          "name_ar": "أوماش"
        },
        {
          "id": 238,
          "name": "Ain Naga",
          "name_ar": "عين الناقة"
        },
        {
          "id": 239,
          "name": "Chetma",
          "name_ar": "شتمة"
        },
        {
          "id": 240,
          "name": "El Haouch",
          "name_ar": "الحوش"
        },
        {
          "id": 241,
          "name": "Sidi Okba",
          "name_ar": "سيدي عقبة"
        },
        {
          "id": 242,
          "name": "M'chouneche",
          "name_ar": "مشونش"
        },
        {
          "id": 243,
          "name": "Lioua",
          "name_ar": "ليوة"
        },
        {
          "id": 244,
          "name": "Tolga",
          "name_ar": "طولقة"
        }
      ]
    },
    {
      "id": 8,
      "name": "Bechar",
      "name_ar": "بشار",
      "communes_count": 12,
      "communes": [
        {
          "id": 245,
          "name": "Bechar",
          "name_ar": "بشار"
        },
        {
          "id": 246,
          "name": "Boukais",
          "name_ar": "بوكايس"
        },
        {
          "id": 247,
          "name": "Lahmar",
          "name_ar": "لحمر"
        },
        {
          "id": 248,
          "name": "Mogheul",
          "name_ar": "موغل"
        },
        {
          "id": 249,
          "name": "Meridja",
          "name_ar": "المريجة"
        },
        {
          "id": 250,
          "name": "Taghit",
          "name_ar": "تاغيت"
        },
        {
          "id": 251,
          "name": "Abadla",
          "name_ar": "العبادلة"
        },
        {
          "id": 252,
          "name": "Erg-Ferradj",
          "name_ar": "عرق فراج"
        },
        {
          "id": 253,
          "name": "Machraa-Houari-Boumediene",
          "name_ar": "مشرع هواري بومدين"
        },
        {
          "id": 254,
          "name": "Beni-Ounif",
          "name_ar": "بني ونيف"
        },
        {
          "id": 255,
          "name": "Tabelbala",
          "name_ar": "تبلبالة"
        },
        {
          "id": 256,
          "name": "Kenadsa",
          "name_ar": "القنادسة"
        }
      ]
    },
    {
      "id": 9,
      "name": "Blida",
      "name_ar": "البليدة",
      "communes_count": 25,
      "communes": [
        {
          "id": 257,
          "name": "Beni Mered",
          "name_ar": "بني مراد"
        },
        {
          "id": 258,
          "name": "Ouled Slama",
          "name_ar": "اولاد سلامة"
        },
        {
          "id": 259,
          "name": "Mouzaia",
          "name_ar": "موزاية"
        },
        {
          "id": 260,
          "name": "Hammam Elouane",
          "name_ar": "حمام ملوان"
        },
        {
          "id": 261,
          "name": "Bougara",
          "name_ar": "بوقرة"
        },
        {
          "id": 262,
          "name": "Souhane",
          "name_ar": "صوحان"
        },
        {
          "id": 263,
          "name": "Larbaa",
          "name_ar": "الأربعاء"
        },
        {
          "id": 264,
          "name": "Soumaa",
          "name_ar": "الصومعة"
        },
        {
          "id": 265,
          "name": "Guerrouaou",
          "name_ar": "قرواو"
        },
        {
          "id": 266,
          "name": "Boufarik",
          "name_ar": "بوفاريك"
        },
        {
          "id": 267,
          "name": "Meftah",
          "name_ar": "مفتاح"
        },
        {
          "id": 268,
          "name": "Chiffa",
          "name_ar": "الشفة"
        },
        {
          "id": 269,
          "name": "Ain Romana",
          "name_ar": "عين الرمانة"
        },
        {
          "id": 270,
          "name": "Oued  Djer",
          "name_ar": "وادي جر"
        },
        {
          "id": 271,
          "name": "El-Affroun",
          "name_ar": "العفرون"
        },
        {
          "id": 272,
          "name": "Ouled Yaich",
          "name_ar": "أولاد يعيش"
        },
        {
          "id": 273,
          "name": "Chrea",
          "name_ar": "الشريعة"
        },
        {
          "id": 274,
          "name": "Djebabra",
          "name_ar": "جبابرة"
        },
        {
          "id": 275,
          "name": "Oued El Alleug",
          "name_ar": "وادي العلايق"
        },
        {
          "id": 276,
          "name": "Benkhelil",
          "name_ar": "بن خليل"
        },
        {
          "id": 277,
          "name": "Beni-Tamou",
          "name_ar": "بني تامو"
        },
        {
          "id": 278,
          "name": "Chebli",
          "name_ar": "الشبلي"
        },
        {
          "id": 279,
          "name": "Bouinan",
          "name_ar": "بوعينان"
        },
        {
          "id": 280,
          "name": "Bouarfa",
          "name_ar": "بوعرفة"
        },
        {
          "id": 281,
          "name": "Blida",
          "name_ar": "البليدة"
        }
      ]
    },
    {
      "id": 10,
      "name": "Bouira",
      "name_ar": "البويرة",
      "communes_count": 45,
      "communes": [
        {
          "id": 282,
          "name": "Ain Laloui",
          "name_ar": "عين العلوي"
        },
        {
          "id": 283,
          "name": "Hadjera Zerga",
          "name_ar": "الحجرة الزرقاء"
        },
        {
          "id": 284,
          "name": "Mezdour",
          "name_ar": "مزدور"
        },
        {
          "id": 285,
          "name": "Taguedite",
          "name_ar": "تاقديت"
        },
        {
          "id": 286,
          "name": "Ridane",
          "name_ar": "ريدان"
        },
        {
          "id": 287,
          "name": "Maamora",
          "name_ar": "المعمورة"
        },
        {
          "id": 288,
          "name": "El-Hakimia",
          "name_ar": "الحاكمية"
        },
        {
          "id": 289,
          "name": "Ahl El Ksar",
          "name_ar": "أهل القصر"
        },
        {
          "id": 290,
          "name": "Dirah",
          "name_ar": "ديرة"
        },
        {
          "id": 291,
          "name": "Dechmia",
          "name_ar": "الدشمية"
        },
        {
          "id": 292,
          "name": "Bechloul",
          "name_ar": "بشلول"
        },
        {
          "id": 293,
          "name": "Ath Mansour",
          "name_ar": "آث  منصور"
        },
        {
          "id": 294,
          "name": "Saharidj",
          "name_ar": "سحاريج"
        },
        {
          "id": 295,
          "name": "El Adjiba",
          "name_ar": "العجيبة"
        },
        {
          "id": 296,
          "name": "El Asnam",
          "name_ar": "الأسنام"
        },
        {
          "id": 297,
          "name": "M Chedallah",
          "name_ar": "أمشدالة"
        },
        {
          "id": 298,
          "name": "Bordj Okhriss",
          "name_ar": "برج أوخريص"
        },
        {
          "id": 299,
          "name": "Sour El Ghozlane",
          "name_ar": "سور الغزلان"
        },
        {
          "id": 300,
          "name": "Hanif",
          "name_ar": "حنيف"
        },
        {
          "id": 301,
          "name": "Chorfa",
          "name_ar": "شرفة"
        },
        {
          "id": 302,
          "name": "Ouled Rached",
          "name_ar": "أولاد راشد"
        },
        {
          "id": 303,
          "name": "Ain El Hadjar",
          "name_ar": "عين الحجر"
        },
        {
          "id": 304,
          "name": "Aghbalou",
          "name_ar": "أغبالو"
        },
        {
          "id": 305,
          "name": "Raouraoua",
          "name_ar": "روراوة"
        },
        {
          "id": 306,
          "name": "El Khabouzia",
          "name_ar": "الخبوزية"
        },
        {
          "id": 307,
          "name": "Bir Ghbalou",
          "name_ar": "بئر غبالو"
        },
        {
          "id": 308,
          "name": "Bouira",
          "name_ar": "البويرة"
        },
        {
          "id": 309,
          "name": "Ain Turk",
          "name_ar": "عين الترك"
        },
        {
          "id": 310,
          "name": "Ait Laaziz",
          "name_ar": "أيت لعزيز"
        },
        {
          "id": 311,
          "name": "Ain-Bessem",
          "name_ar": "عين بسام"
        },
        {
          "id": 312,
          "name": "El-Mokrani",
          "name_ar": "المقراني"
        },
        {
          "id": 313,
          "name": "Souk El Khemis",
          "name_ar": "سوق الخميس"
        },
        {
          "id": 314,
          "name": "Aomar",
          "name_ar": "أعمر"
        },
        {
          "id": 315,
          "name": "Djebahia",
          "name_ar": "جباحية"
        },
        {
          "id": 316,
          "name": "El Hachimia",
          "name_ar": "الهاشمية"
        },
        {
          "id": 317,
          "name": "Haizer",
          "name_ar": "حيزر"
        },
        {
          "id": 318,
          "name": "Taghzout",
          "name_ar": "تاغزوت"
        },
        {
          "id": 319,
          "name": "Bouderbala",
          "name_ar": "بودربالة"
        },
        {
          "id": 320,
          "name": "Boukram",
          "name_ar": "بوكرم"
        },
        {
          "id": 321,
          "name": "Guerrouma",
          "name_ar": "قرومة"
        },
        {
          "id": 322,
          "name": "Lakhdaria",
          "name_ar": "الأخضرية"
        },
        {
          "id": 323,
          "name": "Maala",
          "name_ar": "معلة"
        },
        {
          "id": 324,
          "name": "Kadiria",
          "name_ar": "قادرية"
        },
        {
          "id": 325,
          "name": "Z'barbar (El Isseri )",
          "name_ar": "زبربر"
        },
        {
          "id": 326,
          "name": "Oued El Berdi",
          "name_ar": "وادي البردي"
        }
      ]
    },
    {
      "id": 11,
      "name": "Tamanrasset",
      "name_ar": "تمنراست",
      "communes_count": 5,
      "communes": [
        {
          "id": 327,
          "name": "Tazrouk",
          "name_ar": "تاظروك"
        },
        {
          "id": 328,
          "name": "Abelsa",
          "name_ar": "ابلسة"
        },
        {
          "id": 329,
          "name": "Tamanrasset",
          "name_ar": "تمنراست"
        },
        {
          "id": 330,
          "name": "Ain Amguel",
          "name_ar": "عين امقل"
        },
        {
          "id": 331,
          "name": "Idles",
          "name_ar": "أدلس"
        }
      ]
    },
    {
      "id": 12,
      "name": "Tebessa",
      "name_ar": "تبسة",
      "communes_count": 24,
      "communes": [
        {
          "id": 332,
          "name": "El-Houidjbet",
          "name_ar": "الحويجبات"
        },
        {
          "id": 333,
          "name": "El-Aouinet",
          "name_ar": "العوينات"
        },
        {
          "id": 336,
          "name": "Bir Mokkadem",
          "name_ar": "بئر مقدم"
        },
        {
          "id": 337,
          "name": "Bir Dheheb",
          "name_ar": "بئر الذهب"
        },
        {
          "id": 338,
          "name": "Saf Saf El Ouesra",
          "name_ar": "صفصاف الوسرى"
        },
        {
          "id": 339,
          "name": "Guorriguer",
          "name_ar": "قريقر"
        },
        {
          "id": 340,
          "name": "Bekkaria",
          "name_ar": "بكارية"
        },
        {
          "id": 341,
          "name": "Boulhaf Dyr",
          "name_ar": "بولحاف الدير"
        },
        {
          "id": 342,
          "name": "Oum Ali",
          "name_ar": "أم علي"
        },
        {
          "id": 343,
          "name": "Boukhadra",
          "name_ar": "بوخضرة"
        },
        {
          "id": 344,
          "name": "El Malabiod",
          "name_ar": "الماء الابيض"
        },
        {
          "id": 345,
          "name": "Ouenza",
          "name_ar": "الونزة"
        },
        {
          "id": 346,
          "name": "El Meridj",
          "name_ar": "المريج"
        },
        {
          "id": 347,
          "name": "Ain Zerga",
          "name_ar": "عين الزرقاء"
        },
        {
          "id": 348,
          "name": "Stah Guentis",
          "name_ar": "سطح قنطيس"
        },
        {
          "id": 349,
          "name": "El Ogla",
          "name_ar": "العقلة"
        },
        {
          "id": 350,
          "name": "El Mezeraa",
          "name_ar": "المزرعة"
        },
        {
          "id": 351,
          "name": "Bedjene",
          "name_ar": "بجن"
        },
        {
          "id": 352,
          "name": "Morsott",
          "name_ar": "مرسط"
        },
        {
          "id": 353,
          "name": "Telidjen",
          "name_ar": "ثليجان"
        },
        {
          "id": 354,
          "name": "Cheria",
          "name_ar": "الشريعة"
        },
        {
          "id": 357,
          "name": "Tebessa",
          "name_ar": "تبسة"
        },
        {
          "id": 358,
          "name": "Hammamet",
          "name_ar": "الحمامات"
        },
        {
          "id": 359,
          "name": "El Kouif",
          "name_ar": "الكويف"
        }
      ]
    },
    {
      "id": 13,
      "name": "Tlemcen",
      "name_ar": "تلمسان",
      "communes_count": 49,
      "communes": [
        {
          "id": 360,
          "name": "Bab El Assa",
          "name_ar": "باب العسة"
        },
        {
          "id": 361,
          "name": "Terny Beni Hediel",
          "name_ar": "تيرني بني هديل"
        },
        {
          "id": 362,
          "name": "Mansourah",
          "name_ar": "منصورة"
        },
        {
          "id": 363,
          "name": "Beni Mester",
          "name_ar": "بني مستر"
        },
        {
          "id": 364,
          "name": "Ain Ghoraba",
          "name_ar": "عين غرابة"
        },
        {
          "id": 365,
          "name": "Chetouane",
          "name_ar": "شتوان"
        },
        {
          "id": 366,
          "name": "Amieur",
          "name_ar": "عمير"
        },
        {
          "id": 367,
          "name": "Ain Fezza",
          "name_ar": "عين فزة"
        },
        {
          "id": 368,
          "name": "Honnaine",
          "name_ar": "هنين"
        },
        {
          "id": 369,
          "name": "Beni Khellad",
          "name_ar": "بني خلاد"
        },
        {
          "id": 372,
          "name": "Nedroma",
          "name_ar": "ندرومة"
        },
        {
          "id": 373,
          "name": "M'sirda Fouaga",
          "name_ar": "مسيردة الفواقة"
        },
        {
          "id": 374,
          "name": "Marsa Ben M'hidi",
          "name_ar": "مرسى بن مهيدي"
        },
        {
          "id": 375,
          "name": "Sidi Medjahed",
          "name_ar": "سيدي مجاهد"
        },
        {
          "id": 376,
          "name": "Beni Boussaid",
          "name_ar": "بني بوسعيد"
        },
        {
          "id": 377,
          "name": "Sebdou",
          "name_ar": "سبدو"
        },
        {
          "id": 380,
          "name": "Bouhlou",
          "name_ar": "بوحلو"
        },
        {
          "id": 381,
          "name": "Maghnia",
          "name_ar": "مغنية"
        },
        {
          "id": 382,
          "name": "Hammam Boughrara",
          "name_ar": "حمام بوغرارة"
        },
        {
          "id": 383,
          "name": "Zenata",
          "name_ar": "زناتة"
        },
        {
          "id": 384,
          "name": "Ouled Riyah",
          "name_ar": "أولاد رياح"
        },
        {
          "id": 385,
          "name": "Hennaya",
          "name_ar": "الحناية"
        },
        {
          "id": 386,
          "name": "Sidi Abdelli",
          "name_ar": "سيدي العبدلي"
        },
        {
          "id": 387,
          "name": "Souk Tleta",
          "name_ar": "سوق الثلاثاء"
        },
        {
          "id": 388,
          "name": "Bensekrane",
          "name_ar": "بن سكران"
        },
        {
          "id": 389,
          "name": "Fellaoucene",
          "name_ar": "فلاوسن"
        },
        {
          "id": 390,
          "name": "Ain Kebira",
          "name_ar": "عين الكبيرة"
        },
        {
          "id": 391,
          "name": "Ain Fetah",
          "name_ar": "عين فتاح"
        },
        {
          "id": 392,
          "name": "Tlemcen",
          "name_ar": "تلمسان"
        },
        {
          "id": 393,
          "name": "Ain Nehala",
          "name_ar": "عين النحالة"
        },
        {
          "id": 394,
          "name": "Ain Tellout",
          "name_ar": "عين تالوت"
        },
        {
          "id": 395,
          "name": "Ain Youcef",
          "name_ar": "عين يوسف"
        },
        {
          "id": 396,
          "name": "Beni Ouarsous",
          "name_ar": "بني وارسوس"
        },
        {
          "id": 397,
          "name": "El Fehoul",
          "name_ar": "الفحول"
        },
        {
          "id": 398,
          "name": "Remchi",
          "name_ar": "الرمشي"
        },
        {
          "id": 399,
          "name": "Sebbaa Chioukh",
          "name_ar": "سبعة شيوخ"
        },
        {
          "id": 400,
          "name": "Souani",
          "name_ar": "السواني"
        },
        {
          "id": 401,
          "name": "Sabra",
          "name_ar": "صبرة"
        },
        {
          "id": 402,
          "name": "Dar Yaghmoracen",
          "name_ar": "دار يغمراسن"
        },
        {
          "id": 403,
          "name": "Ghazaouet",
          "name_ar": "الغزوات"
        },
        {
          "id": 404,
          "name": "Souahlia",
          "name_ar": "السواحلية"
        },
        {
          "id": 405,
          "name": "Tianet",
          "name_ar": "تيانت"
        },
        {
          "id": 406,
          "name": "Beni Smiel",
          "name_ar": "بني صميل"
        },
        {
          "id": 407,
          "name": "Oued Lakhdar",
          "name_ar": "وادي الخضر"
        },
        {
          "id": 408,
          "name": "Ouled Mimoun",
          "name_ar": "أولاد ميمون"
        },
        {
          "id": 409,
          "name": "Beni Bahdel",
          "name_ar": "بني بهدل"
        },
        {
          "id": 410,
          "name": "Beni Snous",
          "name_ar": "بني سنوس"
        },
        {
          "id": 411,
          "name": "Azail",
          "name_ar": "العزايل"
        },
        {
          "id": 412,
          "name": "Djebala",
          "name_ar": "جبالة"
        }
      ]
    },
    {
      "id": 14,
      "name": "Tiaret",
      "name_ar": "تيارت",
      "communes_count": 36,
      "communes": [
        {
          "id": 413,
          "name": "Mahdia",
          "name_ar": "مهدية"
        },
        {
          "id": 414,
          "name": "Ain Dzarit",
          "name_ar": "عين دزاريت"
        },
        {
          "id": 415,
          "name": "Sebaine",
          "name_ar": "السبعين"
        },
        {
          "id": 416,
          "name": "Faidja",
          "name_ar": "الفايجة"
        },
        {
          "id": 417,
          "name": "Si Abdelghani",
          "name_ar": "سي عبد الغني"
        },
        {
          "id": 418,
          "name": "Sougueur",
          "name_ar": "السوقر"
        },
        {
          "id": 419,
          "name": "Tousnina",
          "name_ar": "توسنينة"
        },
        {
          "id": 420,
          "name": "Meghila",
          "name_ar": "مغيلة"
        },
        {
          "id": 421,
          "name": "Sebt",
          "name_ar": "السبت"
        },
        {
          "id": 422,
          "name": "Sidi Hosni",
          "name_ar": "سيدي حسني"
        },
        {
          "id": 423,
          "name": "Ain El Hadid",
          "name_ar": "عين الحديد"
        },
        {
          "id": 424,
          "name": "Frenda",
          "name_ar": "فرندة"
        },
        {
          "id": 425,
          "name": "Takhemaret",
          "name_ar": "تخمرت"
        },
        {
          "id": 426,
          "name": "Ain Kermes",
          "name_ar": "عين كرمس"
        },
        {
          "id": 427,
          "name": "Djebilet Rosfa",
          "name_ar": "جبيلات الرصفاء"
        },
        {
          "id": 428,
          "name": "Madna",
          "name_ar": "مادنة"
        },
        {
          "id": 429,
          "name": "Medrissa",
          "name_ar": "مدريسة"
        },
        {
          "id": 430,
          "name": "Sidi Abderrahmane",
          "name_ar": "سيدي عبد الرحمن"
        },
        {
          "id": 432,
          "name": "Guertoufa",
          "name_ar": "قرطوفة"
        },
        {
          "id": 435,
          "name": "Oued Lilli",
          "name_ar": "وادي ليلي"
        },
        {
          "id": 436,
          "name": "Sidi Ali Mellal",
          "name_ar": "سيدي علي ملال"
        },
        {
          "id": 437,
          "name": "Djillali Ben Amar",
          "name_ar": "جيلالي بن عمار"
        },
        {
          "id": 438,
          "name": "Mechraa Safa",
          "name_ar": "مشرع الصفا"
        },
        {
          "id": 439,
          "name": "Tagdempt",
          "name_ar": "تاقدمت"
        },
        {
          "id": 443,
          "name": "Tidda",
          "name_ar": "تيدة"
        },
        {
          "id": 444,
          "name": "Nadorah",
          "name_ar": "الناظورة"
        },
        {
          "id": 445,
          "name": "Tiaret",
          "name_ar": "تيارت"
        },
        {
          "id": 446,
          "name": "Medroussa",
          "name_ar": "مدروسة"
        },
        {
          "id": 447,
          "name": "Mellakou",
          "name_ar": "ملاكو"
        },
        {
          "id": 448,
          "name": "Sidi Bakhti",
          "name_ar": "سيدي بختي"
        },
        {
          "id": 449,
          "name": "Ain Deheb",
          "name_ar": "عين الذهب"
        },
        {
          "id": 450,
          "name": "Chehaima",
          "name_ar": "شحيمة"
        },
        {
          "id": 451,
          "name": "Naima",
          "name_ar": "النعيمة"
        },
        {
          "id": 452,
          "name": "Ain Bouchekif",
          "name_ar": "عين بوشقيف"
        },
        {
          "id": 453,
          "name": "Dahmouni",
          "name_ar": "دحموني"
        },
        {
          "id": 454,
          "name": "Rahouia",
          "name_ar": "الرحوية"
        }
      ]
    },
    {
      "id": 15,
      "name": "Tizi Ouzou",
      "name_ar": "تيزي وزو",
      "communes_count": 67,
      "communes": [
        {
          "id": 455,
          "name": "Mizrana",
          "name_ar": "ميزرانـــة"
        },
        {
          "id": 456,
          "name": "Idjeur",
          "name_ar": "إيجــار"
        },
        {
          "id": 457,
          "name": "Beni-Douala",
          "name_ar": "بني دوالة"
        },
        {
          "id": 458,
          "name": "Beni-Zikki",
          "name_ar": "بني زيكــي"
        },
        {
          "id": 459,
          "name": "Illoula Oumalou",
          "name_ar": "إيلولة أومـــالو"
        },
        {
          "id": 460,
          "name": "Agouni-Gueghrane",
          "name_ar": "أقني قغران"
        },
        {
          "id": 461,
          "name": "Ait Bouaddou",
          "name_ar": "أيت بــوادو"
        },
        {
          "id": 462,
          "name": "Ouadhias",
          "name_ar": "واضية"
        },
        {
          "id": 463,
          "name": "Tizi N'tleta",
          "name_ar": "تيزي نثلاثة"
        },
        {
          "id": 464,
          "name": "Aghribs",
          "name_ar": "أغريب"
        },
        {
          "id": 465,
          "name": "Ait-Chafaa",
          "name_ar": "أيت شافع"
        },
        {
          "id": 466,
          "name": "Akerrou",
          "name_ar": "أقرو"
        },
        {
          "id": 467,
          "name": "Azeffoun",
          "name_ar": "أزفون"
        },
        {
          "id": 468,
          "name": "Iflissen",
          "name_ar": "إفليـــسن"
        },
        {
          "id": 469,
          "name": "Tigzirt",
          "name_ar": "تيقـزيرت"
        },
        {
          "id": 470,
          "name": "Assi-Youcef",
          "name_ar": "أسي يوسف"
        },
        {
          "id": 471,
          "name": "Boghni",
          "name_ar": "بوغني"
        },
        {
          "id": 472,
          "name": "Bounouh",
          "name_ar": "بونوح"
        },
        {
          "id": 473,
          "name": "Mechtras",
          "name_ar": "مشطراس"
        },
        {
          "id": 474,
          "name": "Draa-Ben-Khedda",
          "name_ar": "ذراع بن خدة"
        },
        {
          "id": 475,
          "name": "Sidi Namane",
          "name_ar": "سيدي نعمان"
        },
        {
          "id": 476,
          "name": "Tadmait",
          "name_ar": "تادمايت"
        },
        {
          "id": 477,
          "name": "Tirmitine",
          "name_ar": "تيرمتين"
        },
        {
          "id": 478,
          "name": "Ait Boumahdi",
          "name_ar": "أيت بومهدي"
        },
        {
          "id": 479,
          "name": "Ait-Toudert",
          "name_ar": "أيت تودرت"
        },
        {
          "id": 480,
          "name": "Beni-Aissi",
          "name_ar": "بني عيسي"
        },
        {
          "id": 481,
          "name": "Ouacif",
          "name_ar": "واسيف"
        },
        {
          "id": 482,
          "name": "Ait Khellili",
          "name_ar": "أيت خليلي"
        },
        {
          "id": 483,
          "name": "Mekla",
          "name_ar": "مقــلع"
        },
        {
          "id": 484,
          "name": "Souama",
          "name_ar": "صوامـــع"
        },
        {
          "id": 485,
          "name": "Beni-Yenni",
          "name_ar": "بني يني"
        },
        {
          "id": 486,
          "name": "Iboudrarene",
          "name_ar": "إبودرارن"
        },
        {
          "id": 487,
          "name": "Tizi-Ouzou",
          "name_ar": "تيزي وزو"
        },
        {
          "id": 488,
          "name": "Abi-Youcef",
          "name_ar": "أبي يوسف"
        },
        {
          "id": 489,
          "name": "Ain-El-Hammam",
          "name_ar": "عين الحمام"
        },
        {
          "id": 490,
          "name": "Ait-Yahia",
          "name_ar": "أيت يحيى"
        },
        {
          "id": 491,
          "name": "Akbil",
          "name_ar": "اقبيل"
        },
        {
          "id": 492,
          "name": "Boudjima",
          "name_ar": "بوجيمة"
        },
        {
          "id": 493,
          "name": "Makouda",
          "name_ar": "ماكودة"
        },
        {
          "id": 494,
          "name": "Ain-Zaouia",
          "name_ar": "عين الزاوية"
        },
        {
          "id": 495,
          "name": "Ait Yahia Moussa",
          "name_ar": "أيت يحي موسى"
        },
        {
          "id": 496,
          "name": "Draa-El-Mizan",
          "name_ar": "ذراع الميزان"
        },
        {
          "id": 497,
          "name": "Frikat",
          "name_ar": "فريقات"
        },
        {
          "id": 498,
          "name": "M'kira",
          "name_ar": "مكيرة"
        },
        {
          "id": 499,
          "name": "Tizi-Gheniff",
          "name_ar": "تيزي غنيف"
        },
        {
          "id": 500,
          "name": "Yatafene",
          "name_ar": "يطــافن"
        },
        {
          "id": 501,
          "name": "Illilten",
          "name_ar": "إيلـيــلتـن"
        },
        {
          "id": 502,
          "name": "Imsouhal",
          "name_ar": "إمســوحال"
        },
        {
          "id": 503,
          "name": "Azazga",
          "name_ar": "عزازقة"
        },
        {
          "id": 504,
          "name": "Freha",
          "name_ar": "فريحة"
        },
        {
          "id": 505,
          "name": "Ifigha",
          "name_ar": "إيفيغاء"
        },
        {
          "id": 506,
          "name": "Yakourene",
          "name_ar": "إعــكورن"
        },
        {
          "id": 507,
          "name": "Zekri",
          "name_ar": "زكري"
        },
        {
          "id": 508,
          "name": "Ait Aggouacha",
          "name_ar": "أيت عقـواشة"
        },
        {
          "id": 509,
          "name": "Irdjen",
          "name_ar": "إيرجـــن"
        },
        {
          "id": 510,
          "name": "Larbaa Nath Irathen",
          "name_ar": "الأربعــاء ناث إيراثن"
        },
        {
          "id": 511,
          "name": "Ait-Oumalou",
          "name_ar": "أيت  أومالو"
        },
        {
          "id": 512,
          "name": "Tizi-Rached",
          "name_ar": "تيزي راشد"
        },
        {
          "id": 513,
          "name": "Ait-Aissa-Mimoun",
          "name_ar": "أيت عيسى ميمون"
        },
        {
          "id": 514,
          "name": "Ouaguenoun",
          "name_ar": "واقنون"
        },
        {
          "id": 515,
          "name": "Timizart",
          "name_ar": "تيمـيزار"
        },
        {
          "id": 516,
          "name": "Maatkas",
          "name_ar": "معـــاتقة"
        },
        {
          "id": 517,
          "name": "Souk-El-Tenine",
          "name_ar": "سوق الإثنين"
        },
        {
          "id": 518,
          "name": "Ait-Mahmoud",
          "name_ar": "أيت محمود"
        },
        {
          "id": 519,
          "name": "Beni Zmenzer",
          "name_ar": "بنــــي زمنزار"
        },
        {
          "id": 520,
          "name": "Iferhounene",
          "name_ar": "إفــرحــونان"
        },
        {
          "id": 521,
          "name": "Bouzeguene",
          "name_ar": "بوزقــن"
        }
      ]
    },
    {
      "id": 16,
      "name": "Alger",
      "name_ar": "الجزائر",
      "communes_count": 57,
      "communes": [
        {
          "id": 522,
          "name": "Hussein Dey",
          "name_ar": "حسين داي"
        },
        {
          "id": 523,
          "name": "Les Eucalyptus",
          "name_ar": "الكاليتوس"
        },
        {
          "id": 524,
          "name": "Sidi Moussa",
          "name_ar": "سيدي موسى"
        },
        {
          "id": 525,
          "name": "Kouba",
          "name_ar": "القبة"
        },
        {
          "id": 526,
          "name": "Mohamed Belouzdad",
          "name_ar": "محمد بلوزداد"
        },
        {
          "id": 527,
          "name": "Ain Taya",
          "name_ar": "عين طاية"
        },
        {
          "id": 528,
          "name": "Bab Ezzouar",
          "name_ar": "باب الزوار"
        },
        {
          "id": 529,
          "name": "Bordj El Kiffan",
          "name_ar": "برج الكيفان"
        },
        {
          "id": 530,
          "name": "Dar El Beida",
          "name_ar": "الدار البيضاء"
        },
        {
          "id": 531,
          "name": "El Marsa",
          "name_ar": "المرسى"
        },
        {
          "id": 532,
          "name": "Mohammadia",
          "name_ar": "المحمدية"
        },
        {
          "id": 533,
          "name": "Bir Touta",
          "name_ar": "بئر توتة"
        },
        {
          "id": 534,
          "name": "Ouled Chebel",
          "name_ar": "اولاد شبل"
        },
        {
          "id": 535,
          "name": "Tessala El Merdja",
          "name_ar": "تسالة المرجة"
        },
        {
          "id": 536,
          "name": "Herraoua",
          "name_ar": "هراوة"
        },
        {
          "id": 537,
          "name": "Reghaia",
          "name_ar": "رغاية"
        },
        {
          "id": 538,
          "name": "Rouiba",
          "name_ar": "الرويبة"
        },
        {
          "id": 539,
          "name": "Maalma",
          "name_ar": "المعالمة"
        },
        {
          "id": 540,
          "name": "Rahmania",
          "name_ar": "الرحمانية"
        },
        {
          "id": 541,
          "name": "Souidania",
          "name_ar": "سويدانية"
        },
        {
          "id": 542,
          "name": "Staoueli",
          "name_ar": "سطاوالي"
        },
        {
          "id": 543,
          "name": "Zeralda",
          "name_ar": "زرالدة"
        },
        {
          "id": 544,
          "name": "Baba Hassen",
          "name_ar": "بابا حسن"
        },
        {
          "id": 545,
          "name": "Douira",
          "name_ar": "الدويرة"
        },
        {
          "id": 546,
          "name": "Draria",
          "name_ar": "الدرارية"
        },
        {
          "id": 547,
          "name": "El Achour",
          "name_ar": "العاشور"
        },
        {
          "id": 548,
          "name": "Khraissia",
          "name_ar": "الخرايسية"
        },
        {
          "id": 549,
          "name": "Ain Benian",
          "name_ar": "عين بنيان"
        },
        {
          "id": 550,
          "name": "Cheraga",
          "name_ar": "الشراقة"
        },
        {
          "id": 551,
          "name": "Dely Ibrahim",
          "name_ar": "دالي ابراهيم"
        },
        {
          "id": 552,
          "name": "Hammamet",
          "name_ar": "الحمامات"
        },
        {
          "id": 553,
          "name": "Ouled Fayet",
          "name_ar": "اولاد فايت"
        },
        {
          "id": 554,
          "name": "Alger Centre",
          "name_ar": "الجزائر الوسطى"
        },
        {
          "id": 555,
          "name": "El Madania",
          "name_ar": "المدنية"
        },
        {
          "id": 556,
          "name": "El Mouradia",
          "name_ar": "المرادية"
        },
        {
          "id": 557,
          "name": "Sidi M'hamed",
          "name_ar": "سيدي امحمد"
        },
        {
          "id": 558,
          "name": "Sehaoula",
          "name_ar": "السحاولة"
        },
        {
          "id": 559,
          "name": "Bologhine Ibnou Ziri",
          "name_ar": "بولوغين بن زيري"
        },
        {
          "id": 560,
          "name": "Casbah",
          "name_ar": "القصبة"
        },
        {
          "id": 561,
          "name": "Oued Koriche",
          "name_ar": "وادي قريش"
        },
        {
          "id": 562,
          "name": "Rais Hamidou",
          "name_ar": "الرايس حميدو"
        },
        {
          "id": 563,
          "name": "Bir Mourad Rais",
          "name_ar": "بئر مراد رايس"
        },
        {
          "id": 564,
          "name": "Birkhadem",
          "name_ar": "بئر خادم"
        },
        {
          "id": 565,
          "name": "Djasr Kasentina",
          "name_ar": "جسر قسنطينة"
        },
        {
          "id": 566,
          "name": "Hydra",
          "name_ar": "حيدرة"
        },
        {
          "id": 567,
          "name": "El Magharia",
          "name_ar": "المغارية"
        },
        {
          "id": 568,
          "name": "Ben Aknoun",
          "name_ar": "ابن عكنون"
        },
        {
          "id": 569,
          "name": "Beni Messous",
          "name_ar": "بني مسوس"
        },
        {
          "id": 570,
          "name": "Bouzareah",
          "name_ar": "بوزريعة"
        },
        {
          "id": 571,
          "name": "El Biar",
          "name_ar": "الابيار"
        },
        {
          "id": 572,
          "name": "Bachedjerah",
          "name_ar": "باش جراح"
        },
        {
          "id": 573,
          "name": "Bourouba",
          "name_ar": "بوروبة"
        },
        {
          "id": 574,
          "name": "El Harrach",
          "name_ar": "الحراش"
        },
        {
          "id": 575,
          "name": "Oued Smar",
          "name_ar": "وادي السمار"
        },
        {
          "id": 576,
          "name": "Baraki",
          "name_ar": "براقي"
        },
        {
          "id": 577,
          "name": "Bordj El Bahri",
          "name_ar": "برج البحري"
        },
        {
          "id": 578,
          "name": "Bab El Oued",
          "name_ar": "باب الوادي"
        }
      ]
    },
    {
      "id": 17,
      "name": "Djelfa",
      "name_ar": "الجلفة",
      "communes_count": 18,
      "communes": [
        {
          "id": 579,
          "name": "Hassi El Euch",
          "name_ar": "حاسي العش"
        },
        {
          "id": 580,
          "name": "Ain El Ibel",
          "name_ar": "عين الإبل"
        },
        {
          "id": 581,
          "name": "El Guedid",
          "name_ar": "القديد"
        },
        {
          "id": 582,
          "name": "Charef",
          "name_ar": "الشارف"
        },
        {
          "id": 583,
          "name": "Benyagoub",
          "name_ar": "بن يعقوب"
        },
        {
          "id": 584,
          "name": "Sidi Baizid",
          "name_ar": "سيدي بايزيد"
        },
        {
          "id": 585,
          "name": "M'liliha",
          "name_ar": "مليليحة"
        },
        {
          "id": 586,
          "name": "Dar Chioukh",
          "name_ar": "دار الشيوخ"
        },
        {
          "id": 587,
          "name": "Taadmit",
          "name_ar": "تعظميت"
        },
        {
          "id": 599,
          "name": "Zaccar",
          "name_ar": "زكار"
        },
        {
          "id": 600,
          "name": "Douis",
          "name_ar": "دويس"
        },
        {
          "id": 601,
          "name": "El Idrissia",
          "name_ar": "الادريسية"
        },
        {
          "id": 602,
          "name": "Ain Chouhada",
          "name_ar": "عين الشهداء"
        },
        {
          "id": 603,
          "name": "Djelfa",
          "name_ar": "الجلفة"
        },
        {
          "id": 608,
          "name": "Zaafrane",
          "name_ar": "زعفران"
        },
        {
          "id": 612,
          "name": "Ain Maabed",
          "name_ar": "عين معبد"
        },
        {
          "id": 613,
          "name": "Hassi Bahbah",
          "name_ar": "حاسي بحبح"
        },
        {
          "id": 614,
          "name": "Moudjebara",
          "name_ar": "مجبارة"
        }
      ]
    },
    {
      "id": 18,
      "name": "Jijel",
      "name_ar": "جيجل",
      "communes_count": 28,
      "communes": [
        {
          "id": 615,
          "name": "Jijel",
          "name_ar": "جيجل"
        },
        {
          "id": 616,
          "name": "El Aouana",
          "name_ar": "العوانة"
        },
        {
          "id": 617,
          "name": "Selma Benziada",
          "name_ar": "سلمى بن زيادة"
        },
        {
          "id": 618,
          "name": "Erraguene Souissi",
          "name_ar": "أراقن سويسي"
        },
        {
          "id": 619,
          "name": "Boussif Ouled Askeur",
          "name_ar": "بوسيف أولاد عسكر"
        },
        {
          "id": 620,
          "name": "Ziama Mansouriah",
          "name_ar": "زيامة منصورية"
        },
        {
          "id": 621,
          "name": "Chahna",
          "name_ar": "الشحنة"
        },
        {
          "id": 622,
          "name": "Emir Abdelkader",
          "name_ar": "الامير عبد القادر"
        },
        {
          "id": 623,
          "name": "Oudjana",
          "name_ar": "وجانة"
        },
        {
          "id": 624,
          "name": "Taher",
          "name_ar": "الطاهير"
        },
        {
          "id": 625,
          "name": "Chekfa",
          "name_ar": "الشقفة"
        },
        {
          "id": 626,
          "name": "El Kennar Nouchfi",
          "name_ar": "القنار نشفي"
        },
        {
          "id": 627,
          "name": "Sidi Abdelaziz",
          "name_ar": "سيدي عبد العزيز"
        },
        {
          "id": 628,
          "name": "El Milia",
          "name_ar": "الميلية"
        },
        {
          "id": 629,
          "name": "Ouled Yahia Khadrouch",
          "name_ar": "أولاد يحيى خدروش"
        },
        {
          "id": 630,
          "name": "Ouled Rabah",
          "name_ar": "أولاد رابح"
        },
        {
          "id": 631,
          "name": "Sidi Marouf",
          "name_ar": "سيدي معروف"
        },
        {
          "id": 632,
          "name": "Ghebala",
          "name_ar": "غبالة"
        },
        {
          "id": 633,
          "name": "Settara",
          "name_ar": "السطارة"
        },
        {
          "id": 634,
          "name": "Bouraoui Belhadef",
          "name_ar": "بوراوي بلهادف"
        },
        {
          "id": 635,
          "name": "El Ancer",
          "name_ar": "العنصر"
        },
        {
          "id": 636,
          "name": "Khiri Oued Adjoul",
          "name_ar": "خيري واد عجول"
        },
        {
          "id": 637,
          "name": "Djimla",
          "name_ar": "جيملة"
        },
        {
          "id": 638,
          "name": "Kaous",
          "name_ar": "قاوس"
        },
        {
          "id": 639,
          "name": "Texenna",
          "name_ar": "تاكسنة"
        },
        {
          "id": 640,
          "name": "Bordj T'har",
          "name_ar": "برج الطهر"
        },
        {
          "id": 641,
          "name": "Boudria Beniyadjis",
          "name_ar": "بودريعة بني  ياجيس"
        },
        {
          "id": 642,
          "name": "Djemaa Beni Habibi",
          "name_ar": "الجمعة بني حبيبي"
        }
      ]
    },
    {
      "id": 19,
      "name": "Setif",
      "name_ar": "سطيف",
      "communes_count": 60,
      "communes": [
        {
          "id": 643,
          "name": "Rosfa",
          "name_ar": "الرصفة"
        },
        {
          "id": 644,
          "name": "Oued El Bared",
          "name_ar": "واد البارد"
        },
        {
          "id": 645,
          "name": "Tizi N'bechar",
          "name_ar": "تيزي نبشار"
        },
        {
          "id": 646,
          "name": "Mezloug",
          "name_ar": "مزلوق"
        },
        {
          "id": 647,
          "name": "Guellal",
          "name_ar": "قلال"
        },
        {
          "id": 648,
          "name": "Kasr El Abtal",
          "name_ar": "قصر الابطال"
        },
        {
          "id": 649,
          "name": "Ouled Si Ahmed",
          "name_ar": "أولاد سي أحمد"
        },
        {
          "id": 650,
          "name": "Ait Naoual Mezada",
          "name_ar": "أيت نوال مزادة"
        },
        {
          "id": 651,
          "name": "Ait-Tizi",
          "name_ar": "ايت تيزي"
        },
        {
          "id": 652,
          "name": "Bouandas",
          "name_ar": "بوعنداس"
        },
        {
          "id": 653,
          "name": "Bousselam",
          "name_ar": "بوسلام"
        },
        {
          "id": 654,
          "name": "Hamam Soukhna",
          "name_ar": "حمام السخنة"
        },
        {
          "id": 655,
          "name": "Taya",
          "name_ar": "الطاية"
        },
        {
          "id": 656,
          "name": "Tella",
          "name_ar": "التلة"
        },
        {
          "id": 657,
          "name": "Ain Oulmene",
          "name_ar": "عين ولمان"
        },
        {
          "id": 658,
          "name": "Boutaleb",
          "name_ar": "بوطالب"
        },
        {
          "id": 659,
          "name": "Hamma",
          "name_ar": "الحامة"
        },
        {
          "id": 660,
          "name": "Ouled Tebben",
          "name_ar": "أولاد تبان"
        },
        {
          "id": 661,
          "name": "Amoucha",
          "name_ar": "عموشة"
        },
        {
          "id": 662,
          "name": "Salah Bey",
          "name_ar": "صالح باي"
        },
        {
          "id": 663,
          "name": "Ain Azel",
          "name_ar": "عين أزال"
        },
        {
          "id": 664,
          "name": "Ain Lahdjar",
          "name_ar": "عين الحجر"
        },
        {
          "id": 665,
          "name": "Beidha Bordj",
          "name_ar": "بيضاء برج"
        },
        {
          "id": 666,
          "name": "Bir Haddada",
          "name_ar": "بئر حدادة"
        },
        {
          "id": 667,
          "name": "Guenzet",
          "name_ar": "قنزات"
        },
        {
          "id": 668,
          "name": "Harbil",
          "name_ar": "حربيل"
        },
        {
          "id": 669,
          "name": "Ain-Roua",
          "name_ar": "عين الروى"
        },
        {
          "id": 670,
          "name": "Beni Oussine",
          "name_ar": "بني وسين"
        },
        {
          "id": 671,
          "name": "El Ouricia",
          "name_ar": "أوريسيا"
        },
        {
          "id": 672,
          "name": "Bougaa",
          "name_ar": "بوقاعة"
        },
        {
          "id": 673,
          "name": "Draa-Kebila",
          "name_ar": "ذراع قبيلة"
        },
        {
          "id": 674,
          "name": "Hammam Guergour",
          "name_ar": "حمام قرقور"
        },
        {
          "id": 675,
          "name": "Setif",
          "name_ar": "سطيف"
        },
        {
          "id": 676,
          "name": "Ain El Kebira",
          "name_ar": "عين الكبيرة"
        },
        {
          "id": 677,
          "name": "Dehamcha",
          "name_ar": "الدهامشة"
        },
        {
          "id": 678,
          "name": "Ouled Addouane",
          "name_ar": "أولاد عدوان"
        },
        {
          "id": 679,
          "name": "Ain-Sebt",
          "name_ar": "عين السبت"
        },
        {
          "id": 680,
          "name": "Beni-Aziz",
          "name_ar": "بني عزيز"
        },
        {
          "id": 681,
          "name": "Maaouia",
          "name_ar": "معاوية"
        },
        {
          "id": 682,
          "name": "Bellaa",
          "name_ar": "بلاعة"
        },
        {
          "id": 683,
          "name": "Bir-El-Arch",
          "name_ar": "بئر العرش"
        },
        {
          "id": 684,
          "name": "El-Ouldja",
          "name_ar": "الولجة"
        },
        {
          "id": 685,
          "name": "Tachouda",
          "name_ar": "تاشودة"
        },
        {
          "id": 686,
          "name": "Tala-Ifacene",
          "name_ar": "تالة إيفاسن"
        },
        {
          "id": 687,
          "name": "Serdj-El-Ghoul",
          "name_ar": "سرج الغول"
        },
        {
          "id": 688,
          "name": "Guidjel",
          "name_ar": "قجال"
        },
        {
          "id": 689,
          "name": "Ouled Sabor",
          "name_ar": "أولاد صابر"
        },
        {
          "id": 690,
          "name": "Bazer-Sakra",
          "name_ar": "بازر سكرة"
        },
        {
          "id": 691,
          "name": "El Eulma",
          "name_ar": "العلمة"
        },
        {
          "id": 692,
          "name": "Guelta Zerka",
          "name_ar": "قلتة زرقاء"
        },
        {
          "id": 693,
          "name": "Beni Fouda",
          "name_ar": "بني فودة"
        },
        {
          "id": 694,
          "name": "Djemila",
          "name_ar": "جميلة"
        },
        {
          "id": 695,
          "name": "Ain-Legradj",
          "name_ar": "عين لقراج"
        },
        {
          "id": 696,
          "name": "Beni Chebana",
          "name_ar": "بني شبانة"
        },
        {
          "id": 697,
          "name": "Beni Ourtilane",
          "name_ar": "بني ورتيلان"
        },
        {
          "id": 698,
          "name": "Beni-Mouhli",
          "name_ar": "بني موحلي"
        },
        {
          "id": 699,
          "name": "Ain Abessa",
          "name_ar": "عين عباسة"
        },
        {
          "id": 700,
          "name": "Ain Arnat",
          "name_ar": "عين أرنات"
        },
        {
          "id": 701,
          "name": "Babor",
          "name_ar": "بابور"
        },
        {
          "id": 702,
          "name": "Maouaklane",
          "name_ar": "ماوكلان"
        }
      ]
    },
    {
      "id": 20,
      "name": "Saida",
      "name_ar": "سعيدة",
      "communes_count": 16,
      "communes": [
        {
          "id": 703,
          "name": "Saida",
          "name_ar": "سعيدة"
        },
        {
          "id": 704,
          "name": "Tircine",
          "name_ar": "تيرسين"
        },
        {
          "id": 705,
          "name": "Ouled Brahim",
          "name_ar": "أولاد إبراهيم"
        },
        {
          "id": 706,
          "name": "Ain Soltane",
          "name_ar": "عين السلطان"
        },
        {
          "id": 707,
          "name": "Maamora",
          "name_ar": "المعمورة"
        },
        {
          "id": 708,
          "name": "El Hassasna",
          "name_ar": "الحساسنة"
        },
        {
          "id": 709,
          "name": "Ain Sekhouna",
          "name_ar": "عين السخونة"
        },
        {
          "id": 710,
          "name": "Sidi Boubekeur",
          "name_ar": "سيدي بوبكر"
        },
        {
          "id": 711,
          "name": "Ouled Khaled",
          "name_ar": "أولاد خالد"
        },
        {
          "id": 712,
          "name": "Hounet",
          "name_ar": "هونت"
        },
        {
          "id": 713,
          "name": "Youb",
          "name_ar": "يوب"
        },
        {
          "id": 714,
          "name": "Doui Thabet",
          "name_ar": "دوي ثابت"
        },
        {
          "id": 715,
          "name": "Sidi Ahmed",
          "name_ar": "سيدي احمد"
        },
        {
          "id": 716,
          "name": "Moulay Larbi",
          "name_ar": "مولاي العربي"
        },
        {
          "id": 717,
          "name": "Ain El Hadjar",
          "name_ar": "عين الحجر"
        },
        {
          "id": 718,
          "name": "Sidi Amar",
          "name_ar": "سيدي عمر"
        }
      ]
    },
    {
      "id": 21,
      "name": "Skikda",
      "name_ar": "سكيكدة",
      "communes_count": 38,
      "communes": [
        {
          "id": 719,
          "name": "Ain Bouziane",
          "name_ar": "عين بوزيان"
        },
        {
          "id": 720,
          "name": "Salah Bouchaour",
          "name_ar": "صالح بو الشعور"
        },
        {
          "id": 721,
          "name": "El Hadaiek",
          "name_ar": "الحدائق"
        },
        {
          "id": 722,
          "name": "Zerdezas",
          "name_ar": "زردازة"
        },
        {
          "id": 723,
          "name": "Ouled Habbaba",
          "name_ar": "أولاد حبابة"
        },
        {
          "id": 724,
          "name": "Beni Oulbane",
          "name_ar": "بني ولبان"
        },
        {
          "id": 725,
          "name": "Sidi Mezghiche",
          "name_ar": "سيدي مزغيش"
        },
        {
          "id": 726,
          "name": "Beni Bechir",
          "name_ar": "بني بشير"
        },
        {
          "id": 727,
          "name": "Ramdane Djamel",
          "name_ar": "رمضان جمال"
        },
        {
          "id": 728,
          "name": "Bin El Ouiden",
          "name_ar": "بين الويدان"
        },
        {
          "id": 729,
          "name": "Emjez Edchich",
          "name_ar": "مجاز الدشيش"
        },
        {
          "id": 730,
          "name": "Tamalous",
          "name_ar": "تمالوس"
        },
        {
          "id": 731,
          "name": "Ain Kechra",
          "name_ar": "عين قشرة"
        },
        {
          "id": 732,
          "name": "Ouldja Boulbalout",
          "name_ar": "الولجة بولبلوط"
        },
        {
          "id": 733,
          "name": "Oum Toub",
          "name_ar": "أم الطوب"
        },
        {
          "id": 734,
          "name": "El Ghedir",
          "name_ar": "الغدير"
        },
        {
          "id": 735,
          "name": "Kerkara",
          "name_ar": "الكركرة"
        },
        {
          "id": 736,
          "name": "El Arrouch",
          "name_ar": "الحروش"
        },
        {
          "id": 737,
          "name": "Zitouna",
          "name_ar": "الزيتونة"
        },
        {
          "id": 738,
          "name": "Ouled Attia",
          "name_ar": "أولاد عطية"
        },
        {
          "id": 739,
          "name": "Oued Zhour",
          "name_ar": "وادي الزهور"
        },
        {
          "id": 740,
          "name": "Collo",
          "name_ar": "القل"
        },
        {
          "id": 741,
          "name": "Cheraia",
          "name_ar": "الشرايع"
        },
        {
          "id": 742,
          "name": "Beni Zid",
          "name_ar": "بني زيد"
        },
        {
          "id": 743,
          "name": "Khenag Maoune",
          "name_ar": "خناق مايو"
        },
        {
          "id": 744,
          "name": "El Marsa",
          "name_ar": "المرسى"
        },
        {
          "id": 745,
          "name": "Ben Azzouz",
          "name_ar": "بن عزوز"
        },
        {
          "id": 746,
          "name": "Bekkouche Lakhdar",
          "name_ar": "بكوش لخضر"
        },
        {
          "id": 747,
          "name": "Es Sebt",
          "name_ar": "السبت"
        },
        {
          "id": 748,
          "name": "Ain Charchar",
          "name_ar": "عين شرشار"
        },
        {
          "id": 749,
          "name": "Azzaba",
          "name_ar": "عزابة"
        },
        {
          "id": 750,
          "name": "Bouchetata",
          "name_ar": "بوشطاطة"
        },
        {
          "id": 751,
          "name": "Filfila",
          "name_ar": "فلفلة"
        },
        {
          "id": 752,
          "name": "Hammadi Krouma",
          "name_ar": "حمادي كرومة"
        },
        {
          "id": 753,
          "name": "Skikda",
          "name_ar": "سكيكدة"
        },
        {
          "id": 754,
          "name": "Ain Zouit",
          "name_ar": "عين زويت"
        },
        {
          "id": 755,
          "name": "Djendel Saadi Mohamed",
          "name_ar": "جندل سعدي محمد"
        },
        {
          "id": 756,
          "name": "Kanoua",
          "name_ar": "قنواع"
        }
      ]
    },
    {
      "id": 22,
      "name": "Sidi Bel Abbes",
      "name_ar": "سيدي بلعباس",
      "communes_count": 52,
      "communes": [
        {
          "id": 757,
          "name": "Sidi Ali Benyoub",
          "name_ar": "سيدي علي بن يوب"
        },
        {
          "id": 758,
          "name": "Moulay Slissen",
          "name_ar": "مولاي سليسن"
        },
        {
          "id": 759,
          "name": "El Hacaiba",
          "name_ar": "الحصيبة"
        },
        {
          "id": 760,
          "name": "Ain Tindamine",
          "name_ar": "عين تندمين"
        },
        {
          "id": 761,
          "name": "Tenira",
          "name_ar": "تنيرة"
        },
        {
          "id": 762,
          "name": "Oued Sefioun",
          "name_ar": "وادي سفيون"
        },
        {
          "id": 763,
          "name": "Hassi Dahou",
          "name_ar": "حاسي دحو"
        },
        {
          "id": 764,
          "name": "Oued Taourira",
          "name_ar": "وادي تاوريرة"
        },
        {
          "id": 765,
          "name": "Benachiba Chelia",
          "name_ar": "بن عشيبة شلية"
        },
        {
          "id": 766,
          "name": "Sidi Yacoub",
          "name_ar": "سيدي يعقوب"
        },
        {
          "id": 767,
          "name": "Sidi Lahcene",
          "name_ar": "سيدي لحسن"
        },
        {
          "id": 768,
          "name": "Sidi Khaled",
          "name_ar": "سيدي خالد"
        },
        {
          "id": 769,
          "name": "Tabia",
          "name_ar": "طابية"
        },
        {
          "id": 770,
          "name": "Sidi Brahim",
          "name_ar": "سيدي ابراهيم"
        },
        {
          "id": 771,
          "name": "Amarnas",
          "name_ar": "العمارنة"
        },
        {
          "id": 772,
          "name": "Boukhanefis",
          "name_ar": "بوخنفيس"
        },
        {
          "id": 773,
          "name": "Hassi Zahana",
          "name_ar": "حاسي زهانة"
        },
        {
          "id": 774,
          "name": "Chetouane Belaila",
          "name_ar": "شيطوان البلايلة"
        },
        {
          "id": 775,
          "name": "Ben Badis",
          "name_ar": "بن باديس"
        },
        {
          "id": 776,
          "name": "Bedrabine El Mokrani",
          "name_ar": "بضرابين المقراني"
        },
        {
          "id": 777,
          "name": "Sfisef",
          "name_ar": "سفيزف"
        },
        {
          "id": 778,
          "name": "M'cid",
          "name_ar": "مسيد"
        },
        {
          "id": 779,
          "name": "Boudjebaa El Bordj",
          "name_ar": "بوجبهة البرج"
        },
        {
          "id": 780,
          "name": "Ain- Adden",
          "name_ar": "عين أدن"
        },
        {
          "id": 781,
          "name": "Sidi Hamadouche",
          "name_ar": "سيدي حمادوش"
        },
        {
          "id": 782,
          "name": "Sidi Chaib",
          "name_ar": "سيدي شعيب"
        },
        {
          "id": 783,
          "name": "Makedra",
          "name_ar": "مكدرة"
        },
        {
          "id": 784,
          "name": "Ain El Berd",
          "name_ar": "عين البرد"
        },
        {
          "id": 785,
          "name": "Redjem Demouche",
          "name_ar": "رجم دموش"
        },
        {
          "id": 786,
          "name": "Ras El Ma",
          "name_ar": "راس الماء"
        },
        {
          "id": 787,
          "name": "Oued Sebaa",
          "name_ar": "وادي السبع"
        },
        {
          "id": 788,
          "name": "Marhoum",
          "name_ar": "مرحوم"
        },
        {
          "id": 789,
          "name": "Sidi Bel-Abbes",
          "name_ar": "سيدي بلعباس"
        },
        {
          "id": 790,
          "name": "Ain Thrid",
          "name_ar": "عين الثريد"
        },
        {
          "id": 791,
          "name": "Sehala Thaoura",
          "name_ar": "السهالة الثورة"
        },
        {
          "id": 792,
          "name": "Tessala",
          "name_ar": "تسالة"
        },
        {
          "id": 793,
          "name": "Belarbi",
          "name_ar": "بلعربي"
        },
        {
          "id": 794,
          "name": "Mostefa  Ben Brahim",
          "name_ar": "مصطفى بن ابراهيم"
        },
        {
          "id": 795,
          "name": "Tilmouni",
          "name_ar": "تلموني"
        },
        {
          "id": 796,
          "name": "Zerouala",
          "name_ar": "زروالة"
        },
        {
          "id": 797,
          "name": "Dhaya",
          "name_ar": "الضاية"
        },
        {
          "id": 798,
          "name": "Mezaourou",
          "name_ar": "مزاورو"
        },
        {
          "id": 799,
          "name": "Teghalimet",
          "name_ar": "تغاليمت"
        },
        {
          "id": 800,
          "name": "Telagh",
          "name_ar": "تلاغ"
        },
        {
          "id": 801,
          "name": "Ain Kada",
          "name_ar": "عين قادة"
        },
        {
          "id": 802,
          "name": "Lamtar",
          "name_ar": "لمطار"
        },
        {
          "id": 803,
          "name": "Sidi Ali Boussidi",
          "name_ar": "سيدي علي بوسيدي"
        },
        {
          "id": 804,
          "name": "Sidi Dahou Zairs",
          "name_ar": "سيدي دحو الزاير"
        },
        {
          "id": 805,
          "name": "Bir El Hammam",
          "name_ar": "بئر الحمام"
        },
        {
          "id": 806,
          "name": "Merine",
          "name_ar": "مرين"
        },
        {
          "id": 807,
          "name": "Tefessour",
          "name_ar": "تفسور"
        },
        {
          "id": 808,
          "name": "Taoudmout",
          "name_ar": "تاودموت"
        }
      ]
    },
    {
      "id": 23,
      "name": "Annaba",
      "name_ar": "عنابة",
      "communes_count": 12,
      "communes": [
        {
          "id": 809,
          "name": "Annaba",
          "name_ar": "عنابة"
        },
        {
          "id": 810,
          "name": "Seraidi",
          "name_ar": "سرايدي"
        },
        {
          "id": 811,
          "name": "Berrahal",
          "name_ar": "برحال"
        },
        {
          "id": 812,
          "name": "Oued El Aneb",
          "name_ar": "واد العنب"
        },
        {
          "id": 813,
          "name": "El Hadjar",
          "name_ar": "الحجار"
        },
        {
          "id": 814,
          "name": "Sidi Amar",
          "name_ar": "سيدي عمار"
        },
        {
          "id": 815,
          "name": "El Bouni",
          "name_ar": "البوني"
        },
        {
          "id": 816,
          "name": "Ain El Berda",
          "name_ar": "عين الباردة"
        },
        {
          "id": 817,
          "name": "Cheurfa",
          "name_ar": "الشرفة"
        },
        {
          "id": 818,
          "name": "El Eulma",
          "name_ar": "العلمة"
        },
        {
          "id": 819,
          "name": "Treat",
          "name_ar": "التريعات"
        },
        {
          "id": 820,
          "name": "Chetaibi",
          "name_ar": "شطايبي"
        }
      ]
    },
    {
      "id": 24,
      "name": "Guelma",
      "name_ar": "قالمة",
      "communes_count": 34,
      "communes": [
        {
          "id": 821,
          "name": "Nechmaya",
          "name_ar": "نشماية"
        },
        {
          "id": 822,
          "name": "Bou Hamdane",
          "name_ar": "بوحمدان"
        },
        {
          "id": 823,
          "name": "Hammam Debagh",
          "name_ar": "حمام دباغ"
        },
        {
          "id": 824,
          "name": "Roknia",
          "name_ar": "الركنية"
        },
        {
          "id": 825,
          "name": "Dahouara",
          "name_ar": "الدهوارة"
        },
        {
          "id": 826,
          "name": "Hammam N'bail",
          "name_ar": "حمام النبايل"
        },
        {
          "id": 827,
          "name": "Guelma",
          "name_ar": "قالمة"
        },
        {
          "id": 828,
          "name": "Boumahra Ahmed",
          "name_ar": "بومهرة أحمد"
        },
        {
          "id": 829,
          "name": "Ain Ben Beida",
          "name_ar": "عين بن بيضاء"
        },
        {
          "id": 830,
          "name": "Bouchegouf",
          "name_ar": "بوشقوف"
        },
        {
          "id": 831,
          "name": "Medjez Sfa",
          "name_ar": "مجاز الصفاء"
        },
        {
          "id": 832,
          "name": "Oued Ferragha",
          "name_ar": "وادي فراغة"
        },
        {
          "id": 833,
          "name": "Bouati Mahmoud",
          "name_ar": "بوعاتي محمود"
        },
        {
          "id": 834,
          "name": "El Fedjoudj",
          "name_ar": "الفجوج"
        },
        {
          "id": 835,
          "name": "Heliopolis",
          "name_ar": "هيليوبوليس"
        },
        {
          "id": 836,
          "name": "Medjez Amar",
          "name_ar": "مجاز عمار"
        },
        {
          "id": 837,
          "name": "Houari Boumedienne",
          "name_ar": "هواري بومدين"
        },
        {
          "id": 838,
          "name": "Ras El Agba",
          "name_ar": "رأس العقبة"
        },
        {
          "id": 839,
          "name": "Sellaoua Announa",
          "name_ar": "سلاوة عنونة"
        },
        {
          "id": 840,
          "name": "Djeballah Khemissi",
          "name_ar": "جبالة الخميسي"
        },
        {
          "id": 841,
          "name": "Bordj Sabath",
          "name_ar": "برج صباط"
        },
        {
          "id": 842,
          "name": "Oued Zenati",
          "name_ar": "وادي الزناتي"
        },
        {
          "id": 843,
          "name": "Ain Regada",
          "name_ar": "عين رقادة"
        },
        {
          "id": 844,
          "name": "Ain Larbi",
          "name_ar": "عين العربي"
        },
        {
          "id": 845,
          "name": "Ain Makhlouf",
          "name_ar": "عين مخلوف"
        },
        {
          "id": 846,
          "name": "Tamlouka",
          "name_ar": "تاملوكة"
        },
        {
          "id": 847,
          "name": "Ain Sandel",
          "name_ar": "عين صندل"
        },
        {
          "id": 848,
          "name": "Bou Hachana",
          "name_ar": "بوحشانة"
        },
        {
          "id": 849,
          "name": "Khezaras",
          "name_ar": "لخزارة"
        },
        {
          "id": 850,
          "name": "Belkheir",
          "name_ar": "بلخير"
        },
        {
          "id": 851,
          "name": "Beni Mezline",
          "name_ar": "بني مزلين"
        },
        {
          "id": 852,
          "name": "Guelaat Bou Sbaa",
          "name_ar": "قلعة بوصبع"
        },
        {
          "id": 853,
          "name": "Oued Cheham",
          "name_ar": "وادي الشحم"
        },
        {
          "id": 854,
          "name": "Bendjarah",
          "name_ar": "بن جراح"
        }
      ]
    },
    {
      "id": 25,
      "name": "Constantine",
      "name_ar": "قسنطينة",
      "communes_count": 12,
      "communes": [
        {
          "id": 855,
          "name": "Didouche Mourad",
          "name_ar": "ديدوش مراد"
        },
        {
          "id": 856,
          "name": "Hamma Bouziane",
          "name_ar": "حامة بوزيان"
        },
        {
          "id": 857,
          "name": "Beni Hamidane",
          "name_ar": "بني حميدان"
        },
        {
          "id": 858,
          "name": "Zighoud Youcef",
          "name_ar": "زيغود يوسف"
        },
        {
          "id": 859,
          "name": "Ain Smara",
          "name_ar": "عين السمارة"
        },
        {
          "id": 860,
          "name": "El Khroub",
          "name_ar": "الخروب"
        },
        {
          "id": 861,
          "name": "Ouled Rahmoun",
          "name_ar": "أولاد رحمون"
        },
        {
          "id": 862,
          "name": "Ain Abid",
          "name_ar": "عين عبيد"
        },
        {
          "id": 863,
          "name": "Ben Badis",
          "name_ar": "أبن باديس الهرية"
        },
        {
          "id": 864,
          "name": "Ibn Ziad",
          "name_ar": "ابن زياد"
        },
        {
          "id": 865,
          "name": "Messaoud Boudjeriou",
          "name_ar": "بوجريو مسعود"
        },
        {
          "id": 866,
          "name": "Constantine",
          "name_ar": "قسنطينة"
        }
      ]
    },
    {
      "id": 26,
      "name": "Medea",
      "name_ar": "المدية",
      "communes_count": 43,
      "communes": [
        {
          "id": 868,
          "name": "Souagui",
          "name_ar": "السواقي"
        },
        {
          "id": 872,
          "name": "El Azizia",
          "name_ar": "العزيزية"
        },
        {
          "id": 873,
          "name": "Maghraoua",
          "name_ar": "مغراوة"
        },
        {
          "id": 874,
          "name": "Mihoub",
          "name_ar": "ميهوب"
        },
        {
          "id": 878,
          "name": "Hannacha",
          "name_ar": "حناشة"
        },
        {
          "id": 879,
          "name": "Ouamri",
          "name_ar": "عوامري"
        },
        {
          "id": 880,
          "name": "Oued Harbil",
          "name_ar": "وادي حربيل"
        },
        {
          "id": 881,
          "name": "Beni Slimane",
          "name_ar": "بني سليمان"
        },
        {
          "id": 882,
          "name": "Bouaichoune",
          "name_ar": "بوعيشون"
        },
        {
          "id": 883,
          "name": "Ouled Bouachra",
          "name_ar": "أولاد بوعشرة"
        },
        {
          "id": 884,
          "name": "Si Mahdjoub",
          "name_ar": "سي المحجوب"
        },
        {
          "id": 885,
          "name": "Bouskene",
          "name_ar": "بوسكن"
        },
        {
          "id": 886,
          "name": "Sidi Rabie",
          "name_ar": "سيدي الربيع"
        },
        {
          "id": 887,
          "name": "Berrouaghia",
          "name_ar": "البرواقية"
        },
        {
          "id": 888,
          "name": "Ouled Deid",
          "name_ar": "أولاد دايد"
        },
        {
          "id": 889,
          "name": "Rebaia",
          "name_ar": "الربعية"
        },
        {
          "id": 890,
          "name": "Medjebar",
          "name_ar": "مجبر"
        },
        {
          "id": 891,
          "name": "Tletat Ed Douair",
          "name_ar": "ثلاث دوائر"
        },
        {
          "id": 892,
          "name": "Zoubiria",
          "name_ar": "الزبيرية"
        },
        {
          "id": 893,
          "name": "Aissaouia",
          "name_ar": "العيساوية"
        },
        {
          "id": 894,
          "name": "El Haoudane",
          "name_ar": "الحوضان"
        },
        {
          "id": 895,
          "name": "Mezerana",
          "name_ar": "مزغنة"
        },
        {
          "id": 896,
          "name": "Tablat",
          "name_ar": "تابلاط"
        },
        {
          "id": 898,
          "name": "Seghouane",
          "name_ar": "سغوان"
        },
        {
          "id": 899,
          "name": "Draa Esmar",
          "name_ar": "ذراع السمار"
        },
        {
          "id": 900,
          "name": "Medea",
          "name_ar": "المدية"
        },
        {
          "id": 901,
          "name": "Tamesguida",
          "name_ar": "تمسقيدة"
        },
        {
          "id": 902,
          "name": "Ben Chicao",
          "name_ar": "بن شكاو"
        },
        {
          "id": 903,
          "name": "El Hamdania",
          "name_ar": "الحمدانية"
        },
        {
          "id": 904,
          "name": "Ouzera",
          "name_ar": "وزرة"
        },
        {
          "id": 905,
          "name": "Tizi Mahdi",
          "name_ar": "تيزي مهدي"
        },
        {
          "id": 911,
          "name": "Baata",
          "name_ar": "بعطة"
        },
        {
          "id": 912,
          "name": "El Omaria",
          "name_ar": "العمارية"
        },
        {
          "id": 913,
          "name": "Ouled Brahim",
          "name_ar": "أولاد إبراهيم"
        },
        {
          "id": 914,
          "name": "Bir Ben Laabed",
          "name_ar": "بئر بن عابد"
        },
        {
          "id": 915,
          "name": "El Guelbelkebir",
          "name_ar": "القلب الكبير"
        },
        {
          "id": 916,
          "name": "Sedraya",
          "name_ar": "سدراية"
        },
        {
          "id": 921,
          "name": "Bouchrahil",
          "name_ar": "بوشراحيل"
        },
        {
          "id": 922,
          "name": "Khams Djouamaa",
          "name_ar": "خمس جوامع"
        },
        {
          "id": 923,
          "name": "Sidi Naamane",
          "name_ar": "سيدي نعمان"
        },
        {
          "id": 927,
          "name": "Djouab",
          "name_ar": "جواب"
        },
        {
          "id": 928,
          "name": "Sidi Zahar",
          "name_ar": "سيدي زهار"
        },
        {
          "id": 929,
          "name": "Sidi Ziane",
          "name_ar": "سيدي زيان"
        }
      ]
    },
    {
      "id": 27,
      "name": "Mostaganem",
      "name_ar": "مستغانم",
      "communes_count": 32,
      "communes": [
        {
          "id": 931,
          "name": "Fornaka",
          "name_ar": "فرناقة"
        },
        {
          "id": 932,
          "name": "Oued El Kheir",
          "name_ar": "وادي الخير"
        },
        {
          "id": 933,
          "name": "Hassiane",
          "name_ar": "الحسيان (بني ياحي"
        },
        {
          "id": 934,
          "name": "Hassi Mameche",
          "name_ar": "حاسي ماماش"
        },
        {
          "id": 935,
          "name": "Mazagran",
          "name_ar": "مزغران"
        },
        {
          "id": 936,
          "name": "Stidia",
          "name_ar": "ستيدية"
        },
        {
          "id": 937,
          "name": "Ain-Tedles",
          "name_ar": "عين تادلس"
        },
        {
          "id": 938,
          "name": "Sidi Belaattar",
          "name_ar": "سيدي بلعطار"
        },
        {
          "id": 939,
          "name": "Sour",
          "name_ar": "سور"
        },
        {
          "id": 940,
          "name": "Ain-Boudinar",
          "name_ar": "عين بودينار"
        },
        {
          "id": 941,
          "name": "Kheir-Eddine",
          "name_ar": "خير الدين"
        },
        {
          "id": 942,
          "name": "Sayada",
          "name_ar": "صيادة"
        },
        {
          "id": 943,
          "name": "Sidi Ali",
          "name_ar": "سيدي علي"
        },
        {
          "id": 944,
          "name": "Tazgait",
          "name_ar": "تزقايت"
        },
        {
          "id": 945,
          "name": "Benabdelmalek Ramdane",
          "name_ar": "بن عبد المالك رمضان"
        },
        {
          "id": 946,
          "name": "Mostaganem",
          "name_ar": "مستغانم"
        },
        {
          "id": 947,
          "name": "Hadjadj",
          "name_ar": "حجاج"
        },
        {
          "id": 948,
          "name": "Sidi-Lakhdar",
          "name_ar": "سيدي لخضر"
        },
        {
          "id": 949,
          "name": "Achaacha",
          "name_ar": "عشعاشة"
        },
        {
          "id": 950,
          "name": "Khadra",
          "name_ar": "خضرة"
        },
        {
          "id": 951,
          "name": "Nekmaria",
          "name_ar": "نكمارية"
        },
        {
          "id": 952,
          "name": "Ouled Boughalem",
          "name_ar": "أولاد بوغالم"
        },
        {
          "id": 953,
          "name": "Bouguirat",
          "name_ar": "بوقيراط"
        },
        {
          "id": 954,
          "name": "Safsaf",
          "name_ar": "صفصاف"
        },
        {
          "id": 955,
          "name": "Sirat",
          "name_ar": "سيرات"
        },
        {
          "id": 956,
          "name": "Souaflia",
          "name_ar": "السوافلية"
        },
        {
          "id": 957,
          "name": "Ain-Sidi Cherif",
          "name_ar": "عين سيدي الشريف"
        },
        {
          "id": 958,
          "name": "Mansourah",
          "name_ar": "منصورة"
        },
        {
          "id": 959,
          "name": "Mesra",
          "name_ar": "ماسرة"
        },
        {
          "id": 960,
          "name": "Touahria",
          "name_ar": "الطواهرية"
        },
        {
          "id": 961,
          "name": "Ain-Nouissy",
          "name_ar": "عين نويسي"
        },
        {
          "id": 962,
          "name": "Ouled-Maalah",
          "name_ar": "أولاد مع الله"
        }
      ]
    },
    {
      "id": 28,
      "name": "M'Sila",
      "name_ar": "المسيلة",
      "communes_count": 24,
      "communes": [
        {
          "id": 963,
          "name": "Chellal",
          "name_ar": "شلال"
        },
        {
          "id": 964,
          "name": "Ouled Madhi",
          "name_ar": "أولاد ماضي"
        },
        {
          "id": 965,
          "name": "Khettouti Sed-El-Jir",
          "name_ar": "خطوطي سد الجير"
        },
        {
          "id": 966,
          "name": "Belaiba",
          "name_ar": "بلعايبة"
        },
        {
          "id": 967,
          "name": "Berhoum",
          "name_ar": "برهوم"
        },
        {
          "id": 968,
          "name": "Dehahna",
          "name_ar": "دهاهنة"
        },
        {
          "id": 969,
          "name": "Magra",
          "name_ar": "مقرة"
        },
        {
          "id": 970,
          "name": "Beni Ilmane",
          "name_ar": "بني يلمان"
        },
        {
          "id": 971,
          "name": "Bouti Sayeh",
          "name_ar": "بوطي السايح"
        },
        {
          "id": 972,
          "name": "Sidi Aissa",
          "name_ar": "سيدي عيسى"
        },
        {
          "id": 973,
          "name": "Ain El Hadjel",
          "name_ar": "عين الحجل"
        },
        {
          "id": 993,
          "name": "Djebel Messaad",
          "name_ar": "جبل مساعد"
        },
        {
          "id": 995,
          "name": "M'sila",
          "name_ar": "المسيلة"
        },
        {
          "id": 996,
          "name": "Hammam Dalaa",
          "name_ar": "حمام الضلعة"
        },
        {
          "id": 997,
          "name": "Ouanougha",
          "name_ar": "ونوغة"
        },
        {
          "id": 998,
          "name": "Ouled Mansour",
          "name_ar": "أولاد منصور"
        },
        {
          "id": 999,
          "name": "Tarmount",
          "name_ar": "تارمونت"
        },
        {
          "id": 1003,
          "name": "Ouled Derradj",
          "name_ar": "أولاد دراج"
        },
        {
          "id": 1004,
          "name": "Souamaa",
          "name_ar": "السوامع"
        },
        {
          "id": 1005,
          "name": "El Houamed",
          "name_ar": "الحوامد"
        },
        {
          "id": 1006,
          "name": "Khoubana",
          "name_ar": "خبانة"
        },
        {
          "id": 1007,
          "name": "M'cif",
          "name_ar": "مسيف"
        },
        {
          "id": 1008,
          "name": "Ain Khadra",
          "name_ar": "عين الخضراء"
        },
        {
          "id": 1009,
          "name": "Ouled Addi Guebala",
          "name_ar": "أولاد عدي لقبالة"
        }
      ]
    },
    {
      "id": 29,
      "name": "Mascara",
      "name_ar": "معسكر",
      "communes_count": 47,
      "communes": [
        {
          "id": 1010,
          "name": "Oued El Abtal",
          "name_ar": "وادي الأبطال"
        },
        {
          "id": 1011,
          "name": "Sidi Abdelmoumene",
          "name_ar": "سيدي عبد المومن"
        },
        {
          "id": 1012,
          "name": "Sedjerara",
          "name_ar": "سجرارة"
        },
        {
          "id": 1013,
          "name": "Mohammadia",
          "name_ar": "المحمدية"
        },
        {
          "id": 1014,
          "name": "Tighennif",
          "name_ar": "تيغنيف"
        },
        {
          "id": 1015,
          "name": "Mocta-Douz",
          "name_ar": "مقطع الدوز"
        },
        {
          "id": 1016,
          "name": "Ferraguig",
          "name_ar": "فراقيق"
        },
        {
          "id": 1017,
          "name": "El Ghomri",
          "name_ar": "الغمري"
        },
        {
          "id": 1018,
          "name": "Zahana",
          "name_ar": "زهانة"
        },
        {
          "id": 1019,
          "name": "El Gaada",
          "name_ar": "القعدة"
        },
        {
          "id": 1020,
          "name": "Ras El Ain Amirouche",
          "name_ar": "رأس عين عميروش"
        },
        {
          "id": 1021,
          "name": "Oggaz",
          "name_ar": "عقاز"
        },
        {
          "id": 1022,
          "name": "Alaimia",
          "name_ar": "العلايمية"
        },
        {
          "id": 1023,
          "name": "Sig",
          "name_ar": "سيق"
        },
        {
          "id": 1024,
          "name": "Chorfa",
          "name_ar": "الشرفاء"
        },
        {
          "id": 1025,
          "name": "Bou Henni",
          "name_ar": "بوهني"
        },
        {
          "id": 1026,
          "name": "El Mamounia",
          "name_ar": "المأمونية"
        },
        {
          "id": 1027,
          "name": "El Gueitena",
          "name_ar": "القطنة"
        },
        {
          "id": 1028,
          "name": "Ain Fares",
          "name_ar": "عين فارس"
        },
        {
          "id": 1029,
          "name": "Gharrous",
          "name_ar": "غروس"
        },
        {
          "id": 1030,
          "name": "Benian",
          "name_ar": "بنيان"
        },
        {
          "id": 1031,
          "name": "Aouf",
          "name_ar": "عوف"
        },
        {
          "id": 1032,
          "name": "Guerdjoum",
          "name_ar": "قرجوم"
        },
        {
          "id": 1033,
          "name": "Ain Frass",
          "name_ar": "عين أفرص"
        },
        {
          "id": 1034,
          "name": "Ain Fekan",
          "name_ar": "عين فكان"
        },
        {
          "id": 1035,
          "name": "Khalouia",
          "name_ar": "خلوية"
        },
        {
          "id": 1036,
          "name": "El Menaouer",
          "name_ar": "المنور"
        },
        {
          "id": 1037,
          "name": "El Bordj",
          "name_ar": "البرج"
        },
        {
          "id": 1038,
          "name": "Sidi Boussaid",
          "name_ar": "سيدي بوسعيد"
        },
        {
          "id": 1039,
          "name": "Matemore",
          "name_ar": "المطمور"
        },
        {
          "id": 1040,
          "name": "Sidi Kada",
          "name_ar": "سيدي قادة"
        },
        {
          "id": 1041,
          "name": "Makhda",
          "name_ar": "ماقضة"
        },
        {
          "id": 1042,
          "name": "Mascara",
          "name_ar": "معسكر"
        },
        {
          "id": 1043,
          "name": "Bouhanifia",
          "name_ar": "بوحنيفية"
        },
        {
          "id": 1044,
          "name": "Ghriss",
          "name_ar": "غريس"
        },
        {
          "id": 1045,
          "name": "Hacine",
          "name_ar": "حسين"
        },
        {
          "id": 1046,
          "name": "El Keurt",
          "name_ar": "القرط"
        },
        {
          "id": 1047,
          "name": "Froha",
          "name_ar": "فروحة"
        },
        {
          "id": 1048,
          "name": "Tizi",
          "name_ar": "تيزي"
        },
        {
          "id": 1049,
          "name": "Sehailia",
          "name_ar": "السهايلية"
        },
        {
          "id": 1050,
          "name": "Maoussa",
          "name_ar": "ماوسة"
        },
        {
          "id": 1051,
          "name": "Sidi Abdeldjebar",
          "name_ar": "سيدي عبد الجبار"
        },
        {
          "id": 1052,
          "name": "El Hachem",
          "name_ar": "الحشم"
        },
        {
          "id": 1053,
          "name": "Nesmot",
          "name_ar": "نسمط"
        },
        {
          "id": 1054,
          "name": "Zelamta",
          "name_ar": "زلامطة"
        },
        {
          "id": 1055,
          "name": "Ain Ferah",
          "name_ar": "عين فراح"
        },
        {
          "id": 1056,
          "name": "Oued Taria",
          "name_ar": "وادي التاغية"
        }
      ]
    },
    {
      "id": 30,
      "name": "Ouargla",
      "name_ar": "ورقلة",
      "communes_count": 8,
      "communes": [
        {
          "id": 1057,
          "name": "Ouargla",
          "name_ar": "ورقلة"
        },
        {
          "id": 1058,
          "name": "Hassi Messaoud",
          "name_ar": "حاسي مسعود"
        },
        {
          "id": 1059,
          "name": "Ain Beida",
          "name_ar": "عين البيضاء"
        },
        {
          "id": 1060,
          "name": "Hassi Ben Abdellah",
          "name_ar": "حاسي بن عبد الله"
        },
        {
          "id": 1061,
          "name": "Sidi Khouiled",
          "name_ar": "سيدي خويلد"
        },
        {
          "id": 1062,
          "name": "El Borma",
          "name_ar": "البرمة"
        },
        {
          "id": 1063,
          "name": "Rouissat",
          "name_ar": "الرويسات"
        },
        {
          "id": 1064,
          "name": "N'goussa",
          "name_ar": "انقوسة"
        }
      ]
    },
    {
      "id": 31,
      "name": "Oran",
      "name_ar": "وهران",
      "communes_count": 26,
      "communes": [
        {
          "id": 1065,
          "name": "Sidi Chami",
          "name_ar": "سيدي الشحمي"
        },
        {
          "id": 1066,
          "name": "Hassi Mefsoukh",
          "name_ar": "حاسي مفسوخ"
        },
        {
          "id": 1067,
          "name": "Bir El Djir",
          "name_ar": "بئر الجير"
        },
        {
          "id": 1068,
          "name": "Hassi Ben Okba",
          "name_ar": "حاسي بن عقبة"
        },
        {
          "id": 1069,
          "name": "Gdyel",
          "name_ar": "قديل"
        },
        {
          "id": 1070,
          "name": "Hassi Bounif",
          "name_ar": "حاسي بونيف"
        },
        {
          "id": 1071,
          "name": "El Kerma",
          "name_ar": "الكرمة"
        },
        {
          "id": 1072,
          "name": "Es Senia",
          "name_ar": "السانية"
        },
        {
          "id": 1073,
          "name": "Ben Freha",
          "name_ar": "بن فريحة"
        },
        {
          "id": 1074,
          "name": "Arzew",
          "name_ar": "أرزيو"
        },
        {
          "id": 1075,
          "name": "Sidi Ben Yebka",
          "name_ar": "سيدي بن يبقى"
        },
        {
          "id": 1076,
          "name": "Ain Biya",
          "name_ar": "عين البية"
        },
        {
          "id": 1077,
          "name": "Bethioua",
          "name_ar": "بطيوة"
        },
        {
          "id": 1078,
          "name": "Marsat El Hadjadj",
          "name_ar": "مرسى الحجاج"
        },
        {
          "id": 1079,
          "name": "Ain Turk",
          "name_ar": "عين الترك"
        },
        {
          "id": 1080,
          "name": "Oran",
          "name_ar": "وهران"
        },
        {
          "id": 1081,
          "name": "El Ancor",
          "name_ar": "العنصر"
        },
        {
          "id": 1082,
          "name": "Mers El Kebir",
          "name_ar": "المرسى الكبير"
        },
        {
          "id": 1083,
          "name": "Boufatis",
          "name_ar": "بوفاتيس"
        },
        {
          "id": 1084,
          "name": "El Braya",
          "name_ar": "البراية"
        },
        {
          "id": 1085,
          "name": "Oued Tlelat",
          "name_ar": "وادي تليلات"
        },
        {
          "id": 1086,
          "name": "Ain Kerma",
          "name_ar": "عين الكرمة"
        },
        {
          "id": 1087,
          "name": "Boutlelis",
          "name_ar": "بوتليليس"
        },
        {
          "id": 1088,
          "name": "Messerghin",
          "name_ar": "مسرغين"
        },
        {
          "id": 1089,
          "name": "Bousfer",
          "name_ar": "بوسفر"
        },
        {
          "id": 1090,
          "name": "Tafraoui",
          "name_ar": "طفراوي"
        }
      ]
    },
    {
      "id": 32,
      "name": "El Bayadh",
      "name_ar": "البيض",
      "communes_count": 15,
      "communes": [
        {
          "id": 1091,
          "name": "Ain El Orak",
          "name_ar": "عين العراك"
        },
        {
          "id": 1092,
          "name": "Krakda",
          "name_ar": "كراكدة"
        },
        {
          "id": 1093,
          "name": "Sidi Slimane",
          "name_ar": "سيدي سليمان"
        },
        {
          "id": 1094,
          "name": "Sidi Ameur",
          "name_ar": "سيدي عامر"
        },
        {
          "id": 1095,
          "name": "Boualem",
          "name_ar": "بوعلام"
        },
        {
          "id": 1096,
          "name": "El Bnoud",
          "name_ar": "البنود"
        },
        {
          "id": 1097,
          "name": "Bougtoub",
          "name_ar": "بوقطب"
        },
        {
          "id": 1098,
          "name": "El Kheiter",
          "name_ar": "الخيثر"
        },
        {
          "id": 1099,
          "name": "Tousmouline",
          "name_ar": "توسمولين"
        },
        {
          "id": 1100,
          "name": "Sidi Tiffour",
          "name_ar": "سيدي طيفور"
        },
        {
          "id": 1101,
          "name": "Stitten",
          "name_ar": "ستيتن"
        },
        {
          "id": 1102,
          "name": "El Bayadh",
          "name_ar": "البيض"
        },
        {
          "id": 1103,
          "name": "Rogassa",
          "name_ar": "رقاصة"
        },
        {
          "id": 1104,
          "name": "El Mehara",
          "name_ar": "المحرة"
        },
        {
          "id": 1105,
          "name": "Kef El Ahmar",
          "name_ar": "الكاف الأحمر"
        }
      ]
    },
    {
      "id": 33,
      "name": "Illizi",
      "name_ar": "إليزي",
      "communes_count": 4,
      "communes": [
        {
          "id": 1113,
          "name": "Bordj Omar Driss",
          "name_ar": "برج عمر إدريس"
        },
        {
          "id": 1114,
          "name": "Debdeb",
          "name_ar": "دبداب"
        },
        {
          "id": 1115,
          "name": "In Amenas",
          "name_ar": "إن أمناس"
        },
        {
          "id": 1116,
          "name": "Illizi",
          "name_ar": "إيليزي"
        }
      ]
    },
    {
      "id": 34,
      "name": "Bordj Bou Arreridj",
      "name_ar": "برج بوعريريج",
      "communes_count": 34,
      "communes": [
        {
          "id": 1117,
          "name": "Elhammadia",
          "name_ar": "الحمادية"
        },
        {
          "id": 1118,
          "name": "Ouled Sidi-Brahim",
          "name_ar": "أولاد سيدي ابراهيم"
        },
        {
          "id": 1119,
          "name": "Ain Taghrout",
          "name_ar": "عين تاغروت"
        },
        {
          "id": 1120,
          "name": "Tixter",
          "name_ar": "تيكستار"
        },
        {
          "id": 1121,
          "name": "Belimour",
          "name_ar": "بليمور"
        },
        {
          "id": 1122,
          "name": "El Annasseur",
          "name_ar": "العناصر"
        },
        {
          "id": 1123,
          "name": "Ghailasa",
          "name_ar": "غيلاسة"
        },
        {
          "id": 1124,
          "name": "Taglait",
          "name_ar": "تقلعيت"
        },
        {
          "id": 1125,
          "name": "Bordj Ghedir",
          "name_ar": "برج الغدير"
        },
        {
          "id": 1126,
          "name": "El Euch",
          "name_ar": "العش"
        },
        {
          "id": 1127,
          "name": "Sidi-Embarek",
          "name_ar": "سيدي أمبارك"
        },
        {
          "id": 1128,
          "name": "Khelil",
          "name_ar": "خليل"
        },
        {
          "id": 1129,
          "name": "Bir Kasdali",
          "name_ar": "بئر قاصد علي"
        },
        {
          "id": 1130,
          "name": "Tefreg",
          "name_ar": "تفرق"
        },
        {
          "id": 1131,
          "name": "El Main",
          "name_ar": "الماين"
        },
        {
          "id": 1132,
          "name": "Djaafra",
          "name_ar": "جعافرة"
        },
        {
          "id": 1133,
          "name": "Colla",
          "name_ar": "القلة"
        },
        {
          "id": 1134,
          "name": "Teniet En Nasr",
          "name_ar": "ثنية النصر"
        },
        {
          "id": 1135,
          "name": "El M'hir",
          "name_ar": "المهير"
        },
        {
          "id": 1136,
          "name": "Ksour",
          "name_ar": "القصور"
        },
        {
          "id": 1137,
          "name": "Mansoura",
          "name_ar": "المنصورة"
        },
        {
          "id": 1138,
          "name": "Haraza",
          "name_ar": "حرازة"
        },
        {
          "id": 1139,
          "name": "Rabta",
          "name_ar": "الرابطة"
        },
        {
          "id": 1140,
          "name": "El Achir",
          "name_ar": "الياشير"
        },
        {
          "id": 1141,
          "name": "Hasnaoua",
          "name_ar": "حسناوة"
        },
        {
          "id": 1142,
          "name": "Medjana",
          "name_ar": "مجانة"
        },
        {
          "id": 1143,
          "name": "Ain Tesra",
          "name_ar": "عين تسرة"
        },
        {
          "id": 1144,
          "name": "Ouled Brahem",
          "name_ar": "أولاد أبراهم"
        },
        {
          "id": 1145,
          "name": "Ras El Oued",
          "name_ar": "رأس الوادي"
        },
        {
          "id": 1146,
          "name": "Bordj Zemmoura",
          "name_ar": "برج زمورة"
        },
        {
          "id": 1147,
          "name": "Ouled Dahmane",
          "name_ar": "أولاد دحمان"
        },
        {
          "id": 1148,
          "name": "Tassamert",
          "name_ar": "تسامرت"
        },
        {
          "id": 1149,
          "name": "B. B. Arreridj",
          "name_ar": "برج بوعريرج"
        },
        {
          "id": 1150,
          "name": "Ben Daoud",
          "name_ar": "بن داود"
        }
      ]
    },
    {
      "id": 35,
      "name": "Boumerdes",
      "name_ar": "بومرداس",
      "communes_count": 32,
      "communes": [
        {
          "id": 1151,
          "name": "El Kharrouba",
          "name_ar": "الخروبة"
        },
        {
          "id": 1152,
          "name": "Dellys",
          "name_ar": "دلس"
        },
        {
          "id": 1153,
          "name": "Ben Choud",
          "name_ar": "بن شود"
        },
        {
          "id": 1154,
          "name": "Afir",
          "name_ar": "أعفير"
        },
        {
          "id": 1155,
          "name": "Thenia",
          "name_ar": "الثنية"
        },
        {
          "id": 1156,
          "name": "Beni Amrane",
          "name_ar": "بني عمران"
        },
        {
          "id": 1157,
          "name": "Khemis El Khechna",
          "name_ar": "خميس الخشنة"
        },
        {
          "id": 1158,
          "name": "Ammal",
          "name_ar": "عمال"
        },
        {
          "id": 1159,
          "name": "Timezrit",
          "name_ar": "تيمزريت"
        },
        {
          "id": 1160,
          "name": "Zemmouri",
          "name_ar": "زموري"
        },
        {
          "id": 1161,
          "name": "Larbatache",
          "name_ar": "الاربعطاش"
        },
        {
          "id": 1162,
          "name": "Isser",
          "name_ar": "يسر"
        },
        {
          "id": 1163,
          "name": "Chabet El Ameur",
          "name_ar": "شعبة العامر"
        },
        {
          "id": 1164,
          "name": "Ouled Aissa",
          "name_ar": "أولاد عيسى"
        },
        {
          "id": 1165,
          "name": "Naciria",
          "name_ar": "الناصرية"
        },
        {
          "id": 1166,
          "name": "Bouzegza Keddara",
          "name_ar": "بوزقزة قدارة"
        },
        {
          "id": 1167,
          "name": "Souk El Had",
          "name_ar": "سوق الحد"
        },
        {
          "id": 1168,
          "name": "Sidi Daoud",
          "name_ar": "سيدي داود"
        },
        {
          "id": 1169,
          "name": "Baghlia",
          "name_ar": "بغلية"
        },
        {
          "id": 1170,
          "name": "Leghata",
          "name_ar": "لقاطة"
        },
        {
          "id": 1171,
          "name": "Djinet",
          "name_ar": "جنات"
        },
        {
          "id": 1172,
          "name": "Tidjelabine",
          "name_ar": "تيجلابين"
        },
        {
          "id": 1173,
          "name": "Si Mustapha",
          "name_ar": "سي مصطفى"
        },
        {
          "id": 1174,
          "name": "Ouled Hedadj",
          "name_ar": "أولاد هداج"
        },
        {
          "id": 1175,
          "name": "Ouled Moussa",
          "name_ar": "أولاد موسى"
        },
        {
          "id": 1176,
          "name": "Boumerdes",
          "name_ar": "بومرداس"
        },
        {
          "id": 1177,
          "name": "Corso",
          "name_ar": "قورصو"
        },
        {
          "id": 1178,
          "name": "Bordj Menaiel",
          "name_ar": "برج منايل"
        },
        {
          "id": 1179,
          "name": "Boudouaou",
          "name_ar": "بودواو"
        },
        {
          "id": 1180,
          "name": "Boudouaou El Bahri",
          "name_ar": "بودواو البحري"
        },
        {
          "id": 1181,
          "name": "Taourga",
          "name_ar": "تاورقة"
        },
        {
          "id": 1182,
          "name": "Hammedi",
          "name_ar": "حمادي"
        }
      ]
    },
    {
      "id": 36,
      "name": "El Tarf",
      "name_ar": "الطارف",
      "communes_count": 24,
      "communes": [
        {
          "id": 1183,
          "name": "Ain El Assel",
          "name_ar": "عين العسل"
        },
        {
          "id": 1184,
          "name": "Bougous",
          "name_ar": "بوقوس"
        },
        {
          "id": 1185,
          "name": "El Tarf",
          "name_ar": "الطارف"
        },
        {
          "id": 1186,
          "name": "Zitouna",
          "name_ar": "الزيتونة"
        },
        {
          "id": 1187,
          "name": "Besbes",
          "name_ar": "البسباس"
        },
        {
          "id": 1188,
          "name": "Ain Kerma",
          "name_ar": "عين الكرمة"
        },
        {
          "id": 1189,
          "name": "Bouhadjar",
          "name_ar": "بوحجار"
        },
        {
          "id": 1190,
          "name": "Hammam Beni Salah",
          "name_ar": "حمام بني صالح"
        },
        {
          "id": 1191,
          "name": "Oued Zitoun",
          "name_ar": "وادي الزيتون"
        },
        {
          "id": 1192,
          "name": "Ben M Hidi",
          "name_ar": "بن مهيدي"
        },
        {
          "id": 1193,
          "name": "Berrihane",
          "name_ar": "بريحان"
        },
        {
          "id": 1194,
          "name": "Chebaita Mokhtar",
          "name_ar": "شبيطة مختار"
        },
        {
          "id": 1195,
          "name": "Echatt",
          "name_ar": "الشط"
        },
        {
          "id": 1196,
          "name": "El Aioun",
          "name_ar": "العيون"
        },
        {
          "id": 1197,
          "name": "El Kala",
          "name_ar": "القالة"
        },
        {
          "id": 1198,
          "name": "Souarekh",
          "name_ar": "السوارخ"
        },
        {
          "id": 1199,
          "name": "Zerizer",
          "name_ar": "زريزر"
        },
        {
          "id": 1200,
          "name": "Bouteldja",
          "name_ar": "بوثلجة"
        },
        {
          "id": 1201,
          "name": "Chefia",
          "name_ar": "الشافية"
        },
        {
          "id": 1202,
          "name": "Lac Des Oiseaux",
          "name_ar": "بحيرة الطيور"
        },
        {
          "id": 1203,
          "name": "Chihani",
          "name_ar": "شحاني"
        },
        {
          "id": 1204,
          "name": "Raml Souk",
          "name_ar": "رمل السوق"
        },
        {
          "id": 1205,
          "name": "Asfour",
          "name_ar": "عصفور"
        },
        {
          "id": 1206,
          "name": "Drean",
          "name_ar": "الذرعـان"
        }
      ]
    },
    {
      "id": 37,
      "name": "Tindouf",
      "name_ar": "تندوف",
      "communes_count": 2,
      "communes": [
        {
          "id": 1207,
          "name": "Tindouf",
          "name_ar": "تندوف"
        },
        {
          "id": 1208,
          "name": "Oum El Assel",
          "name_ar": "أم العسل"
        }
      ]
    },
    {
      "id": 38,
      "name": "Tissemsilt",
      "name_ar": "تيسمسيلت",
      "communes_count": 22,
      "communes": [
        {
          "id": 1209,
          "name": "Khemisti",
          "name_ar": "خميستي"
        },
        {
          "id": 1210,
          "name": "Theniet El Had",
          "name_ar": "ثنية الاحد"
        },
        {
          "id": 1211,
          "name": "Ouled Bessam",
          "name_ar": "أولاد بسام"
        },
        {
          "id": 1212,
          "name": "Sidi Boutouchent",
          "name_ar": "سيدي بوتوشنت"
        },
        {
          "id": 1213,
          "name": "Tissemsilt",
          "name_ar": "تيسمسيلت"
        },
        {
          "id": 1214,
          "name": "Sidi Lantri",
          "name_ar": "سيدي العنتري"
        },
        {
          "id": 1215,
          "name": "Beni Chaib",
          "name_ar": "بني شعيب"
        },
        {
          "id": 1216,
          "name": "Beni Lahcene",
          "name_ar": "بني لحسن"
        },
        {
          "id": 1217,
          "name": "Sidi Abed",
          "name_ar": "سيدي عابد"
        },
        {
          "id": 1218,
          "name": "Sidi Slimane",
          "name_ar": "سيدي سليمان"
        },
        {
          "id": 1219,
          "name": "Boucaid",
          "name_ar": "بوقائد"
        },
        {
          "id": 1220,
          "name": "Larbaa",
          "name_ar": "الأربعاء"
        },
        {
          "id": 1221,
          "name": "Lazharia",
          "name_ar": "الأزهرية"
        },
        {
          "id": 1222,
          "name": "Lardjem",
          "name_ar": "لرجام"
        },
        {
          "id": 1223,
          "name": "Melaab",
          "name_ar": "الملعب"
        },
        {
          "id": 1224,
          "name": "Layoune",
          "name_ar": "العيون"
        },
        {
          "id": 1225,
          "name": "Tamellahet",
          "name_ar": "تملاحت"
        },
        {
          "id": 1226,
          "name": "Youssoufia",
          "name_ar": "اليوسفية"
        },
        {
          "id": 1227,
          "name": "Bordj El Emir Abdelkader",
          "name_ar": "برج الأمير عبد القادر"
        },
        {
          "id": 1228,
          "name": "Ammari",
          "name_ar": "عماري"
        },
        {
          "id": 1229,
          "name": "Maacem",
          "name_ar": "المعاصم"
        },
        {
          "id": 1230,
          "name": "Bordj Bounaama",
          "name_ar": "برج بونعامة"
        }
      ]
    },
    {
      "id": 39,
      "name": "El Oued",
      "name_ar": "الوادي",
      "communes_count": 22,
      "communes": [
        {
          "id": 1231,
          "name": "Douar El Maa",
          "name_ar": "دوار الماء"
        },
        {
          "id": 1232,
          "name": "El Ogla",
          "name_ar": "العقلة"
        },
        {
          "id": 1233,
          "name": "Magrane",
          "name_ar": "المقرن"
        },
        {
          "id": 1234,
          "name": "Sidi Aoun",
          "name_ar": "سيدي عون"
        },
        {
          "id": 1235,
          "name": "Mih Ouansa",
          "name_ar": "اميه وانسة"
        },
        {
          "id": 1236,
          "name": "Kouinine",
          "name_ar": "كوينين"
        },
        {
          "id": 1237,
          "name": "Bayadha",
          "name_ar": "البياضة"
        },
        {
          "id": 1238,
          "name": "Nakhla",
          "name_ar": "النخلة"
        },
        {
          "id": 1239,
          "name": "Robbah",
          "name_ar": "الرباح"
        },
        {
          "id": 1240,
          "name": "Guemar",
          "name_ar": "قمار"
        },
        {
          "id": 1241,
          "name": "Ben Guecha",
          "name_ar": "بن  قشة"
        },
        {
          "id": 1242,
          "name": "Ourmes",
          "name_ar": "ورماس"
        },
        {
          "id": 1243,
          "name": "Taghzout",
          "name_ar": "تغزوت"
        },
        {
          "id": 1244,
          "name": "Hamraia",
          "name_ar": "الحمراية"
        },
        {
          "id": 1245,
          "name": "Reguiba",
          "name_ar": "الرقيبة"
        },
        {
          "id": 1246,
          "name": "Debila",
          "name_ar": "الدبيلة"
        },
        {
          "id": 1247,
          "name": "Hassani Abdelkrim",
          "name_ar": "حساني عبد الكريم"
        },
        {
          "id": 1248,
          "name": "Hassi Khalifa",
          "name_ar": "حاسي خليفة"
        },
        {
          "id": 1249,
          "name": "Trifaoui",
          "name_ar": "الطريفاوي"
        },
        {
          "id": 1250,
          "name": "Taleb Larbi",
          "name_ar": "الطالب العربي"
        },
        {
          "id": 1251,
          "name": "Oued El Alenda",
          "name_ar": "وادي العلندة"
        },
        {
          "id": 1252,
          "name": "El-Oued",
          "name_ar": "الوادي"
        }
      ]
    },
    {
      "id": 40,
      "name": "Khenchela",
      "name_ar": "خنشلة",
      "communes_count": 21,
      "communes": [
        {
          "id": 1253,
          "name": "Khirane",
          "name_ar": "خيران"
        },
        {
          "id": 1254,
          "name": "Babar",
          "name_ar": "بابار"
        },
        {
          "id": 1255,
          "name": "El Mahmal",
          "name_ar": "المحمل"
        },
        {
          "id": 1256,
          "name": "Ouled Rechache",
          "name_ar": "أولاد رشاش"
        },
        {
          "id": 1257,
          "name": "Djellal",
          "name_ar": "جلال"
        },
        {
          "id": 1258,
          "name": "Yabous",
          "name_ar": "يابوس"
        },
        {
          "id": 1259,
          "name": "Khenchela",
          "name_ar": "خنشلة"
        },
        {
          "id": 1260,
          "name": "Kais",
          "name_ar": "قايس"
        },
        {
          "id": 1261,
          "name": "Chelia",
          "name_ar": "شلية"
        },
        {
          "id": 1262,
          "name": "Remila",
          "name_ar": "الرميلة"
        },
        {
          "id": 1263,
          "name": "Taouzianat",
          "name_ar": "تاوزيانت"
        },
        {
          "id": 1264,
          "name": "Baghai",
          "name_ar": "بغاي"
        },
        {
          "id": 1265,
          "name": "El Hamma",
          "name_ar": "الحامة"
        },
        {
          "id": 1266,
          "name": "Ensigha",
          "name_ar": "انسيغة"
        },
        {
          "id": 1267,
          "name": "Tamza",
          "name_ar": "طامزة"
        },
        {
          "id": 1268,
          "name": "Ain Touila",
          "name_ar": "عين الطويلة"
        },
        {
          "id": 1269,
          "name": "M'toussa",
          "name_ar": "متوسة"
        },
        {
          "id": 1270,
          "name": "Bouhmama",
          "name_ar": "بوحمامة"
        },
        {
          "id": 1271,
          "name": "El Oueldja",
          "name_ar": "الولجة"
        },
        {
          "id": 1272,
          "name": "M'sara",
          "name_ar": "مصارة"
        },
        {
          "id": 1273,
          "name": "Chechar",
          "name_ar": "ششار"
        }
      ]
    },
    {
      "id": 41,
      "name": "Souk Ahras",
      "name_ar": "سوق أهراس",
      "communes_count": 26,
      "communes": [
        {
          "id": 1274,
          "name": "Souk Ahras",
          "name_ar": "سوق أهراس"
        },
        {
          "id": 1275,
          "name": "Ain Soltane",
          "name_ar": "عين سلطان"
        },
        {
          "id": 1276,
          "name": "Sedrata",
          "name_ar": "سدراتة"
        },
        {
          "id": 1277,
          "name": "Hanencha",
          "name_ar": "الحنانشة"
        },
        {
          "id": 1278,
          "name": "Machroha",
          "name_ar": "المشروحة"
        },
        {
          "id": 1279,
          "name": "Ain Zana",
          "name_ar": "عين الزانة"
        },
        {
          "id": 1280,
          "name": "Ouled Driss",
          "name_ar": "أولاد إدريس"
        },
        {
          "id": 1281,
          "name": "Terraguelt",
          "name_ar": "ترقالت"
        },
        {
          "id": 1282,
          "name": "Oum El Adhaim",
          "name_ar": "أم العظايم"
        },
        {
          "id": 1283,
          "name": "Oued Kebrit",
          "name_ar": "وادي الكبريت"
        },
        {
          "id": 1284,
          "name": "Tiffech",
          "name_ar": "تيفاش"
        },
        {
          "id": 1285,
          "name": "Ragouba",
          "name_ar": "الراقوبة"
        },
        {
          "id": 1286,
          "name": "Drea",
          "name_ar": "الدريعة"
        },
        {
          "id": 1287,
          "name": "Taoura",
          "name_ar": "تاورة"
        },
        {
          "id": 1288,
          "name": "Zaarouria",
          "name_ar": "الزعرورية"
        },
        {
          "id": 1289,
          "name": "Haddada",
          "name_ar": "الحدادة"
        },
        {
          "id": 1290,
          "name": "Khedara",
          "name_ar": "الخضارة"
        },
        {
          "id": 1291,
          "name": "Ouled Moumen",
          "name_ar": "أولاد مومن"
        },
        {
          "id": 1292,
          "name": "Merahna",
          "name_ar": "المراهنة"
        },
        {
          "id": 1293,
          "name": "Ouillen",
          "name_ar": "ويلان"
        },
        {
          "id": 1294,
          "name": "Sidi Fredj",
          "name_ar": "سيدي فرج"
        },
        {
          "id": 1295,
          "name": "Bir Bouhouche",
          "name_ar": "بئر بوحوش"
        },
        {
          "id": 1296,
          "name": "Safel El Ouiden",
          "name_ar": "سافل الويدان"
        },
        {
          "id": 1297,
          "name": "Khemissa",
          "name_ar": "خميسة"
        },
        {
          "id": 1298,
          "name": "M'daourouche",
          "name_ar": "مداوروش"
        },
        {
          "id": 1299,
          "name": "Zouabi",
          "name_ar": "الزوابي"
        }
      ]
    },
    {
      "id": 42,
      "name": "Tipaza",
      "name_ar": "تيبازة",
      "communes_count": 28,
      "communes": [
        {
          "id": 1300,
          "name": "Hadjout",
          "name_ar": "حجوط"
        },
        {
          "id": 1301,
          "name": "Merad",
          "name_ar": "مراد"
        },
        {
          "id": 1302,
          "name": "Menaceur",
          "name_ar": "مناصر"
        },
        {
          "id": 1303,
          "name": "Aghbal",
          "name_ar": "أغبال"
        },
        {
          "id": 1304,
          "name": "Nador",
          "name_ar": "الناظور"
        },
        {
          "id": 1305,
          "name": "Sidi-Amar",
          "name_ar": "سيدي عامر"
        },
        {
          "id": 1306,
          "name": "Gouraya",
          "name_ar": "قوراية"
        },
        {
          "id": 1307,
          "name": "Messelmoun",
          "name_ar": "مسلمون"
        },
        {
          "id": 1308,
          "name": "Cherchell",
          "name_ar": "شرشال"
        },
        {
          "id": 1309,
          "name": "Hadjret Ennous",
          "name_ar": "حجرة النص"
        },
        {
          "id": 1310,
          "name": "Sidi Ghiles",
          "name_ar": "سيدي غيلاس"
        },
        {
          "id": 1311,
          "name": "Damous",
          "name_ar": "الداموس"
        },
        {
          "id": 1312,
          "name": "Larhat",
          "name_ar": "الأرهاط"
        },
        {
          "id": 1313,
          "name": "Fouka",
          "name_ar": "فوكة"
        },
        {
          "id": 1314,
          "name": "Ain Tagourait",
          "name_ar": "عين تاقورايت"
        },
        {
          "id": 1315,
          "name": "Bou Haroun",
          "name_ar": "بوهارون"
        },
        {
          "id": 1316,
          "name": "Bou Ismail",
          "name_ar": "بواسماعيل"
        },
        {
          "id": 1317,
          "name": "Khemisti",
          "name_ar": "خميستي"
        },
        {
          "id": 1318,
          "name": "Ahmer El Ain",
          "name_ar": "أحمر العين"
        },
        {
          "id": 1319,
          "name": "Bourkika",
          "name_ar": "بورقيقة"
        },
        {
          "id": 1320,
          "name": "Douaouda",
          "name_ar": "دواودة"
        },
        {
          "id": 1321,
          "name": "Sidi Rached",
          "name_ar": "سيدي راشد"
        },
        {
          "id": 1322,
          "name": "Attatba",
          "name_ar": "الحطاطبة"
        },
        {
          "id": 1323,
          "name": "Chaiba",
          "name_ar": "الشعيبة"
        },
        {
          "id": 1324,
          "name": "Kolea",
          "name_ar": "القليعة"
        },
        {
          "id": 1325,
          "name": "Sidi Semiane",
          "name_ar": "سيدي سميان"
        },
        {
          "id": 1326,
          "name": "Tipaza",
          "name_ar": "تيبازة"
        },
        {
          "id": 1327,
          "name": "Beni Mileuk",
          "name_ar": "بني ميلك"
        }
      ]
    },
    {
      "id": 43,
      "name": "Mila",
      "name_ar": "ميلة",
      "communes_count": 32,
      "communes": [
        {
          "id": 1328,
          "name": "El Mechira",
          "name_ar": "مشيرة"
        },
        {
          "id": 1329,
          "name": "El Ayadi Barbes",
          "name_ar": "العياضي برباس"
        },
        {
          "id": 1330,
          "name": "Ain Beida Harriche",
          "name_ar": " عين البيضاء أحريش"
        },
        {
          "id": 1331,
          "name": "Tassala Lematai",
          "name_ar": "تسالة لمطاعي"
        },
        {
          "id": 1332,
          "name": "Terrai Bainen",
          "name_ar": "ترعي باينان"
        },
        {
          "id": 1333,
          "name": "Amira Arres",
          "name_ar": "اعميرة اراس"
        },
        {
          "id": 1334,
          "name": "Tassadane Haddada",
          "name_ar": "تسدان حدادة"
        },
        {
          "id": 1335,
          "name": "Minar Zarza",
          "name_ar": "مينار زارزة"
        },
        {
          "id": 1336,
          "name": "Sidi Merouane",
          "name_ar": "سيدي مروان"
        },
        {
          "id": 1337,
          "name": "Chigara",
          "name_ar": "الشيقارة"
        },
        {
          "id": 1338,
          "name": "Hamala",
          "name_ar": "حمالة"
        },
        {
          "id": 1339,
          "name": "Grarem Gouga",
          "name_ar": "القرارم قوقة"
        },
        {
          "id": 1340,
          "name": "Tiberguent",
          "name_ar": "تيبرقنت"
        },
        {
          "id": 1341,
          "name": "Rouached",
          "name_ar": "الرواشد"
        },
        {
          "id": 1342,
          "name": "Derrahi Bousselah",
          "name_ar": "دراحي بوصلاح"
        },
        {
          "id": 1343,
          "name": "Zeghaia",
          "name_ar": "زغاية"
        },
        {
          "id": 1344,
          "name": "Oued Endja",
          "name_ar": "وادي النجاء"
        },
        {
          "id": 1345,
          "name": "Ahmed Rachedi",
          "name_ar": "أحمد راشدي"
        },
        {
          "id": 1346,
          "name": "Tadjenanet",
          "name_ar": "تاجنانت"
        },
        {
          "id": 1347,
          "name": "Ain Mellouk",
          "name_ar": "عين الملوك"
        },
        {
          "id": 1348,
          "name": "Ouled Khalouf",
          "name_ar": "أولاد اخلوف"
        },
        {
          "id": 1349,
          "name": "Benyahia Abderrahmane",
          "name_ar": "بن يحي عبد الرحمن"
        },
        {
          "id": 1350,
          "name": "Teleghma",
          "name_ar": "التلاغمة"
        },
        {
          "id": 1351,
          "name": "Oued Seguen",
          "name_ar": "وادي سقان"
        },
        {
          "id": 1352,
          "name": "Oued Athmenia",
          "name_ar": "وادي العثمانية"
        },
        {
          "id": 1353,
          "name": "Ain Tine",
          "name_ar": "عين التين"
        },
        {
          "id": 1354,
          "name": "Chelghoum Laid",
          "name_ar": "شلغوم العيد"
        },
        {
          "id": 1355,
          "name": "Yahia Beniguecha",
          "name_ar": "يحي بني قشة"
        },
        {
          "id": 1356,
          "name": "Ferdjioua",
          "name_ar": "فرجيوة"
        },
        {
          "id": 1357,
          "name": "Sidi Khelifa",
          "name_ar": "سيدي خليفة"
        },
        {
          "id": 1358,
          "name": "Mila",
          "name_ar": "ميلة"
        },
        {
          "id": 1359,
          "name": "Bouhatem",
          "name_ar": "بوحاتم"
        }
      ]
    },
    {
      "id": 44,
      "name": "Ain Defla",
      "name_ar": "عين الدفلى",
      "communes_count": 36,
      "communes": [
        {
          "id": 1360,
          "name": "Khemis-Miliana",
          "name_ar": "خميس مليانة"
        },
        {
          "id": 1361,
          "name": "Sidi-Lakhdar",
          "name_ar": "سيدي الأخضر"
        },
        {
          "id": 1362,
          "name": "Ain-Benian",
          "name_ar": "عين البنيان"
        },
        {
          "id": 1363,
          "name": "Ain-Torki",
          "name_ar": "عين التركي"
        },
        {
          "id": 1364,
          "name": "Hammam-Righa",
          "name_ar": "حمام ريغة"
        },
        {
          "id": 1365,
          "name": "Bourached",
          "name_ar": "بوراشد"
        },
        {
          "id": 1366,
          "name": "Hoceinia",
          "name_ar": "الحسينية"
        },
        {
          "id": 1367,
          "name": "Djelida",
          "name_ar": "جليدة"
        },
        {
          "id": 1368,
          "name": "Arib",
          "name_ar": "عريب"
        },
        {
          "id": 1369,
          "name": "Djemaa Ouled Cheikh",
          "name_ar": "جمعة أولاد الشيخ"
        },
        {
          "id": 1370,
          "name": "El-Amra",
          "name_ar": "العامرة"
        },
        {
          "id": 1371,
          "name": "El-Attaf",
          "name_ar": "العطاف"
        },
        {
          "id": 1372,
          "name": "Tiberkanine",
          "name_ar": "تبركانين"
        },
        {
          "id": 1373,
          "name": "Ain-Bouyahia",
          "name_ar": "عين بويحيى"
        },
        {
          "id": 1374,
          "name": "El-Abadia",
          "name_ar": "العبادية"
        },
        {
          "id": 1375,
          "name": "Tacheta Zegagha",
          "name_ar": "تاشتة زقاغة"
        },
        {
          "id": 1376,
          "name": "Birbouche",
          "name_ar": "بربوش"
        },
        {
          "id": 1377,
          "name": "Djendel",
          "name_ar": "جندل"
        },
        {
          "id": 1378,
          "name": "Ben Allal",
          "name_ar": "بن علال"
        },
        {
          "id": 1379,
          "name": "Oued Chorfa",
          "name_ar": "وادي الشرفاء"
        },
        {
          "id": 1380,
          "name": "Boumedfaa",
          "name_ar": "بومدفع"
        },
        {
          "id": 1381,
          "name": "Ain-Lechiakh",
          "name_ar": "عين الاشياخ"
        },
        {
          "id": 1382,
          "name": "Ain-Soltane",
          "name_ar": "عين السلطان"
        },
        {
          "id": 1383,
          "name": "Oued Djemaa",
          "name_ar": "واد الجمعة"
        },
        {
          "id": 1384,
          "name": "El-Maine",
          "name_ar": "الماين"
        },
        {
          "id": 1385,
          "name": "Rouina",
          "name_ar": "الروينة"
        },
        {
          "id": 1386,
          "name": "Zeddine",
          "name_ar": "زدين"
        },
        {
          "id": 1387,
          "name": "Bir-Ould-Khelifa",
          "name_ar": "بئر ولد خليفة"
        },
        {
          "id": 1388,
          "name": "Bordj-Emir-Khaled",
          "name_ar": "برج الأمير خالد"
        },
        {
          "id": 1389,
          "name": "Tarik-Ibn-Ziad",
          "name_ar": "طارق بن زياد"
        },
        {
          "id": 1390,
          "name": "Bathia",
          "name_ar": "بطحية"
        },
        {
          "id": 1391,
          "name": "Belaas",
          "name_ar": "بلعاص"
        },
        {
          "id": 1392,
          "name": "Hassania",
          "name_ar": "الحسانية"
        },
        {
          "id": 1393,
          "name": "Ain-Defla",
          "name_ar": "عين الدفلى"
        },
        {
          "id": 1394,
          "name": "Miliana",
          "name_ar": "مليانة"
        },
        {
          "id": 1395,
          "name": "Mekhatria",
          "name_ar": "المخاطرية"
        }
      ]
    },
    {
      "id": 45,
      "name": "Naama",
      "name_ar": "النعامة",
      "communes_count": 12,
      "communes": [
        {
          "id": 1396,
          "name": "Tiout",
          "name_ar": "تيوت"
        },
        {
          "id": 1397,
          "name": "Moghrar",
          "name_ar": "مغرار"
        },
        {
          "id": 1398,
          "name": "Asla",
          "name_ar": "عسلة"
        },
        {
          "id": 1399,
          "name": "Kasdir",
          "name_ar": "القصدير"
        },
        {
          "id": 1400,
          "name": "Makmen Ben Amar",
          "name_ar": "مكمن بن عمار"
        },
        {
          "id": 1401,
          "name": "Ain Sefra",
          "name_ar": "عين الصفراء"
        },
        {
          "id": 1402,
          "name": "Mecheria",
          "name_ar": "المشرية"
        },
        {
          "id": 1403,
          "name": "El Biodh",
          "name_ar": "البيوض"
        },
        {
          "id": 1404,
          "name": "Ain Ben Khelil",
          "name_ar": "عين بن خليل"
        },
        {
          "id": 1405,
          "name": "Naama",
          "name_ar": "النعامة"
        },
        {
          "id": 1406,
          "name": "Djenienne Bourezg",
          "name_ar": "جنين بورزق"
        },
        {
          "id": 1407,
          "name": "Sfissifa",
          "name_ar": "سفيسيفة"
        }
      ]
    },
    {
      "id": 46,
      "name": "Ain Temouchent",
      "name_ar": "عين تموشنت",
      "communes_count": 28,
      "communes": [
        {
          "id": 1408,
          "name": "Sidi Boumediene",
          "name_ar": "سيدي بومدين"
        },
        {
          "id": 1409,
          "name": "Tamzoura",
          "name_ar": "تامزورة"
        },
        {
          "id": 1410,
          "name": "Chaabat El Ham",
          "name_ar": "شعبة اللحم"
        },
        {
          "id": 1411,
          "name": "El Maleh",
          "name_ar": "المالح"
        },
        {
          "id": 1412,
          "name": "Ouled Kihal",
          "name_ar": "أولاد الكيحل"
        },
        {
          "id": 1413,
          "name": "Chentouf",
          "name_ar": "شنتوف"
        },
        {
          "id": 1414,
          "name": "Terga",
          "name_ar": "تارقة"
        },
        {
          "id": 1415,
          "name": "Oued Sebbah",
          "name_ar": "وادي الصباح"
        },
        {
          "id": 1416,
          "name": "El Amria",
          "name_ar": "العامرية"
        },
        {
          "id": 1417,
          "name": "Hassi El Ghella",
          "name_ar": "حاسي الغلة"
        },
        {
          "id": 1418,
          "name": "Ouled Boudjemaa",
          "name_ar": "أولاد بوجمعة"
        },
        {
          "id": 1419,
          "name": "Aghlal",
          "name_ar": "أغلال"
        },
        {
          "id": 1420,
          "name": "Ain Kihal",
          "name_ar": "عين الكيحل"
        },
        {
          "id": 1421,
          "name": "Ain Tolba",
          "name_ar": "عين الطلبة"
        },
        {
          "id": 1422,
          "name": "Aoubellil",
          "name_ar": "عقب الليل"
        },
        {
          "id": 1423,
          "name": "Beni Saf",
          "name_ar": "بني صاف"
        },
        {
          "id": 1424,
          "name": "Hassasna",
          "name_ar": "الحساسنة"
        },
        {
          "id": 1425,
          "name": "Emir Abdelkader",
          "name_ar": "الأمير عبد القادر"
        },
        {
          "id": 1426,
          "name": "Sidi Safi",
          "name_ar": "سيدي صافي"
        },
        {
          "id": 1427,
          "name": "Oulhaca El Gheraba",
          "name_ar": "ولهاصة الغرابة"
        },
        {
          "id": 1428,
          "name": "Sidi Ouriache",
          "name_ar": "سيدي ورياش"
        },
        {
          "id": 1429,
          "name": "Ain El Arbaa",
          "name_ar": "عين الأربعاء"
        },
        {
          "id": 1430,
          "name": "El Messaid",
          "name_ar": "المساعيد"
        },
        {
          "id": 1431,
          "name": "Oued Berkeche",
          "name_ar": "وادي برقش"
        },
        {
          "id": 1432,
          "name": "Sidi Ben Adda",
          "name_ar": "سيدي بن عدة"
        },
        {
          "id": 1433,
          "name": "Ain Temouchent",
          "name_ar": "عين تموشنت"
        },
        {
          "id": 1434,
          "name": "Bouzedjar",
          "name_ar": "بوزجار"
        },
        {
          "id": 1435,
          "name": "Hammam Bou Hadjar",
          "name_ar": "حمام بوحجر"
        }
      ]
    },
    {
      "id": 47,
      "name": "Ghardaia",
      "name_ar": "غرداية",
      "communes_count": 10,
      "communes": [
        {
          "id": 1436,
          "name": "Dhayet Bendhahoua",
          "name_ar": "ضاية بن ضحوة"
        },
        {
          "id": 1437,
          "name": "Mansoura",
          "name_ar": "المنصورة"
        },
        {
          "id": 1438,
          "name": "El Atteuf",
          "name_ar": "العطف"
        },
        {
          "id": 1439,
          "name": "Bounoura",
          "name_ar": "بونورة"
        },
        {
          "id": 1440,
          "name": "Zelfana",
          "name_ar": "زلفانة"
        },
        {
          "id": 1441,
          "name": "El Guerrara",
          "name_ar": "القرارة"
        },
        {
          "id": 1442,
          "name": "Sebseb",
          "name_ar": "سبسب"
        },
        {
          "id": 1443,
          "name": "Metlili",
          "name_ar": "متليلي"
        },
        {
          "id": 1444,
          "name": "Berriane",
          "name_ar": "بريان"
        },
        {
          "id": 1445,
          "name": "Ghardaia",
          "name_ar": "غرداية"
        }
      ]
    },
    {
      "id": 48,
      "name": "Relizane",
      "name_ar": "غليزان",
      "communes_count": 38,
      "communes": [
        {
          "id": 1446,
          "name": "El-Guettar",
          "name_ar": "القطار"
        },
        {
          "id": 1447,
          "name": "Ouled Aiche",
          "name_ar": "أولاد يعيش"
        },
        {
          "id": 1448,
          "name": "Beni Dergoun",
          "name_ar": "بني درقن"
        },
        {
          "id": 1449,
          "name": "Dar Ben Abdelah",
          "name_ar": "دار بن عبد الله"
        },
        {
          "id": 1450,
          "name": "Zemmoura",
          "name_ar": "زمورة"
        },
        {
          "id": 1451,
          "name": "Djidiouia",
          "name_ar": "جديوية"
        },
        {
          "id": 1452,
          "name": "Hamri",
          "name_ar": "حمري"
        },
        {
          "id": 1453,
          "name": "Belaassel Bouzagza",
          "name_ar": "بلعسل بوزقزة"
        },
        {
          "id": 1454,
          "name": "El-Matmar",
          "name_ar": "المطمر"
        },
        {
          "id": 1455,
          "name": "Sidi Khettab",
          "name_ar": "سيدي  خطاب"
        },
        {
          "id": 1456,
          "name": "Sidi M'hamed Benaouda",
          "name_ar": "سيدي امحمد بن عودة"
        },
        {
          "id": 1457,
          "name": "Ain-Tarek",
          "name_ar": "عين طارق"
        },
        {
          "id": 1458,
          "name": "Had Echkalla",
          "name_ar": "حد الشكالة"
        },
        {
          "id": 1459,
          "name": "El Ouldja",
          "name_ar": "الولجة"
        },
        {
          "id": 1460,
          "name": "Mazouna",
          "name_ar": "مازونة"
        },
        {
          "id": 1461,
          "name": "Ain Rahma",
          "name_ar": "عين الرحمة"
        },
        {
          "id": 1462,
          "name": "Kalaa",
          "name_ar": "القلعة"
        },
        {
          "id": 1463,
          "name": "Sidi Saada",
          "name_ar": "سيدي سعادة"
        },
        {
          "id": 1464,
          "name": "Yellel",
          "name_ar": "يلل"
        },
        {
          "id": 1465,
          "name": "Souk El Had",
          "name_ar": "سوق الحد"
        },
        {
          "id": 1466,
          "name": "Mendes",
          "name_ar": "منداس"
        },
        {
          "id": 1467,
          "name": "Oued Essalem",
          "name_ar": "وادي السلام"
        },
        {
          "id": 1468,
          "name": "Sidi Lazreg",
          "name_ar": "سيدي لزرق"
        },
        {
          "id": 1469,
          "name": "Ammi Moussa",
          "name_ar": "عمي موسى"
        },
        {
          "id": 1470,
          "name": "Ouarizane",
          "name_ar": "واريزان"
        },
        {
          "id": 1471,
          "name": "Merdja Sidi Abed",
          "name_ar": "مرجة سيدي عابد"
        },
        {
          "id": 1472,
          "name": "Ouled Sidi Mihoub",
          "name_ar": "أولاد سيدي الميهوب"
        },
        {
          "id": 1473,
          "name": "Bendaoud",
          "name_ar": "بن داود"
        },
        {
          "id": 1474,
          "name": "Oued-Rhiou",
          "name_ar": "وادي رهيو"
        },
        {
          "id": 1475,
          "name": "El Hassi",
          "name_ar": "الحاسي"
        },
        {
          "id": 1476,
          "name": "Sidi M'hamed Benali",
          "name_ar": "سيدي أمحمد بن علي"
        },
        {
          "id": 1477,
          "name": "Mediouna",
          "name_ar": "مديونة"
        },
        {
          "id": 1478,
          "name": "Beni Zentis",
          "name_ar": "بني زنطيس"
        },
        {
          "id": 1479,
          "name": "Oued El Djemaa",
          "name_ar": "وادي الجمعة"
        },
        {
          "id": 1480,
          "name": "Lahlef",
          "name_ar": "لحلاف"
        },
        {
          "id": 1481,
          "name": "Relizane",
          "name_ar": "غليزان"
        },
        {
          "id": 1482,
          "name": "El H'madna",
          "name_ar": "الحمادنة"
        },
        {
          "id": 1483,
          "name": "Ramka",
          "name_ar": "الرمكة"
        }
      ]
    },
    {
      "id": 49,
      "name": "Timimoun",
      "name_ar": "تيميمون",
      "communes_count": 10,
      "communes": [
        {
          "id": 1484,
          "name": "Tinerkouk",
          "name_ar": "تنركوك"
        },
        {
          "id": 1485,
          "name": "Timimoun",
          "name_ar": "تيميمون"
        },
        {
          "id": 1486,
          "name": "Ouled Said",
          "name_ar": "أولاد السعيد"
        },
        {
          "id": 1487,
          "name": "Metarfa",
          "name_ar": "المطارفة"
        },
        {
          "id": 1488,
          "name": "Talmine",
          "name_ar": "طالمين"
        },
        {
          "id": 1489,
          "name": "Ouled Aissa",
          "name_ar": "أولاد عيسى"
        },
        {
          "id": 1490,
          "name": "Charouine",
          "name_ar": "شروين"
        },
        {
          "id": 1491,
          "name": "Aougrout",
          "name_ar": "أوقروت"
        },
        {
          "id": 1492,
          "name": "Deldoul",
          "name_ar": "دلدول"
        },
        {
          "id": 1493,
          "name": "Ksar Kaddour",
          "name_ar": "قصر قدور"
        }
      ]
    },
    {
      "id": 50,
      "name": "Bordj Badji Mokhtar",
      "name_ar": "برج باجي مختار",
      "communes_count": 2,
      "communes": [
        {
          "id": 1494,
          "name": "Timiaouine",
          "name_ar": "تيمياوين"
        },
        {
          "id": 1495,
          "name": "Bordj Badji Mokhtar",
          "name_ar": "برج باجي مختار"
        }
      ]
    },
    {
      "id": 51,
      "name": "Ouled Djellal",
      "name_ar": "أولاد جلال",
      "communes_count": 6,
      "communes": [
        {
          "id": 1496,
          "name": "Ras El Miad",
          "name_ar": "رأس الميعاد"
        },
        {
          "id": 1497,
          "name": "Besbes",
          "name_ar": "بسباس"
        },
        {
          "id": 1498,
          "name": "Sidi Khaled",
          "name_ar": "سيدي  خالد"
        },
        {
          "id": 1499,
          "name": "Doucen",
          "name_ar": "الدوسن"
        },
        {
          "id": 1500,
          "name": "Chaiba",
          "name_ar": "الشعيبة"
        },
        {
          "id": 1501,
          "name": "Ouled Djellal",
          "name_ar": "أولاد جلال"
        }
      ]
    },
    {
      "id": 52,
      "name": "Beni Abbes",
      "name_ar": "بني عباس",
      "communes_count": 9,
      "communes": [
        {
          "id": 1502,
          "name": "Beni-Abbes",
          "name_ar": "بني عباس"
        },
        {
          "id": 1503,
          "name": "Tamtert",
          "name_ar": "تامترت"
        },
        {
          "id": 1504,
          "name": "Igli",
          "name_ar": "إقلي"
        },
        {
          "id": 1505,
          "name": "El Ouata",
          "name_ar": "الواتة"
        },
        {
          "id": 1506,
          "name": "Ouled-Khodeir",
          "name_ar": "أولاد خضير"
        },
        {
          "id": 1507,
          "name": "Kerzaz",
          "name_ar": "كرزاز"
        },
        {
          "id": 1508,
          "name": "Timoudi",
          "name_ar": "تيمودي"
        },
        {
          "id": 1509,
          "name": "Ksabi",
          "name_ar": "القصابي"
        },
        {
          "id": 1510,
          "name": "Beni-Ikhlef",
          "name_ar": "بن يخلف"
        }
      ]
    },
    {
      "id": 53,
      "name": "In Salah",
      "name_ar": "عين صالح",
      "communes_count": 3,
      "communes": [
        {
          "id": 1511,
          "name": "Inghar",
          "name_ar": "إينغر"
        },
        {
          "id": 1512,
          "name": "Ain Salah",
          "name_ar": "عين صالح"
        },
        {
          "id": 1513,
          "name": "Foggaret Ezzoua",
          "name_ar": "فقارة الزوى"
        }
      ]
    },
    {
      "id": 54,
      "name": "In Guezzam",
      "name_ar": "عين قزام",
      "communes_count": 2,
      "communes": [
        {
          "id": 1514,
          "name": "Tin Zouatine",
          "name_ar": "تين زواتين"
        },
        {
          "id": 1515,
          "name": "Ain Guezzam",
          "name_ar": "عين قزام"
        }
      ]
    },
    {
      "id": 55,
      "name": "Touggourt",
      "name_ar": "تقرت",
      "communes_count": 13,
      "communes": [
        {
          "id": 1516,
          "name": "Temacine",
          "name_ar": "تماسين"
        },
        {
          "id": 1517,
          "name": "Sidi Slimane",
          "name_ar": "سيدي سليمان"
        },
        {
          "id": 1518,
          "name": "Megarine",
          "name_ar": "المقارين"
        },
        {
          "id": 1519,
          "name": "Nezla",
          "name_ar": "النزلة"
        },
        {
          "id": 1520,
          "name": "Blidet Amor",
          "name_ar": "بلدة اعمر"
        },
        {
          "id": 1521,
          "name": "Tebesbest",
          "name_ar": "تبسبست"
        },
        {
          "id": 1522,
          "name": "Touggourt",
          "name_ar": "تقرت"
        },
        {
          "id": 1523,
          "name": "Taibet",
          "name_ar": "الطيبات"
        },
        {
          "id": 1524,
          "name": "El Alia",
          "name_ar": "العالية"
        },
        {
          "id": 1525,
          "name": "El-Hadjira",
          "name_ar": "الحجيرة"
        },
        {
          "id": 1526,
          "name": "Benaceur",
          "name_ar": "بن ناصر"
        },
        {
          "id": 1527,
          "name": "M'naguer",
          "name_ar": "المنقر"
        },
        {
          "id": 1528,
          "name": "Zaouia El Abidia",
          "name_ar": "الزاوية العابدية"
        }
      ]
    },
    {
      "id": 56,
      "name": "Djanet",
      "name_ar": "جانت",
      "communes_count": 2,
      "communes": [
        {
          "id": 1529,
          "name": "Djanet",
          "name_ar": "جانت"
        },
        {
          "id": 1530,
          "name": "Bordj El Haouass",
          "name_ar": "برج الحواس"
        }
      ]
    },
    {
      "id": 57,
      "name": "El M'Ghair",
      "name_ar": "المغير",
      "communes_count": 8,
      "communes": [
        {
          "id": 1531,
          "name": "Oum Touyour",
          "name_ar": "أم الطيور"
        },
        {
          "id": 1532,
          "name": "Sidi Amrane",
          "name_ar": "سيدي عمران"
        },
        {
          "id": 1533,
          "name": "M'rara",
          "name_ar": "المرارة"
        },
        {
          "id": 1534,
          "name": "Djamaa",
          "name_ar": "جامعة"
        },
        {
          "id": 1535,
          "name": "Tenedla",
          "name_ar": "تندلة"
        },
        {
          "id": 1536,
          "name": "El-M'ghaier",
          "name_ar": "المغير"
        },
        {
          "id": 1537,
          "name": "Still",
          "name_ar": "سطيل"
        },
        {
          "id": 1538,
          "name": "Sidi Khelil",
          "name_ar": "سيدي خليل"
        }
      ]
    },
    {
      "id": 58,
      "name": "El Meniaa",
      "name_ar": "المنيعة",
      "communes_count": 3,
      "communes": [
        {
          "id": 1539,
          "name": "El Meniaa",
          "name_ar": "المنيعة"
        },
        {
          "id": 1540,
          "name": "Hassi Gara",
          "name_ar": "حاسي القارة"
        },
        {
          "id": 1541,
          "name": "Hassi Fehal",
          "name_ar": "حاسي الفحل"
        }
      ]
    },
    {
      "id": 59,
      "name": "Aflou",
      "name_ar": "أفلو",
      "communes_count": 12,
      "communes": [
        {
          "id": 52,
          "name": "El Beidha",
          "name_ar": "البيضاء"
        },
        {
          "id": 53,
          "name": "Gueltat Sidi Saad",
          "name_ar": "قلتة سيدي سعد"
        },
        {
          "id": 54,
          "name": "Brida",
          "name_ar": "بريدة"
        },
        {
          "id": 55,
          "name": "Ain Sidi Ali",
          "name_ar": "عين سيدي علي"
        },
        {
          "id": 57,
          "name": "Hadj Mechri",
          "name_ar": "الحاج مشري"
        },
        {
          "id": 58,
          "name": "Taouiala",
          "name_ar": "تاويالة"
        },
        {
          "id": 59,
          "name": "El Ghicha",
          "name_ar": "الغيشة"
        },
        {
          "id": 61,
          "name": "Sebgag",
          "name_ar": "سبقاق"
        },
        {
          "id": 62,
          "name": "Sidi Bouzid",
          "name_ar": "سيدي بوزيد"
        },
        {
          "id": 63,
          "name": "Oued Morra",
          "name_ar": "وادي مرة"
        },
        {
          "id": 65,
          "name": "Oued M'zi",
          "name_ar": "وادي مزي"
        },
        {
          "id": 75,
          "name": "Aflou",
          "name_ar": "أفلو"
        }
      ]
    },
    {
      "id": 60,
      "name": "El Abiodh Sidi Cheikh",
      "name_ar": "الأبيض سيدي الشيخ",
      "communes_count": 7,
      "communes": [
        {
          "id": 1106,
          "name": "Brezina",
          "name_ar": "بريزينة"
        },
        {
          "id": 1107,
          "name": "Ghassoul",
          "name_ar": "الغاسول"
        },
        {
          "id": 1108,
          "name": "Labiodh Sidi Cheikh",
          "name_ar": "الأبيض سيدي الشيخ"
        },
        {
          "id": 1109,
          "name": "Boussemghoun",
          "name_ar": "بوسمغون"
        },
        {
          "id": 1110,
          "name": "Cheguig",
          "name_ar": "الشقيق"
        },
        {
          "id": 1111,
          "name": "Chellala",
          "name_ar": "شلالة"
        },
        {
          "id": 1112,
          "name": "Arbaouat",
          "name_ar": "اربوات"
        }
      ]
    },
    {
      "id": 61,
      "name": "El Aricha",
      "name_ar": "العريشة",
      "communes_count": 4,
      "communes": [
        {
          "id": 370,
          "name": "Sidi Djillali",
          "name_ar": "سيدي الجيلالي"
        },
        {
          "id": 371,
          "name": "Bouihi",
          "name_ar": "البويهي"
        },
        {
          "id": 378,
          "name": "El Gor",
          "name_ar": "القور"
        },
        {
          "id": 379,
          "name": "El Aricha",
          "name_ar": "العريشة"
        }
      ]
    },
    {
      "id": 62,
      "name": "El Kantara",
      "name_ar": "القنطرة",
      "communes_count": 5,
      "communes": [
        {
          "id": 222,
          "name": "Djemorah",
          "name_ar": "جمورة"
        },
        {
          "id": 223,
          "name": "Branis",
          "name_ar": "برانيس"
        },
        {
          "id": 224,
          "name": "El Outaya",
          "name_ar": "الوطاية"
        },
        {
          "id": 225,
          "name": "El Kantara",
          "name_ar": "القنطرة"
        },
        {
          "id": 227,
          "name": "Ain Zaatout",
          "name_ar": "عين زعطوط"
        }
      ]
    },
    {
      "id": 63,
      "name": "Barika",
      "name_ar": "بريكة",
      "communes_count": 8,
      "communes": [
        {
          "id": 142,
          "name": "Seggana",
          "name_ar": "سقانة"
        },
        {
          "id": 143,
          "name": "Tilatou",
          "name_ar": "تيلاطو"
        },
        {
          "id": 151,
          "name": "Barika",
          "name_ar": "بريكة"
        },
        {
          "id": 152,
          "name": "Bitam",
          "name_ar": "بيطام"
        },
        {
          "id": 153,
          "name": "M Doukal",
          "name_ar": "إمدوكل"
        },
        {
          "id": 154,
          "name": "Azil Abedelkader",
          "name_ar": "عزيل عبد القادر"
        },
        {
          "id": 155,
          "name": "Djezzar",
          "name_ar": "الجزار"
        },
        {
          "id": 156,
          "name": "Ouled Ammar",
          "name_ar": "أولاد عمار"
        }
      ]
    },
    {
      "id": 64,
      "name": "Bou Saada",
      "name_ar": "بوسعادة",
      "communes_count": 23,
      "communes": [
        {
          "id": 974,
          "name": "Sidi Hadjeres",
          "name_ar": "سيدي هجرس"
        },
        {
          "id": 975,
          "name": "Bou Saada",
          "name_ar": "بوسعادة"
        },
        {
          "id": 976,
          "name": "El Hamel",
          "name_ar": "الهامل"
        },
        {
          "id": 977,
          "name": "Oulteme",
          "name_ar": "ولتام"
        },
        {
          "id": 978,
          "name": "Benzouh",
          "name_ar": "بن زوه"
        },
        {
          "id": 979,
          "name": "Ouled Sidi Brahim",
          "name_ar": "أولاد سيدي ابراهيم"
        },
        {
          "id": 980,
          "name": "Sidi Ameur",
          "name_ar": "سيدي عامر"
        },
        {
          "id": 981,
          "name": "Tamsa",
          "name_ar": "تامسة"
        },
        {
          "id": 982,
          "name": "Ben Srour",
          "name_ar": "بن سرور"
        },
        {
          "id": 983,
          "name": "Mohamed Boudiaf",
          "name_ar": "محمد بوضياف"
        },
        {
          "id": 984,
          "name": "Ouled Slimane",
          "name_ar": "أولاد سليمان"
        },
        {
          "id": 985,
          "name": "Zarzour",
          "name_ar": "زرزور"
        },
        {
          "id": 986,
          "name": "Ain El Melh",
          "name_ar": "عين الملح"
        },
        {
          "id": 987,
          "name": "Ain Fares",
          "name_ar": "عين فارس"
        },
        {
          "id": 988,
          "name": "Ain Rich",
          "name_ar": "عين الريش"
        },
        {
          "id": 989,
          "name": "Bir Foda",
          "name_ar": "بئر فضة"
        },
        {
          "id": 990,
          "name": "Sidi M'hamed",
          "name_ar": "سيدي امحمد"
        },
        {
          "id": 991,
          "name": "Medjedel",
          "name_ar": "امجدل"
        },
        {
          "id": 992,
          "name": "Menaa",
          "name_ar": "مناعة"
        },
        {
          "id": 994,
          "name": "Slim",
          "name_ar": "سليم"
        },
        {
          "id": 1000,
          "name": "Maadid",
          "name_ar": "المعاضيد"
        },
        {
          "id": 1001,
          "name": "M'tarfa",
          "name_ar": "المطارفة"
        },
        {
          "id": 1002,
          "name": "Maarif",
          "name_ar": "معاريف"
        }
      ]
    },
    {
      "id": 65,
      "name": "Bir El Ater",
      "name_ar": "بير العاتر",
      "communes_count": 4,
      "communes": [
        {
          "id": 334,
          "name": "Ferkane",
          "name_ar": "فركان"
        },
        {
          "id": 335,
          "name": "Negrine",
          "name_ar": "نقرين"
        },
        {
          "id": 355,
          "name": "El Ogla El Malha",
          "name_ar": "العقلة المالحة"
        },
        {
          "id": 356,
          "name": "Bir-El-Ater",
          "name_ar": "بئر العاتر"
        }
      ]
    },
    {
      "id": 66,
      "name": "Ksar El Boukhari",
      "name_ar": "قصر البخاري",
      "communes_count": 21,
      "communes": [
        {
          "id": 867,
          "name": "Ouled Hellal",
          "name_ar": "أولاد هلال"
        },
        {
          "id": 869,
          "name": "Ksar El Boukhari",
          "name_ar": "قصر البخاري"
        },
        {
          "id": 870,
          "name": "M'fatha",
          "name_ar": "مفاتحة"
        },
        {
          "id": 871,
          "name": "Saneg",
          "name_ar": "السانق"
        },
        {
          "id": 875,
          "name": "Bouaiche",
          "name_ar": "بوعيش"
        },
        {
          "id": 876,
          "name": "Boughzoul",
          "name_ar": "بوغزول"
        },
        {
          "id": 877,
          "name": "Chabounia",
          "name_ar": "الشهبونية"
        },
        {
          "id": 897,
          "name": "Boghar",
          "name_ar": "بوغار"
        },
        {
          "id": 906,
          "name": "Ain Boucif",
          "name_ar": "عين بوسيف"
        },
        {
          "id": 907,
          "name": "El Ouinet",
          "name_ar": "العوينات"
        },
        {
          "id": 908,
          "name": "Kef Lakhdar",
          "name_ar": "الكاف الاخضر"
        },
        {
          "id": 909,
          "name": "Ouled Emaaraf",
          "name_ar": "أولاد امعرف"
        },
        {
          "id": 910,
          "name": "Sidi Demed",
          "name_ar": "سيدي دامد"
        },
        {
          "id": 917,
          "name": "Ain Ouksir",
          "name_ar": "عين اقصير"
        },
        {
          "id": 918,
          "name": "Chelalet El Adhaoura",
          "name_ar": "شلالة العذاورة"
        },
        {
          "id": 919,
          "name": "Cheniguel",
          "name_ar": "شنيقل"
        },
        {
          "id": 920,
          "name": "Tafraout",
          "name_ar": "تفراوت"
        },
        {
          "id": 924,
          "name": "Aziz",
          "name_ar": "عزيز"
        },
        {
          "id": 925,
          "name": "Derrag",
          "name_ar": "دراق"
        },
        {
          "id": 926,
          "name": "Oum El Djellil",
          "name_ar": "أم الجليل"
        },
        {
          "id": 930,
          "name": "Ouled Antar",
          "name_ar": "أولاد عنتر"
        }
      ]
    },
    {
      "id": 67,
      "name": "Ksar Chellala",
      "name_ar": "قصر الشلالة",
      "communes_count": 6,
      "communes": [
        {
          "id": 431,
          "name": "Ksar Chellala",
          "name_ar": "قصر الشلالة"
        },
        {
          "id": 433,
          "name": "Serghine",
          "name_ar": "سرغين"
        },
        {
          "id": 434,
          "name": "Zmalet El Emir Abdelkade",
          "name_ar": "زمالة  الأمير عبد القادر"
        },
        {
          "id": 440,
          "name": "Bougara",
          "name_ar": "بوقرة"
        },
        {
          "id": 441,
          "name": "Hamadia",
          "name_ar": "حمادية"
        },
        {
          "id": 442,
          "name": "Rechaiga",
          "name_ar": "الرشايقة"
        }
      ]
    },
    {
      "id": 68,
      "name": "Ain Oussara",
      "name_ar": "عين وسارة",
      "communes_count": 10,
      "communes": [
        {
          "id": 588,
          "name": "Had Sahary",
          "name_ar": "حد الصحاري"
        },
        {
          "id": 589,
          "name": "Bouira Lahdab",
          "name_ar": "بويرة الأحداب"
        },
        {
          "id": 590,
          "name": "Ain Fekka",
          "name_ar": "عين فقه"
        },
        {
          "id": 591,
          "name": "Sidi Laadjel",
          "name_ar": "سيدي لعجال"
        },
        {
          "id": 592,
          "name": "Hassi Fedoul",
          "name_ar": "حاسي فدول"
        },
        {
          "id": 593,
          "name": "El Khemis",
          "name_ar": "الخميس"
        },
        {
          "id": 604,
          "name": "Birine",
          "name_ar": "بيرين"
        },
        {
          "id": 609,
          "name": "Guernini",
          "name_ar": "قرنيني"
        },
        {
          "id": 610,
          "name": "Ain Oussera",
          "name_ar": "عين وسارة"
        },
        {
          "id": 611,
          "name": "Benhar",
          "name_ar": "بنهار"
        }
      ]
    },
    {
      "id": 69,
      "name": "Messaad",
      "name_ar": "مسعد",
      "communes_count": 8,
      "communes": [
        {
          "id": 594,
          "name": "Selmana",
          "name_ar": "سلمانة"
        },
        {
          "id": 595,
          "name": "Sed Rahal",
          "name_ar": "سد الرحال"
        },
        {
          "id": 596,
          "name": "Messaad",
          "name_ar": "مسعد"
        },
        {
          "id": 597,
          "name": "Guettara",
          "name_ar": "قطارة"
        },
        {
          "id": 598,
          "name": "Deldoul",
          "name_ar": "دلدول"
        },
        {
          "id": 605,
          "name": "Oum Laadham",
          "name_ar": "أم العظام"
        },
        {
          "id": 606,
          "name": "Faidh El Botma",
          "name_ar": "فيض البطمة"
        },
        {
          "id": 607,
          "name": "Amourah",
          "name_ar": "عمورة"
        }
      ]
    }
  ]
};

export const wilayas: Wilaya[] = algeriaAdministrativeDivisions.wilayas;

export const wilayaNames: string[] = wilayas.map((wilaya) => wilaya.name);

export const wilayaNamesArabic: string[] = wilayas.map((wilaya) => wilaya.name_ar);

export const wilayasById: Record<number, Wilaya> = Object.fromEntries(
  wilayas.map((wilaya) => [wilaya.id, wilaya])
);

export const wilayasByName: Record<string, Wilaya> = Object.fromEntries(
  wilayas.map((wilaya) => [wilaya.name.toLowerCase(), wilaya])
);

export function getWilayaById(id: number): Wilaya | undefined {
  return wilayasById[id];
}

export function getWilayaByName(name: string): Wilaya | undefined {
  return wilayasByName[name.trim().toLowerCase()];
}
