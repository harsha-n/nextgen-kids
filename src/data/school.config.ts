export type IconName =
  | "baby"
  | "bookOpen"
  | "bus"
  | "calendar"
  | "camera"
  | "checkCircle"
  | "clock"
  | "graduationCap"
  | "heart"
  | "home"
  | "image"
  | "mail"
  | "mapPin"
  | "messageCircle"
  | "moon"
  | "music"
  | "palette"
  | "phone"
  | "shieldCheck"
  | "sparkles"
  | "star"
  | "sun"
  | "users"
  | "utensils";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Cta = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type NavLink = {
  label: string;
  href: string;
  isFuture?: boolean;
};

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogImage?: string;
};

export type Program = {
  title: string;
  ageGroup: string;
  description: string;
  highlights: string[];
  icon: IconName;
  image: ImageAsset;
  cta: Cta;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: IconName;
};

export type SimpleItem = {
  title: string;
  description: string;
  icon: IconName;
  link?: string;
};

export type GalleryItem = ImageAsset & {
  category: string;
};

export type ContactFieldId =
  | "parentName"
  | "childName"
  | "childAge"
  | "phone"
  | "email"
  | "program"
  | "preferredVisitDate"
  | "message";

export type SchoolConfig = {
  schoolInfo: {
    name: string;
    tagline: string;
    description: string;
    type: string;
    city: string;
    boardOrApproach: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    googleMapsUrl: string;
    domain: string;
    timings: string;
    establishedYear: string;
    nearbyAreas: string[];
    logo: ImageAsset;
    favicon: string;
    socialLinks: {
      label: string;
      href: string;
      visible: boolean;
    }[];
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
    pages: Record<string, PageSeo>;
  };
  navigation: {
    main: NavLink[];
    footer: NavLink[];
    future: NavLink[];
  };
  hero: {
    eyebrow: string;
    statusBadge: string;
    title: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    image: ImageAsset;
    trustBadges: SimpleItem[];
    floatingBadges: SimpleItem[];
    phoneCtaLabel: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    items: {
      label: string;
      value: string;
      description: string;
      icon: IconName;
    }[];
  };
  pageContent: Record<
    string,
    {
      eyebrow: string;
      title: string;
      description: string;
      image?: ImageAsset;
      highlights?: string[];
      storyTitle?: string;
      storyDescription?: string;
      primaryCta?: Cta;
      secondaryCta?: Cta;
    }
  >;
  whyChooseUs: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureItem[];
  };
  programs: {
    eyebrow: string;
    title: string;
    description: string;
    items: Program[];
  };
  daycare: {
    eyebrow: string;
    title: string;
    description: string;
    timings: string;
    benefits: FeatureItem[];
    safetyPoints: string[];
    image: ImageAsset;
    cta: Cta;
  };
  facilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureItem[];
  };
  activities: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureItem[];
  };
  dailyRoutine: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      time: string;
      title: string;
      description: string;
      icon: IconName;
    }[];
  };
  safety: {
    eyebrow: string;
    title: string;
    description: string;
    points: FeatureItem[];
    image: ImageAsset;
    zoomImage?: ImageAsset;
    zoomLabel: string;
  };
  admissions: {
    eyebrow: string;
    title: string;
    description: string;
    ageCriteriaTitle: string;
    requiredDocumentsTitle: string;
    formTitle: string;
    formDescription: string;
    helpTitle: string;
    helpDescription: string;
    tableNote: string;
    steps: FeatureItem[];
    requiredDocuments: string[];
    ageCriteria: {
      program: string;
      age: string;
    }[];
    enquiryCta: Cta;
  };
  fees: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    tableHeaders: {
      program: string;
      age: string;
      admissionFee: string;
      monthlyFee: string;
      includes: string;
    };
    paymentModesTitle: string;
    paymentModes: string[];
    scholarshipTitle: string;
    scholarshipInfo: string;
    contactCta: Cta;
    items: {
      program: string;
      admissionFee: string;
      monthlyFee: string;
      includes: string[];
    }[];
  };
  faculty: {
    eyebrow: string;
    title: string;
    description: string;
    teachers: {
      name: string;
      role: string;
      description: string;
      image: ImageAsset;
      specialties: string[];
    }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    previewTitle: string;
    previewDescription: string;
    items: GalleryItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      quote: string;
      parentName: string;
      childInfo: string;
      rating: number;
    }[];
  };
  faqs: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    formTitle: string;
    formDescription: string;
    submitLabel: string;
    successTitle: string;
    successMessage: string;
    whatsappCtaLabel: string;
    whatsappCtaMessage: string;
    errorTitle: string;
    errorMessage: string;
    fields: {
      id: ContactFieldId;
      label: string;
      placeholder: string;
      type: "text" | "tel" | "email" | "date" | "textarea" | "select";
      required: boolean;
      options?: string[];
    }[];
    contactCards: FeatureItem[];
    mapTitle: string;
    mapDescription: string;
    mapEmbedUrl: string;
    privacyNotice: string;
    loadingLabel: string;
    resetLabel: string;
  };
  ctas: {
    admission: {
      eyebrow: string;
      title: string;
      description: string;
      primary: Cta;
      secondary: Cta;
    };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
      primary: Cta;
      secondary: Cta;
    };
  };
};

const images = {
  logo: {
    src: "/brand/nextgen-kids-logo-edited.png",
    alt: "NextGen Kids Play School logo",
    width: 1254,
    height: 1254
  },
  campusExterior: {
    src: "/images/campus/exterior-signage.jpeg",
    alt: "NextGen Kids Play School campus exterior in Midhilapuri, Visakhapatnam",
    width: 1600,
    height: 901
  },
  schoolEntry: {
    src: "/images/campus/school-entry-area.jpeg",
    alt: "Organized entry and shoe storage area inside NextGen Kids Play School",
    width: 651,
    height: 1156
  },
  cctvCamera: {
    src: "/images/campus/cctv-camera-entry.jpeg",
    alt: "CCTV camera near the entry area at NextGen Kids Play School",
    width: 600,
    height: 450
  },
  classroomOne: {
    src: "/images/classrooms/classroom-learning-tables-1.jpeg",
    alt: "Bright preschool classroom with child-sized tables and colorful chairs",
    width: 1600,
    height: 901
  },
  classroomTwo: {
    src: "/images/classrooms/classroom-learning-tables-2.jpeg",
    alt: "Organized classroom seating for play group and nursery children",
    width: 1600,
    height: 901
  },
  classroomThree: {
    src: "/images/classrooms/classroom-learning-tables-3.jpeg",
    alt: "Activity classroom with safe tables and chairs for early learning",
    width: 1600,
    height: 901
  },
  earlyWriting: {
    src: "/images/activities/early-writing-activity.jpeg",
    alt: "Child practicing early writing on a slate during preschool activity time",
    width: 720,
    height: 1280
  },
  indoorPlay: {
    src: "/images/gallery/indoor-play-games.jpeg",
    alt: "Indoor play and table games area for young children",
    width: 1600,
    height: 901
  },
  storyCorner: {
    src: "/images/gallery/story-corner-books.jpeg",
    alt: "Story corner with picture books, toys, and learning materials",
    width: 720,
    height: 1600
  },
  contactAdmissions: {
    src: "/images/contact/admissions-team-reading.png",
    alt: "Teacher reading with children inside NextGen Kids Play School activity area",
    width: 1448,
    height: 1086
  }
} satisfies Record<string, ImageAsset>;

const sharedKeywords = [
  "play school in Midhilapuri",
  "preschool in Midhilapuri",
  "daycare in Midhilapuri",
  "nursery school in Midhilapuri",
  "LKG admission in Midhilapuri",
  "UKG admission in Midhilapuri",
  "play school in Midhilapuri VUDA Colony",
  "preschool near Westside Midhilapuri",
  "play school near Kalam Jr College",
  "preschool in Madhurawada",
  "daycare in Madhurawada",
  "nursery school in Madhurawada",
  "preschool near PM Palem",
  "play school near Pothinamallayya Palem",
  "preschool in Visakhapatnam",
  "play school in Visakhapatnam",
  "daycare in Visakhapatnam",
  "preschool in Vizag",
  "play school in Vizag",
  "daycare in Vizag",
  "NextGen Kids Play School",
  "NextGen Kids Midhilapuri",
  "NextGen Kids Visakhapatnam",
  "play school near Madhuravada",
  "preschool near Madhuravada"
];

const schoolAddress =
  "G1, Ground Floor, Sumo Heights Apartment, Opp. Westside, Near Kalam Jr. College, Midhilapuri VUDA Colony, Visakhapatnam - 530041";
const mapsQuery = encodeURIComponent(`NextGen Kids Play School, ${schoolAddress}`);
const googleMapsUrl = "https://maps.app.goo.gl/4RpwsjRPoLDyrtpRA";

export const schoolConfig: SchoolConfig = {
  schoolInfo: {
    name: "NextGen Kids",
    tagline: "Learn. Play. Grow.",
    description:
      "A warm play school and daycare in Midhilapuri, Visakhapatnam for children aged 2 to 6, offering Play Group, Nursery, LKG, UKG, dance, music, caring teachers, and activity-based learning.",
    type: "Play School / Preschool / Daycare",
    city: "Visakhapatnam",
    boardOrApproach: "Play-way, activity-based, kindergarten-readiness approach",
    phone: "+91 85208 15889",
    whatsapp: "+91 85208 15889",
    email: "admissions@nextgenkidsvizag.com",
    address: schoolAddress,
    googleMapsUrl,
    domain: "https://www.nextgenkidsvizag.com",
    timings:
      "Monday to Friday, 9:00 AM to 7:30 PM; Saturday, 9:00 AM to 4:00 PM; Sunday closed",
    establishedYear: "2026",
    nearbyAreas: [
      "Midhilapuri",
      "Madhurawada",
      "Pothinamallayya Palem",
      "PM Palem",
      "Visakhapatnam",
      "Vizag"
    ],
    logo: images.logo,
    favicon: "/favicon.ico",
    socialLinks: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/nextgenkidsplayschool",
        visible: false
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/nextgenkidsplayschool",
        visible: false
      },
      {
        label: "Google Maps",
        href: googleMapsUrl,
        visible: true
      }
    ]
  },
  seo: {
    defaultTitle:
      "NextGen Kids | Play School & Daycare in Midhilapuri, Madhurawada, Visakhapatnam",
    titleTemplate: "%s | NextGen Kids",
    defaultDescription:
      "NextGen Kids is a play school, preschool and daycare in Midhilapuri VUDA Colony, near Madhurawada, Visakhapatnam/Vizag, offering Play Group, Nursery, LKG, UKG and extended daycare.",
    keywords: sharedKeywords,
    ogImage: images.campusExterior.src,
    pages: {
      home: {
        title: "Play School & Daycare in Midhilapuri, Madhurawada | NextGen Kids",
        description:
          "NextGen Kids is a play school, preschool and daycare in Midhilapuri VUDA Colony, near Madhurawada, Visakhapatnam/Vizag, offering Play Group, Nursery, LKG, UKG and extended daycare.",
        path: "/",
        keywords: sharedKeywords
      },
      about: {
        title: "About Our Caring Preschool in Midhilapuri",
        description:
          "Learn about NextGen Kids, our child-first preschool approach, caring teachers, safe campus, daycare support, and activity-based early education.",
        path: "/about",
        keywords: ["about NextGen Kids", "trusted preschool in Midhilapuri", ...sharedKeywords]
      },
      programs: {
        title: "Play Group, Nursery, LKG & UKG in Midhilapuri | NextGen Kids",
        description:
          "Explore Play Group, Nursery, LKG, UKG, and Daycare programs at NextGen Kids in Midhilapuri, Visakhapatnam, close to Madhurawada and Pothinamallayya Palem.",
        path: "/programs",
        keywords: [
          "play group Midhilapuri",
          "play group Madhurawada",
          "LKG UKG admissions Visakhapatnam",
          ...sharedKeywords
        ]
      },
      admissions: {
        title: "Preschool Admissions 2026-27 in Midhilapuri, Visakhapatnam",
        description:
          "Start admission enquiry for 2026-27 at NextGen Kids in Midhilapuri, Visakhapatnam with campus visit support, age criteria, documents, fees guidance, and daycare details.",
        path: "/admissions",
        keywords: ["NextGen Kids admissions 2026", "preschool admission Midhilapuri", ...sharedKeywords]
      },
      daycare: {
        title: "Daycare in Midhilapuri & Madhurawada, Visakhapatnam",
        description:
          "NextGen Kids offers daycare in Midhilapuri, Visakhapatnam for families near Madhurawada, Pothinamallayya Palem, and PM Palem with supervised play, rest routines, hygiene, secure pickup, and parent communication.",
        path: "/daycare",
        keywords: [
          "daycare in Midhilapuri",
          "daycare in Madhurawada",
          "daycare near Pothinamallayya Palem",
          "safe daycare for kids Visakhapatnam",
          ...sharedKeywords
        ]
      },
      activities: {
        title: "Activity-Based Learning, Dance and Music",
        description:
          "See how rhymes, music, dance, storytelling, art, slate writing, phonics, number fun, indoor games, and celebrations support everyday learning.",
        path: "/activities",
        keywords: ["activity based preschool Visakhapatnam", "dance music play school", ...sharedKeywords]
      },
      gallery: {
        title: "Preschool Gallery",
        description:
          "View real campus, classroom, activity, story corner, play area, and entry photos from NextGen Kids Play School.",
        path: "/gallery",
        keywords: ["NextGen Kids gallery", "preschool photos Visakhapatnam", ...sharedKeywords]
      },
      contact: {
        title: "Contact NextGen Kids Play School in Midhilapuri, Visakhapatnam",
        description:
          "Contact NextGen Kids for preschool admissions, daycare enquiries, visit booking, timings, phone numbers, address, and parent support in Midhilapuri, Visakhapatnam.",
        path: "/contact",
        keywords: ["contact NextGen Kids Visakhapatnam", "preschool phone Visakhapatnam", ...sharedKeywords]
      },
      fees: {
        title: "Play School & Daycare Fees in Midhilapuri | NextGen Kids",
        description:
          "View fee guidance for Play Group, Nursery, LKG, UKG, daycare, dance, and music at NextGen Kids in Midhilapuri, Visakhapatnam.",
        path: "/fees",
        keywords: ["preschool fees Visakhapatnam", "daycare fees Visakhapatnam", ...sharedKeywords]
      },
      faqs: {
        title: "Parent FAQs | Play School in Midhilapuri, Visakhapatnam",
        description:
          "Answers to parent questions about play school age, daycare, safety, timings, parent updates, admissions, dance, music, and required documents at NextGen Kids in Midhilapuri, Visakhapatnam.",
        path: "/faqs",
        keywords: ["preschool FAQs Visakhapatnam", "play school questions Visakhapatnam", ...sharedKeywords]
      },
      localSeo: {
        title: "Play School in Midhilapuri & Madhurawada",
        description:
          "NextGen Kids Play School serves families in Midhilapuri VUDA Colony, near Westside and Kalam Jr. College, Visakhapatnam/Vizag. We offer Play Group, Nursery, LKG, UKG, and daycare with caring teachers and activity-based learning.",
        path: "/play-school-midhilapuri-madhurawada",
        keywords: [
          "play school in Midhilapuri",
          "preschool in Midhilapuri",
          "daycare in Midhilapuri",
          "play school in Madhurawada",
          "preschool in Madhurawada",
          "daycare in Madhurawada",
          "play school near Westside Midhilapuri",
          "play school near Kalam Jr College",
          ...sharedKeywords
        ]
      }
    }
  },
  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Admissions", href: "/admissions" },
      { label: "Daycare", href: "/daycare" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" }
    ],
    footer: [
      { label: "Fees", href: "/fees" },
      { label: "FAQs", href: "/faqs" },
      { label: "Activities", href: "/activities" },
      { label: "Local Areas", href: "/play-school-midhilapuri-madhurawada" },
      { label: "Admissions", href: "/admissions" },
      { label: "Contact", href: "/contact" }
    ],
    future: [
      { label: "Academics", href: "/academics", isFuture: true },
      { label: "Faculty", href: "/faculty", isFuture: true },
      { label: "Transportation", href: "/transportation", isFuture: true },
      { label: "Achievements", href: "/achievements", isFuture: true }
    ]
  },
  hero: {
    eyebrow: "Play Group, Nursery, LKG, UKG and Daycare",
    statusBadge: "Admissions Open for 2026-27",
    title: "Play School, Preschool & Daycare in Midhilapuri, Madhurawada",
    subtitle:
      "A caring first-school experience in Midhilapuri VUDA Colony, Visakhapatnam/Vizag where children learn through play, stories, music, dance, early writing, safe routines, and confident social interaction.",
    primaryCta: {
      label: "Enquire for Admission",
      href: "/admissions",
      ariaLabel: "Open preschool admission enquiry"
    },
    secondaryCta: {
      label: "Book a Visit",
      href: "/contact",
      ariaLabel: "Book a campus visit at NextGen Kids"
    },
    image: images.campusExterior,
    trustBadges: [
      {
        title: "Ages 2 to 6",
        description: "Play Group to UKG",
        icon: "baby",
        link: "/programs"
      },
      {
        title: "Daycare Support",
        description: "Extended care options",
        icon: "sun",
        link: "/daycare"
      },
      {
        title: "Safe Campus",
        description: "CCTV and pickup care",
        icon: "shieldCheck"
      },
      {
        title: "Dance and Music",
        description: "Joyful activity learning",
        icon: "music"
      }
    ],
    floatingBadges: [
      {
        title: "Activity-based",
        description: "Learning every day",
        icon: "palette"
      },
      {
        title: "2026-27",
        description: "Admissions open",
        icon: "calendar",
        link: "/admissions"
      }
    ],
    phoneCtaLabel: "Call for admission enquiry"
  },
  stats: {
    eyebrow: "Parent confidence",
    title: "Focused on the early years that matter most",
    items: [
      {
        label: "Age group",
        value: "2-6",
        description: "Programs for Play Group, Nursery, LKG and UKG",
        icon: "baby"
      },
      {
        label: "Core programs",
        value: "5",
        description: "Play Group, Nursery, LKG, UKG and Daycare",
        icon: "graduationCap"
      },
      {
        label: "Daily care",
        value: "6 PM",
        description: "School and daycare support for family routines",
        icon: "clock"
      },
      {
        label: "Activities",
        value: "9+",
        description: "Music, dance, stories, games, art and writing practice",
        icon: "sparkles"
      }
    ]
  },
  pageContent: {
    about: {
      eyebrow: "About NextGen Kids",
      title: "A caring play school for confident early learning",
      description:
        "Our Midhilapuri campus is built for young children who need warmth, routine, safety, and playful discovery before stepping into formal schooling.",
      image: images.classroomOne,
      highlights: [
        "Play-way and activity-based learning",
        "Programs for ages 2 to 6",
        "Daycare, dance and music support",
        "Future-ready structure for higher grades"
      ],
      storyTitle: "A first school where children feel known and cared for",
      storyDescription:
        "NextGen Kids focuses on the preschool years: settling gently, building speech and social confidence, practicing early writing and numbers, enjoying stories, and learning through movement. The campus keeps routines simple and parent communication clear so families know their child is safe, engaged, and supported.",
      primaryCta: {
        label: "Apply for Admission",
        href: "/admissions",
        ariaLabel: "Apply for admission at NextGen Kids"
      },
      secondaryCta: {
        label: "Contact Us",
        href: "/contact",
        ariaLabel: "Contact NextGen Kids"
      }
    },
    programs: {
      eyebrow: "Programs",
      title: "Preschool programs for every early milestone",
      description:
        "Choose from Play Group, Nursery, LKG, UKG, and Daycare programs designed around comfort, readiness, independence, language, movement, and social confidence.",
      image: images.earlyWriting
    },
    admissions: {
      eyebrow: "Admissions 2026-27",
      title: "Simple admissions with personal parent guidance",
      description:
        "Enquire, schedule a visit, understand the right program, review fee details, and complete admission steps with clear support from our preschool team.",
      image: images.campusExterior
    },
    daycare: {
      eyebrow: "Daycare",
      title: "Safe daycare support for busy parent schedules",
      description:
        "Our daycare routine supports young children after preschool hours with supervised indoor play, rest, hygiene, secure pickup, and regular parent communication.",
      image: images.indoorPlay
    },
    activities: {
      eyebrow: "Activities",
      title: "Learning through stories, rhythm, art, play, and movement",
      description:
        "Every activity is planned to support language, confidence, motor skills, creativity, curiosity, and kindergarten readiness.",
      image: images.storyCorner
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Real moments from our campus and classrooms",
      description:
        "A look at the school exterior, classrooms, CCTV camera, early writing activities, indoor play, story corner, and entry areas at NextGen Kids Play School.",
      image: images.campusExterior
    },
    contact: {
      eyebrow: "Contact",
      title: "Talk to our admissions team",
      description:
        "Ask about programs, daycare support, admissions for 2026-27, campus visits, fee details, or the right age group for your child.",
      image: images.contactAdmissions
    },
    fees: {
      eyebrow: "Fees",
      title: "Fee guidance for every program",
      description:
        "Understand admission fees, monthly fees, daycare options, dance and music choices, and included services before planning a visit.",
      image: images.classroomTwo
    },
    faqs: {
      eyebrow: "FAQs",
      title: "Answers to common parent questions",
      description:
        "Quick answers about age groups, daycare, safety, timings, parent communication, activities, and admission documents.",
      image: images.classroomThree
    }
  },
  whyChooseUs: {
    eyebrow: "Why parents choose us",
    title: "A preschool experience designed around trust",
    description:
      "Parents need more than bright classrooms. They need safety, warmth, steady communication, and daily routines that help children settle happily.",
    items: [
      {
        title: "Child-sized classrooms",
        description:
          "Classrooms use age-appropriate seating and activity spaces so children can participate comfortably.",
        icon: "home"
      },
      {
        title: "Learning by doing",
        description:
          "Children explore rhymes, stories, slate writing, art, phonics, numbers, games, dance, and music.",
        icon: "palette"
      },
      {
        title: "Safe entry and pickup",
        description:
          "The campus routine supports careful arrival, CCTV-supported monitoring, supervised handover, and parent-approved pickup.",
        icon: "shieldCheck"
      },
      {
        title: "Parent communication",
        description:
          "Parents can call, WhatsApp, or schedule visits to stay connected with admissions and daily care.",
        icon: "messageCircle"
      },
      {
        title: "Kindergarten readiness",
        description:
          "Age-wise milestones support independence, speech, listening, early writing, early math, and classroom habits.",
        icon: "graduationCap"
      },
      {
        title: "Daycare convenience",
        description:
          "Extended care gives working families a reliable option with supervised play, rest, and hygiene routines.",
        icon: "sun"
      }
    ]
  },
  programs: {
    eyebrow: "Age-wise programs",
    title: "A gentle path from Play Group to UKG",
    description:
      "Each program balances emotional comfort, movement, language, number readiness, creativity, and school habits at the right pace.",
    items: [
      {
        title: "Play Group",
        ageGroup: "2 to 3 years",
        description:
          "A warm first-school experience focused on settling, rhymes, free play, sensory exploration, sharing, and teacher-led comfort.",
        highlights: ["Rhymes and rhythm", "Sensorial play", "Basic routines", "Social comfort"],
        icon: "baby",
        image: images.indoorPlay,
        cta: {
          label: "Ask About Play Group",
          href: "/contact",
          ariaLabel: "Ask about Play Group admissions"
        }
      },
      {
        title: "Nursery",
        ageGroup: "3 to 4 years",
        description:
          "Activity-based learning that builds vocabulary, fine motor skills, confidence, independence, and early number sense.",
        highlights: ["Storytelling", "Art and craft", "Pre-writing skills", "Number fun"],
        icon: "bookOpen",
        image: images.classroomOne,
        cta: {
          label: "Explore Nursery",
          href: "/programs",
          ariaLabel: "Explore Nursery program"
        }
      },
      {
        title: "LKG",
        ageGroup: "4 to 5 years",
        description:
          "A readiness-focused program with phonics, pattern play, early writing, conversation, creativity, and classroom habits.",
        highlights: ["Basic phonics", "Slate writing", "Pattern play", "Group activities"],
        icon: "graduationCap",
        image: images.earlyWriting,
        cta: {
          label: "Know LKG Readiness",
          href: "/admissions",
          ariaLabel: "Know LKG admission readiness"
        }
      },
      {
        title: "UKG",
        ageGroup: "5 to 6 years",
        description:
          "A confident bridge to primary school through reading readiness, number concepts, self-expression, routines, and independence.",
        highlights: ["Reading readiness", "Number concepts", "Confidence speaking", "Primary habits"],
        icon: "star",
        image: images.classroomThree,
        cta: {
          label: "Plan for UKG",
          href: "/admissions",
          ariaLabel: "Plan UKG admission enquiry"
        }
      },
      {
        title: "Daycare",
        ageGroup: "2 to 6 years",
        description:
          "Extended care with supervised indoor play, rest routines, hygiene support, meal-time guidance, and secure pickup.",
        highlights: ["Extended care", "Rest routine", "Meal support", "Secure pickup"],
        icon: "sun",
        image: images.indoorPlay,
        cta: {
          label: "View Daycare",
          href: "/daycare",
          ariaLabel: "View Daycare details"
        }
      }
    ]
  },
  daycare: {
    eyebrow: "Daycare support",
    title: "Safe extended care for working parent schedules",
    description:
      "Daycare at NextGen Kids is calm, supervised, and caring, with indoor play, rest, hygiene support, and careful handover routines.",
    timings:
      "Extended daycare support available until 7:30 PM on weekdays and 4:00 PM on Saturday",
    benefits: [
      {
        title: "Supervised play",
        description: "Children enjoy calm indoor play, stories, puzzles, music, and teacher-guided activities.",
        icon: "users"
      },
      {
        title: "Rest and nap care",
        description: "A quieter routine supports younger children who need rest during extended hours.",
        icon: "moon"
      },
      {
        title: "Meal support",
        description: "Teachers support snack and meal routines with hygiene, patience, and attention.",
        icon: "utensils"
      }
    ],
    safetyPoints: [
      "Parent-authorized pickup only",
      "CCTV-supported entry monitoring",
      "Organized arrival and supervised handover",
      "Age-appropriate indoor play materials",
      "Clean classroom and washroom routines",
      "Phone and WhatsApp support for parents"
    ],
    image: images.indoorPlay,
    cta: {
      label: "Ask About Daycare",
      href: "/contact",
      ariaLabel: "Ask about daycare at NextGen Kids"
    }
  },
  facilities: {
    eyebrow: "Facilities",
    title: "Spaces planned for comfort, safety, and exploration",
    description:
      "The campus setup supports young children's seating, activity time, hygiene, rest, stories, play, and secure transitions.",
    items: [
      {
        title: "Safe classrooms",
        description: "Bright classroom spaces with child-sized tables and chairs for early learning.",
        icon: "home"
      },
      {
        title: "CCTV monitoring",
        description: "A CCTV camera near the entry area supports campus monitoring and parent confidence.",
        icon: "camera"
      },
      {
        title: "Entry and shoe storage",
        description: "An organized entry area helps with arrival, pickup, bags, shoes, and parent handover.",
        icon: "shieldCheck"
      },
      {
        title: "Indoor play area",
        description: "Table games and indoor play setups support sharing, patience, and social skills.",
        icon: "sparkles"
      },
      {
        title: "Activity room",
        description: "Flexible space for art, dance, music, slate writing, group play, and celebrations.",
        icon: "palette"
      },
      {
        title: "Story corner",
        description: "Picture books, toys, and storytelling resources support vocabulary and imagination.",
        icon: "bookOpen"
      },
      {
        title: "Daycare seating",
        description: "Comfortable indoor areas support supervised daycare play and calm routines.",
        icon: "heart"
      },
      {
        title: "Hygiene routines",
        description: "Teacher-supported hygiene habits are built into snack, washroom, and daycare routines.",
        icon: "checkCircle"
      },
      {
        title: "Parent access",
        description: "Families can call, WhatsApp, or book a visit for admissions and program guidance.",
        icon: "phone"
      }
    ]
  },
  activities: {
    eyebrow: "Activity-based learning",
    title: "Every day has a purposeful mix of play and discovery",
    description:
      "Activities are planned to build language, gross motor skills, fine motor skills, creativity, confidence, and social habits.",
    items: [
      {
        title: "Rhymes and music",
        description: "Songs, rhythm, and actions build language, memory, listening, and joyful participation.",
        icon: "music"
      },
      {
        title: "Dance and movement",
        description: "Movement activities support coordination, balance, expression, and confidence.",
        icon: "sparkles"
      },
      {
        title: "Storytelling",
        description: "Picture books and stories support listening, vocabulary, imagination, and attention span.",
        icon: "bookOpen"
      },
      {
        title: "Art and craft",
        description: "Hands-on creative work builds fine motor control, focus, and self-expression.",
        icon: "palette"
      },
      {
        title: "Slate writing",
        description: "Simple strokes, curves, lines, and letters help children build early writing readiness.",
        icon: "checkCircle"
      },
      {
        title: "Sensorial play",
        description: "Textures, colors, sorting, matching, and exploration help children learn by doing.",
        icon: "star"
      },
      {
        title: "Indoor games",
        description: "Board-style games and table play build turn-taking, observation, and social confidence.",
        icon: "users"
      },
      {
        title: "Basic phonics",
        description: "Sound games and letter awareness introduce early reading readiness in a playful way.",
        icon: "bookOpen"
      },
      {
        title: "Number fun",
        description: "Counting, patterns, shapes, and sorting make early math visible and concrete.",
        icon: "graduationCap"
      },
      {
        title: "Festival celebrations",
        description: "Simple celebrations build belonging, cultural awareness, speaking, and participation.",
        icon: "sun"
      }
    ]
  },
  dailyRoutine: {
    eyebrow: "Daily rhythm",
    title: "A predictable routine helps children feel secure",
    description:
      "Young children settle best when the day feels warm, structured, and easy to understand.",
    items: [
      {
        time: "9:00 AM",
        title: "Arrival",
        description: "Warm welcome, settling support, bag routine, and free exploration.",
        icon: "home"
      },
      {
        time: "9:30 AM",
        title: "Circle time",
        description: "Greetings, rhymes, weather, conversation, and confidence-building sharing.",
        icon: "users"
      },
      {
        time: "10:00 AM",
        title: "Activity time",
        description: "Theme-based art, phonics, numbers, slate writing, music, dance, or group activity.",
        icon: "palette"
      },
      {
        time: "10:45 AM",
        title: "Snack time",
        description: "Snack routine with hand hygiene, manners, independence, and teacher support.",
        icon: "utensils"
      },
      {
        time: "11:15 AM",
        title: "Play and games",
        description: "Supervised movement, table games, social play, and confidence-building activities.",
        icon: "sun"
      },
      {
        time: "11:50 AM",
        title: "Story time",
        description: "Picture books, recaps, puppets, listening practice, and calm transition.",
        icon: "bookOpen"
      },
      {
        time: "12:30 PM",
        title: "Departure or daycare",
        description: "Secure handover to parents or transition into daycare routines.",
        icon: "shieldCheck"
      }
    ]
  },
  safety: {
    eyebrow: "Safety and care",
    title: "A secure environment where children feel loved",
    description:
      "Safety is built into classroom setup, hygiene habits, entry routines, pickup practices, teacher supervision, and parent communication.",
    points: [
      {
        title: "Child-safe environment",
        description: "Age-appropriate rooms, child-sized furniture, and supervised movement routines.",
        icon: "shieldCheck"
      },
      {
        title: "Caring teachers",
        description: "Teachers guide children with patience, warmth, repetition, and structure.",
        icon: "heart"
      },
      {
        title: "Hygiene practices",
        description: "Clean classrooms, snack-time hygiene, washroom routines, and daycare cleanliness.",
        icon: "checkCircle"
      },
      {
        title: "Secure pickup",
        description: "Children are released through parent-approved pickup and handover routines.",
        icon: "users"
      },
      {
        title: "CCTV monitoring",
        description: "A camera near the entry area supports safer arrivals, departures, and visitor guidance.",
        icon: "camera"
      },
      {
        title: "Parent communication",
        description: "Call and WhatsApp support helps parents stay connected with admissions and care updates.",
        icon: "messageCircle"
      }
    ],
    image: images.schoolEntry,
    zoomImage: images.cctvCamera,
    zoomLabel: "View CCTV close-up"
  },
  admissions: {
    eyebrow: "Admission process",
    title: "A parent-friendly path to joining NextGen Kids",
    description:
      "Our team helps you understand the right age group, visit the campus, review fee details, and complete admission steps clearly.",
    ageCriteriaTitle: "Age criteria",
    requiredDocumentsTitle: "Required documents",
    formTitle: "Admission enquiry form",
    formDescription: "Share a few details and our admissions team will guide you through the next step.",
    helpTitle: "Need admission help?",
    helpDescription:
      "Call or WhatsApp the preschool team for program fit, visit slots, fee guidance, and daycare options.",
    tableNote:
      "Age guidance may be finalized by the school team based on the child's date of birth, readiness, and admission year.",
    steps: [
      {
        title: "Send an enquiry",
        description: "Share your child's age, preferred program, and visit preference.",
        icon: "messageCircle"
      },
      {
        title: "Schedule a campus visit",
        description: "See the classrooms, entry area, activity spaces, and daycare setup.",
        icon: "calendar"
      },
      {
        title: "Choose the right program",
        description: "We help map your child's age and readiness to Play Group, Nursery, LKG, UKG, or Daycare.",
        icon: "graduationCap"
      },
      {
        title: "Complete admission",
        description: "Submit documents, confirm timings, review fees, and prepare for the first day.",
        icon: "checkCircle"
      }
    ],
    requiredDocuments: [
      "Child birth certificate copy",
      "Two passport-size photographs of the child",
      "Parent ID proof copy",
      "Address proof copy",
      "Vaccination record copy",
      "Previous school record, if applicable"
    ],
    ageCriteria: [
      { program: "Play Group", age: "2 to 3 years" },
      { program: "Nursery", age: "3 to 4 years" },
      { program: "LKG", age: "4 to 5 years" },
      { program: "UKG", age: "5 to 6 years" },
      { program: "Daycare", age: "2 to 6 years" }
    ],
    enquiryCta: {
      label: "Start Admission Enquiry",
      href: "/contact",
      ariaLabel: "Start admission enquiry for NextGen Kids"
    }
  },
  fees: {
    eyebrow: "Fee structure",
    title: "Clear fee guidance for preschool and daycare",
    description:
      "Review program-wise fee guidance for Play Group, Nursery, LKG, UKG, daycare, dance, and music options.",
    note:
      "Final fee details, payment schedule, and optional activity charges can be confirmed with the admissions office during your visit.",
    tableHeaders: {
      program: "Program",
      age: "Age group",
      admissionFee: "Admission fee",
      monthlyFee: "Monthly fee",
      includes: "Includes"
    },
    paymentModesTitle: "Payment modes",
    paymentModes: ["Cash", "UPI / GPay / PhonePe", "Bank transfer", "Cheque"],
    scholarshipTitle: "Admissions office support",
    scholarshipInfo:
      "Parents can contact the office for sibling concessions, daycare combinations, activity add-ons, payment schedules, and the latest approved fee details.",
    contactCta: {
      label: "Contact Admissions Office",
      href: "/contact",
      ariaLabel: "Contact admissions office for fee details"
    },
    items: [
      {
        program: "Play Group",
        admissionFee: "Contact school office",
        monthlyFee: "Contact school office",
        includes: ["Activity materials", "Rhymes and stories", "Parent updates"]
      },
      {
        program: "Nursery",
        admissionFee: "Contact school office",
        monthlyFee: "Contact school office",
        includes: ["Activity sheets", "Art and craft", "Celebration activities"]
      },
      {
        program: "LKG",
        admissionFee: "Contact school office",
        monthlyFee: "Contact school office",
        includes: ["Phonics readiness", "Slate writing", "Number activities"]
      },
      {
        program: "UKG",
        admissionFee: "Contact school office",
        monthlyFee: "Contact school office",
        includes: ["School readiness", "Reading support", "Confidence activities"]
      },
      {
        program: "Daycare",
        admissionFee: "Contact school office",
        monthlyFee: "Based on selected hours",
        includes: ["Supervised care", "Rest routine", "Secure pickup"]
      }
    ]
  },
  faculty: {
    eyebrow: "Teachers and care team",
    title: "Caring early-years educators",
    description:
      "Meet the caring early-years educators who support children with warmth, patience, classroom routines, and joyful activity-based learning.",
    teachers: [
      {
        name: "Play Group Mentor",
        role: "Settling and early social skills",
        description:
          "Supports young children as they adjust to school routines, sharing, rhymes, movement, and teacher-led comfort.",
        image: images.indoorPlay,
        specialties: ["Settling support", "Rhymes", "Social comfort"]
      },
      {
        name: "Nursery and LKG Teacher",
        role: "Language, art and readiness",
        description:
          "Plans activities for vocabulary, art, pre-writing, number sense, phonics, classroom habits, and confidence.",
        image: images.earlyWriting,
        specialties: ["Pre-writing", "Storytelling", "Number fun"]
      },
      {
        name: "Daycare Caregiver",
        role: "Extended care and hygiene routines",
        description:
          "Supports daycare children with supervised play, rest, meal-time guidance, hygiene, and secure handover.",
        image: images.indoorPlay,
        specialties: ["Daycare routines", "Safety", "Parent handover"]
      }
    ]
  },
  gallery: {
    eyebrow: "Gallery",
    title: "A colorful peek into preschool life",
    description:
      "Explore real campus, classroom, activity, story corner, play area, and entry photos from NextGen Kids Play School.",
    previewTitle: "Real moments parents love to see",
    previewDescription:
      "A quick look at the campus, classrooms, early writing, indoor play, story corner, and entry routines.",
    items: [
      {
        ...images.campusExterior,
        category: "Campus"
      },
      {
        ...images.cctvCamera,
        category: "Safety"
      },
      {
        ...images.classroomOne,
        category: "Classroom"
      },
      {
        ...images.earlyWriting,
        category: "Learning"
      },
      {
        ...images.classroomTwo,
        category: "Classroom"
      },
      {
        ...images.indoorPlay,
        category: "Play"
      },
      {
        ...images.classroomThree,
        category: "Classroom"
      },
      {
        ...images.storyCorner,
        category: "Stories"
      },
      {
        ...images.schoolEntry,
        category: "Entry"
      }
    ]
  },
  testimonials: {
    eyebrow: "Parent voices",
    title: "Families look for care, routine, and communication",
    description:
      "Parents value a preschool where children feel safe, teachers communicate clearly, and daily routines feel warm and dependable.",
    items: [
      {
        quote:
          "The classrooms feel bright and organized, and the team explained the admission process clearly during our visit.",
        parentName: "Midhilapuri parent",
        childInfo: "Admission enquiry for Nursery",
        rating: 5
      },
      {
        quote:
          "The daycare option is useful for working families because the routine includes supervised play, rest, and secure pickup.",
        parentName: "Daycare parent",
        childInfo: "Parent of Play Group child",
        rating: 5
      },
      {
        quote:
          "We liked the focus on rhymes, music, early writing, stories, and confidence-building instead of only worksheets.",
        parentName: "LKG parent",
        childInfo: "Parent of LKG child",
        rating: 5
      }
    ]
  },
  faqs: {
    eyebrow: "FAQs",
    title: "Helpful answers for preschool parents",
    description:
      "Clear answers about age groups, daycare, safety, timings, parent communication, admissions, activities, and required documents.",
    items: [
      {
        question: "What is the right age to join play school?",
        answer:
          "Most children begin play school around 2 years of age. At NextGen Kids, the team guides parents based on the child's age, comfort, communication, and readiness."
      },
      {
        question: "Which programs are available?",
        answer:
          "The current preschool programs are Play Group, Nursery, LKG, UKG, and Daycare. The school also highlights dance and music as activity options."
      },
      {
        question: "Do you provide daycare?",
        answer:
          "Yes. Daycare support is available for children aged 2 to 6, with supervised indoor play, rest routines, hygiene support, and secure pickup."
      },
      {
        question: "Is the campus safe?",
        answer:
          "Safety is a core priority. The campus uses child-sized classrooms, organized entry routines, supervised activities, secure handover practices, and parent communication."
      },
      {
        question: "What are the timings?",
        answer:
          "The current timing is Monday to Friday, 9:00 AM to 7:30 PM; Saturday, 9:00 AM to 4:00 PM; and Sunday closed. Please confirm class-wise and daycare timing details with the admissions office."
      },
      {
        question: "How do you update parents?",
        answer:
          "Parents can contact the school through phone or WhatsApp. The final parent update routine can be confirmed with the school office during admission."
      },
      {
        question: "What documents are needed for admission?",
        answer:
          "Common documents include the child's birth certificate, photographs, parent ID proof, address proof, vaccination record, and previous school record if applicable."
      },
      {
        question: "Can we visit the campus before admission?",
        answer:
          "Yes. Parents can book a visit to see the classrooms, entry area, activity spaces, daycare setup, and understand the daily routine."
      },
      {
        question: "Do children learn phonics and numbers?",
        answer:
          "Yes. LKG and UKG readiness includes basic phonics, early writing, number concepts, patterns, storytelling, speaking confidence, and classroom habits."
      },
      {
        question: "Are dance and music part of the activities?",
        answer:
          "Yes. Dance and music are highlighted as part of the activity-based learning approach, along with rhymes, stories, art, games, and celebrations."
      }
    ]
  },
  contact: {
    eyebrow: "Contact and enquiry",
    title: "Book a visit or ask about admissions",
    description:
      "Share your details and our admissions team will help you choose the right program and visit time.",
    formTitle: "Admission enquiry form",
    formDescription:
      "Submit your details and our admissions team will receive your enquiry.",
    submitLabel: "Submit Enquiry",
    successTitle: "Enquiry received",
    successMessage: "Thank you! Our team will contact you shortly.",
    whatsappCtaLabel: "WhatsApp us now",
    whatsappCtaMessage:
      "Hello NextGen Kids, I submitted an admission enquiry and would like a quick response.",
    errorTitle: "Enquiry not submitted",
    errorMessage:
      "We could not submit your enquiry right now. Please try again or WhatsApp us for a quick response.",
    fields: [
      {
        id: "parentName",
        label: "Parent name",
        placeholder: "Enter parent name",
        type: "text",
        required: true
      },
      {
        id: "childName",
        label: "Child name",
        placeholder: "Enter child name",
        type: "text",
        required: true
      },
      {
        id: "childAge",
        label: "Child age",
        placeholder: "Select child age",
        type: "select",
        required: true,
        options: ["2 years", "3 years", "4 years", "5 years", "6 years"]
      },
      {
        id: "phone",
        label: "Phone number",
        placeholder: "Enter phone number",
        type: "tel",
        required: true
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Enter email address",
        type: "email",
        required: true
      },
      {
        id: "program",
        label: "Interested program",
        placeholder: "Select a program",
        type: "select",
        required: true,
        options: ["Play Group", "Nursery", "LKG", "UKG", "Daycare", "Dance and Music"]
      },
      {
        id: "preferredVisitDate",
        label: "Preferred visit date",
        placeholder: "Select preferred date",
        type: "date",
        required: false
      },
      {
        id: "message",
        label: "Message",
        placeholder: "Tell us anything you would like the school team to know",
        type: "textarea",
        required: false
      }
    ],
    contactCards: [
      {
        title: "Call",
        description: "+91 85208 15889",
        icon: "phone"
      },
      {
        title: "WhatsApp",
        description: "+91 85208 15889",
        icon: "messageCircle"
      },
      {
        title: "Email",
        description: "admissions@nextgenkidsvizag.com",
        icon: "mail"
      },
      {
        title: "Visit",
        description: schoolAddress,
        icon: "mapPin"
      }
    ],
    mapTitle: "Find NextGen Kids Play School",
    mapDescription:
      "Visit us at Sumo Heights Apartment, opposite Westside, near Kalam Jr. College, Midhilapuri Vuda Colony, Vishakapatnam.",
    mapEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
    privacyNotice: "By submitting this form, you agree to be contacted by our admissions team.",
    loadingLabel: "Submitting...",
    resetLabel: "Submit Another Enquiry"
  },
  ctas: {
    admission: {
      eyebrow: "Admissions open",
      title: "Ready to choose a caring first school?",
      description:
        "Start with a quick enquiry. Our team will help you understand age groups, daycare options, fees, activity programs, and visit availability.",
      primary: {
        label: "Start Enquiry",
        href: "/contact",
        ariaLabel: "Start admission enquiry"
      },
      secondary: {
        label: "View Programs",
        href: "/programs",
        ariaLabel: "View preschool programs"
      }
    },
    contact: {
      eyebrow: "Need help deciding?",
      title: "Talk to our preschool team",
      description:
        "Parents can call, WhatsApp, or book a visit to understand routines, safety, programs, fees, and daycare support.",
      primary: {
        label: "Contact Us",
        href: "/contact",
        ariaLabel: "Contact NextGen Kids"
      },
      secondary: {
        label: "View FAQs",
        href: "/faqs",
        ariaLabel: "View parent FAQs"
      }
    }
  }
};
