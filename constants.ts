import { Asset, CalendarWeek, Locale } from './types';

export const CURRENCY_RATES: Record<string, number> = {
  AED: 1,
  USD: 0.27,
  EUR: 0.25,
  GBP: 0.21,
};

export const DICTIONARY = {
  en: {
    welcome: "Welcome to coshare",
    subtitle: "Smart Ownership. Infinite Lifestyle.",
    signIn: "Sign In",
    keepSignedIn: "Keep me signed in",
    dashboard: "Dashboard",
    vault: "The Vault",
    portfolio: "Portfolio",
    equity: "Total Equity",
    netYield: "Net Yield", 
    explore: "Featured",
    availableFractions: "Fractions Available",
    monetize: "Monetize My Week",
    bookWeek: "Reserve Week",
    rentBackProjected: "Projected Rent-Back",
    secureVault: "Secure Vault Access",
    biometric: "Verifying Biometrics...",
    verified: "VERIFIED OWNER",
    setupId: "Verify Emirates ID",
    logout: "Sign Out",
    landingTitle1: "This pure feeling.",
    landingTitle1Mobile: "This feeling.",
    landingTitle2: "Yours.",
    landingSub: "Elevate your lifestyle at a fraction of cost.",
    startJourney: "Start Your Journey",
    listAsset: "List Your Asset",
    valueProp1: "8 Fractions. 1 Asset.",
    valueProp2: "Fully Managed.",
    valueProp3: "Smart Income.", 
    uploadTitle: "Submit Asset for Valuation",
    uploadDesc: "Our concierge team verifies every asset. Upload proof of ownership to begin.",
    uploadType: "Asset Type",
    uploadProof: "Proof of Ownership (Title Deed/Registration)",
    uploadSubmit: "Submit for Verification",
    pendingReview: "Pending Verification",
  },
  ar: {
    welcome: "مرحباً بك في coshare",
    subtitle: "ملكية ذكية. أسلوب حياة لا حدود له.",
    signIn: "تسجيل الدخول",
    keepSignedIn: "أبقني مسجلاً",
    dashboard: "لوحة التحكم",
    vault: "الخزنة",
    portfolio: "المحفظة",
    equity: "إجمالي الحقوق",
    netYield: "العائد الصافي",
    explore: "مختارات",
    availableFractions: "حصص متاحة",
    monetize: "تأجير أسبوعي",
    bookWeek: "حجز الأسبوع",
    rentBackProjected: "العائد المتوقع",
    secureVault: "دخول آمن للخزنة",
    biometric: "جاري التحقق الحيوي...",
    verified: "مالك موثق",
    setupId: "تحقق من الهوية",
    logout: "تسجيل خروج",
    landingTitle1: "هذا الشعور النقي.",
    landingTitle1Mobile: "هذا الشعور.",
    landingTitle2: "ملكك.",
    landingSub: "ارتقِ بأسلوب حياتك بجزء من التكلفة.",
    startJourney: "ابدأ رحلتك",
    listAsset: "اعرض أصولك",
    valueProp1: "٨ حصص. أصل واحد.",
    valueProp2: "إدارة كاملة.",
    valueProp3: "دخل ذكي.", 
    uploadTitle: "تقديم الأصل للتقييم",
    uploadDesc: "فريقنا يتحقق من كل أصل. قم بتحميل إثبات الملكية للبدء.",
    uploadType: "نوع الأصل",
    uploadProof: "إثبات الملكية (سند الملكية/التسجيل)",
    uploadSubmit: "إرسال للتحقق",
    pendingReview: "قيد المراجعة",
  }
};

export const MOCK_ASSETS: Asset[] = [
  // --- REAL ESTATE ---
  // Penthouses
  {
    id: '1',
    title: 'Downtown Views II Penthouse',
    location: 'Downtown Dubai, UAE',
    type: 'REAL_ESTATE',
    subtype: 'Penthouses',
    visibility: 'PUBLIC',
    pricePerFraction: 450000,
    currency: 'AED',
    fractionsAvailable: 3,
    imageUrl: 'https://images.unsplash.com/photo-1512918760532-3ed862d8b5f3?q=80&w=2800&auto=format&fit=crop',
    description: 'A pristine skyline sanctuary overlooking the Burj Khalifa. Minimalist interiors featuring Italian marble and floor-to-ceiling glass.',
    specs: [
      { label: 'Area', value: '3,400 sqft' },
      { label: 'Bedrooms', value: '4' },
      { label: 'Service', value: 'Concierge' }
    ],
    details: {
        bua: '3,400 sq.ft',
        bedrooms: 4,
        bathrooms: 5,
        parking: 3,
        completionYear: '2023',
        view: 'Full Burj Khalifa & Fountain',
        serviceCharge: '25 AED/sq.ft',
        floorLevel: 'Top Floor (55)',
        furnishing: 'Fully Furnished (Minotti)',
        amenities: ['Private Elevator Access', 'Wrap-around Terrace']
    }
  },
  {
    id: '10',
    title: 'One Palm Dorchester',
    location: 'Palm Jumeirah, UAE',
    type: 'REAL_ESTATE',
    subtype: 'Penthouses',
    visibility: 'PUBLIC',
    pricePerFraction: 3500000,
    currency: 'AED',
    fractionsAvailable: 1,
    imageUrl: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2940&auto=format&fit=crop',
    description: 'Managed by Dorchester Collection. Double-height ceilings, private lap pool, and 360-degree views of the Arabian Gulf.',
    specs: [
      { label: 'Area', value: '21,000 sqft' },
      { label: 'Bedrooms', value: '5' },
      { label: 'Service', value: 'Dorchester' }
    ],
    details: {
        bua: '21,000 sq.ft',
        bedrooms: 5,
        bathrooms: 7,
        parking: 6,
        completionYear: '2021',
        view: '360° Arabian Gulf & Skyline',
        serviceCharge: '45 AED/sq.ft',
        floorLevel: 'Penthouse Collection',
        poolSpecs: 'Private Infinity Lap Pool',
        furnishing: 'Bespoke Designer'
    }
  },
  // Villas
  {
    id: '5',
    title: 'Palm Jumeirah Signature Villa',
    location: 'Palm Jumeirah, UAE',
    type: 'REAL_ESTATE',
    subtype: 'Villas',
    visibility: 'PUBLIC',
    pricePerFraction: 2100000,
    currency: 'AED',
    fractionsAvailable: 2,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop',
    description: 'A minimalist architectural masterpiece located on Frond G. Private beach access, infinity pool, and interiors designed by Minotti.',
    specs: [
      { label: 'BUA', value: '7,000 sqft' },
      { label: 'Bedrooms', value: '5' },
      { label: 'View', value: 'Atlantis' }
    ],
    details: {
        bua: '7,000 sq.ft',
        plotSize: '13,400 sq.ft',
        bedrooms: 5,
        bathrooms: 6,
        parking: 4,
        completionYear: '2022 (Renovated)',
        view: 'Atlantis & Royal Atlantis',
        poolSpecs: 'Temperature Controlled Infinity',
        furnishing: 'Fully Furnished'
    }
  },
  {
    id: '7',
    title: 'Emirates Hills Sector E',
    location: 'Emirates Hills, UAE',
    type: 'REAL_ESTATE',
    subtype: 'Villas',
    visibility: 'PUBLIC',
    pricePerFraction: 1800000,
    currency: 'AED',
    fractionsAvailable: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-2a429b08e04b?q=80&w=2940&auto=format&fit=crop',
    description: 'Overlooking the Montgomerie Golf Course. Classic Andalusian architecture meeting modern smart-home integration.',
    specs: [
      { label: 'BUA', value: '15,000 sqft' },
      { label: 'Plot', value: '22,000 sqft' },
      { label: 'View', value: 'Golf Course' }
    ],
    details: {
        bua: '15,000 sq.ft',
        plotSize: '22,000 sq.ft',
        bedrooms: 7,
        bathrooms: 9,
        parking: 8,
        completionYear: '2015',
        view: 'Full Golf Course',
        poolSpecs: 'Resort Style with Jacuzzi',
        furnishing: 'Partially Furnished'
    }
  },
  // Townhouses
  {
    id: '8',
    title: 'Tilal Al Ghaf Aura',
    location: 'Tilal Al Ghaf, UAE',
    type: 'REAL_ESTATE',
    subtype: 'Townhouses',
    visibility: 'PUBLIC',
    pricePerFraction: 185000,
    currency: 'AED',
    fractionsAvailable: 6,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2792&auto=format&fit=crop',
    description: 'Resort-style living with direct access to Lagoon Al Ghaf. Sky suite terrace and bespoke modern finishes.',
    specs: [
      { label: 'BUA', value: '3,411 sqft' },
      { label: 'Bedrooms', value: '4' },
      { label: 'Feature', value: 'Sky Suite' }
    ],
    details: {
        bua: '3,411 sq.ft',
        bedrooms: 4,
        bathrooms: 4,
        parking: 2,
        completionYear: '2024',
        view: 'Community Park',
        serviceCharge: '12 AED/sq.ft',
        furnishing: 'Unfurnished'
    }
  },
  {
    id: '9',
    title: 'Al Barari Chorisia',
    location: 'Al Barari, UAE',
    type: 'REAL_ESTATE',
    subtype: 'Townhouses',
    visibility: 'PUBLIC',
    pricePerFraction: 290000,
    currency: 'AED',
    fractionsAvailable: 5,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2906&auto=format&fit=crop',
    description: 'Inspired by the Chorisia tree. A central courtyard connects indoor and outdoor living in this lush, green sanctuary.',
    specs: [
      { label: 'BUA', value: '6,634 sqft' },
      { label: 'Bedrooms', value: '5' },
      { label: 'Style', value: 'Contemporary' }
    ],
    details: {
        bua: '6,634 sq.ft',
        bedrooms: 5,
        bathrooms: 6,
        parking: 3,
        completionYear: '2023',
        view: 'Botanical Gardens',
        poolSpecs: 'Plunge Pool',
        furnishing: 'Unfurnished'
    }
  },

  // --- CARS ---
  // Supercars
  {
    id: '3',
    title: 'Rolls-Royce Spectre',
    location: 'Riyadh, KSA',
    type: 'CAR',
    subtype: 'Supercars',
    visibility: 'PUBLIC',
    pricePerFraction: 180000,
    currency: 'AED',
    fractionsAvailable: 1,
    imageUrl: 'https://images.unsplash.com/photo-1631295868223-63260951cb75?q=80&w=2831&auto=format&fit=crop',
    description: 'The world’s first ultra-luxury electric super coupé. Finished in Arctic White with Mandarin interior accents.',
    specs: [
      { label: 'Range', value: '530 km' },
      { label: '0-100', value: '4.5s' },
      { label: 'Year', value: '2025' }
    ],
    details: {
        year: '2025',
        odometer: '150 km',
        engine: 'Dual Electric Motors',
        transmission: 'Single Speed',
        exteriorColor: 'Arctic White',
        interiorColor: 'Mandarin & Navy',
        warranty: '4 Years Unlimited Mileage',
        serviceHistory: 'Delivery Mileage',
        acceleration: '4.5s',
        topSpeed: '250 km/h'
    }
  },
  {
    id: '11',
    title: 'Ferrari SF90 Stradale',
    location: 'Dubai, UAE',
    type: 'CAR',
    subtype: 'Supercars',
    visibility: 'PUBLIC',
    pricePerFraction: 220000,
    currency: 'AED',
    fractionsAvailable: 4,
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2940&auto=format&fit=crop',
    description: 'The first Series Production PHEV Spider. 1000cv of pure adrenaline with Assetto Fiorano pack.',
    specs: [
      { label: 'Power', value: '1000 cv' },
      { label: '0-100', value: '2.5s' },
      { label: 'Year', value: '2024' }
    ],
    details: {
        year: '2024',
        odometer: '3,200 km',
        engine: '4.0L V8 Twin-Turbo PHEV',
        transmission: '8-Speed F1 DCT',
        exteriorColor: 'Rosso Corsa',
        interiorColor: 'Nero Alcantara',
        warranty: '3 Years Factory',
        serviceHistory: 'Full Agency',
        acceleration: '2.5s',
        topSpeed: '340 km/h',
        modifications: ['Assetto Fiorano Pack', 'Carbon Fibre Wheels']
    }
  },
  // Desert 4x4s
  {
    id: '6',
    title: 'Mercedes-AMG G 63 4x4²',
    location: 'Al Qudra Desert, UAE',
    type: 'CAR',
    subtype: 'Desert 4x4s',
    visibility: 'PUBLIC',
    pricePerFraction: 125000,
    currency: 'AED',
    fractionsAvailable: 6,
    imageUrl: 'https://images.unsplash.com/photo-1520031441872-265149a9e690?q=80&w=2897&auto=format&fit=crop',
    description: 'The ultimate desert conqueror. Portal axles, 585hp V8, and finished in Manufaktur Opalite White Magno.',
    specs: [
      { label: 'Clearance', value: '351 mm' },
      { label: 'Engine', value: '4.0L V8' },
      { label: 'Year', value: '2024' }
    ],
    details: {
        year: '2024',
        odometer: '5,000 km',
        engine: '4.0L V8 Biturbo',
        transmission: '9G-TRONIC',
        exteriorColor: 'Opalite White Magno',
        interiorColor: 'Bengal Red',
        warranty: '5 Years',
        serviceHistory: 'Full Service History',
        acceleration: '5.0s',
        modifications: ['Portal Axles', 'Roof Rack', 'Carbon Fenders']
    }
  },
  {
    id: '12',
    title: 'Defender 110 V8 Bond',
    location: 'Liwa Desert, UAE',
    type: 'CAR',
    subtype: 'Desert 4x4s',
    visibility: 'PUBLIC',
    pricePerFraction: 85000,
    currency: 'AED',
    fractionsAvailable: 3,
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2788&auto=format&fit=crop',
    description: 'Limited Bond Edition. Stealth pack, 518hp Supercharged V8. The perfect blend of heritage and brute force.',
    specs: [
      { label: 'Power', value: '518 hp' },
      { label: 'Edition', value: '007' },
      { label: 'Year', value: '2023' }
    ],
    details: {
        year: '2023',
        odometer: '12,000 km',
        engine: '5.0L Supercharged V8',
        transmission: '8-Speed Automatic',
        exteriorColor: 'Santorini Black',
        interiorColor: 'Ebony Windsor Leather',
        warranty: 'Active',
        serviceHistory: 'Full Agency',
        acceleration: '5.4s',
        modifications: ['007 Edition Badging', '22" Gloss Black Alloys', 'Blue Brake Calipers']
    }
  },
  // Classics / Retromods
  {
    id: '13',
    title: 'Porsche 911 Singer',
    location: 'DIFC, UAE',
    type: 'CAR',
    subtype: 'Classics / Retromods',
    visibility: 'PUBLIC',
    pricePerFraction: 450000,
    currency: 'AED',
    fractionsAvailable: 2,
    imageUrl: 'https://images.unsplash.com/photo-1599912027806-cfec9f5944b6?q=80&w=2938&auto=format&fit=crop',
    description: 'Reimagined by Singer. 4.0L flat-six, carbon fiber bodywork, and bespoke woven leather interior.',
    specs: [
      { label: 'Engine', value: '4.0L NA' },
      { label: 'Weight', value: '1100 kg' },
      { label: 'Era', value: '964' }
    ],
    details: {
        year: '1991 (Restored 2023)',
        odometer: '1,200 km (Since Restoration)',
        engine: '4.0L Flat-Six Air Cooled',
        transmission: '6-Speed Manual',
        exteriorColor: 'Singer Racing White',
        interiorColor: 'Cognac Weave',
        warranty: 'Singer Warranty',
        serviceHistory: 'Full Documentation',
        acceleration: '3.3s',
        modifications: ['Carbon Body', 'Ohlins Suspension', 'Ceramic Brakes']
    }
  },
  {
    id: '14',
    title: '1967 Mustang Eleanor',
    location: 'Jeddah, KSA',
    type: 'CAR',
    subtype: 'Classics / Retromods',
    visibility: 'PUBLIC',
    pricePerFraction: 110000,
    currency: 'AED',
    fractionsAvailable: 5,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2940&auto=format&fit=crop',
    description: 'Officially licensed Eleanor tribute. 428 Cobra Jet engine, Go-Baby-Go shifter, and Pepper Grey paint.',
    specs: [
      { label: 'Engine', value: '7.0L V8' },
      { label: 'Trans', value: 'Manual' },
      { label: 'Year', value: '1967' }
    ],
    details: {
        year: '1967',
        odometer: '500 km',
        engine: '428 Cobra Jet V8 (7.0L)',
        transmission: 'Tremec 5-Speed Manual',
        exteriorColor: 'Pepper Grey Metallic',
        interiorColor: 'Black Deluxe',
        warranty: 'N/A',
        serviceHistory: 'Restoration Log',
        modifications: ['Nitrous Oxide System (Show)', 'Side Exhausts', 'Shelby Body Kit']
    }
  },

  // --- YACHTS ---
  // Powerboats
  {
    id: '2',
    title: 'Azimut Grande 27M',
    location: 'Dubai Harbour, UAE',
    type: 'YACHT',
    subtype: 'Powerboats',
    visibility: 'PUBLIC',
    pricePerFraction: 320000,
    currency: 'AED',
    fractionsAvailable: 5,
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe79ba02?q=80&w=2940&auto=format&fit=crop',
    description: 'Carbon fiber superstructure with widebody concept. The ultimate weekend escape vessel for the Arabian Gulf.',
    specs: [
      { label: 'Length', value: '27m' },
      { label: 'Cabins', value: '5' },
      { label: 'Speed', value: '28 kn' }
    ],
    details: {
        length: '26.78 m',
        beam: '6.59 m',
        builder: 'Azimut Yachts',
        yearBuilt: '2023',
        guests: 10,
        cabins: 5,
        crew: 4,
        cruisingSpeed: '24 kn',
        maxSpeed: '28 kn',
        location: 'Dubai Harbour',
        flag: 'UAE',
        engines: '2 x MAN V12 1900 mHP'
    }
  },
  {
    id: '15',
    title: 'Riva 88\' Folgore',
    location: 'Yas Marina, UAE',
    type: 'YACHT',
    subtype: 'Powerboats',
    visibility: 'PUBLIC',
    pricePerFraction: 550000,
    currency: 'AED',
    fractionsAvailable: 3,
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2940&auto=format&fit=crop',
    description: 'A blend of futuristic design and mahogany tradition. The 88 Folgore is the new flagship of the sport-fly range.',
    specs: [
      { label: 'Length', value: '26.9m' },
      { label: 'Speed', value: '36 kn' },
      { label: 'Style', value: 'Sportfly' }
    ],
    details: {
        length: '26.92 m',
        beam: '6.31 m',
        builder: 'Riva',
        yearBuilt: '2024',
        guests: 8,
        cabins: 4,
        crew: 4,
        cruisingSpeed: '30 kn',
        maxSpeed: '36 kn',
        location: 'Yas Marina',
        flag: 'Cayman Islands',
        engines: '2 x MTU 16V 2000 M96L'
    }
  },
  // Sailing
  {
    id: '16',
    title: 'Wally 101 Full Custom',
    location: 'Monaco / Dubai',
    type: 'YACHT',
    subtype: 'Sailing',
    visibility: 'PUBLIC',
    pricePerFraction: 620000,
    currency: 'AED',
    fractionsAvailable: 4,
    imageUrl: 'https://images.unsplash.com/photo-1544143890-7d721115e45c?q=80&w=2938&auto=format&fit=crop',
    description: 'High-performance cruising sloop. Carbon pre-preg construction for unmatched speed and comfort.',
    specs: [
      { label: 'Length', value: '30.8m' },
      { label: 'Mast', value: 'Carbon' },
      { label: 'Class', value: 'Sloop' }
    ],
    details: {
        length: '30.80 m',
        beam: '7.49 m',
        builder: 'Wally',
        yearBuilt: '2023',
        guests: 6,
        cabins: 3,
        crew: 4,
        location: 'Monaco (Summer) / Dubai (Winter)',
        flag: 'Malta',
        engines: 'Cummins 425hp'
    }
  },
  {
    id: '17',
    title: 'Nautor Swan 98',
    location: 'Dubai Offshore, UAE',
    type: 'YACHT',
    subtype: 'Sailing',
    visibility: 'PUBLIC',
    pricePerFraction: 480000,
    currency: 'AED',
    fractionsAvailable: 2,
    imageUrl: 'https://images.unsplash.com/photo-1502088513349-3ff6482aa816?q=80&w=2890&auto=format&fit=crop',
    description: 'Designed by Germán Frers. A true bluewater cruiser capable of trans-oceanic voyages in total luxury.',
    specs: [
      { label: 'Length', value: '30m' },
      { label: 'Draft', value: '4.4m' },
      { label: 'Cabins', value: '4' }
    ],
    details: {
        length: '29.60 m',
        beam: '6.97 m',
        builder: 'Nautor Swan',
        yearBuilt: '2022',
        guests: 8,
        cabins: 4,
        crew: 4,
        location: 'Dubai Offshore Sailing Club',
        flag: 'UK',
        engines: 'Cummins QSB 6.7'
    }
  },
  // Specialized
  {
    id: '18',
    title: 'Technohull Omega 47',
    location: 'Palm Jumeirah, UAE',
    type: 'YACHT',
    subtype: 'Specialized',
    visibility: 'PUBLIC',
    pricePerFraction: 95000,
    currency: 'AED',
    fractionsAvailable: 6,
    imageUrl: 'https://images.unsplash.com/photo-1629813083626-d1252194b8e2?q=80&w=2940&auto=format&fit=crop',
    description: 'Hyper-performance luxury RIB. Twin 600hp outboards push this vessel to speeds in excess of 80 knots.',
    specs: [
      { label: 'Power', value: '1200 hp' },
      { label: 'Speed', value: '80 kn' },
      { label: 'Type', value: 'RIB' }
    ],
    details: {
        length: '13.80 m',
        beam: '3.60 m',
        builder: 'Technohull',
        yearBuilt: '2024',
        guests: 12,
        cabins: 1,
        crew: 1,
        maxSpeed: '80 kn',
        location: 'Palm Jumeirah',
        flag: 'UAE',
        engines: '2 x Mercury Verado 600hp'
    }
  },
  {
    id: '19',
    title: 'Candela C-8',
    location: 'Dubai Canal, UAE',
    type: 'YACHT',
    subtype: 'Specialized',
    visibility: 'PUBLIC',
    pricePerFraction: 75000,
    currency: 'AED',
    fractionsAvailable: 7,
    imageUrl: 'https://images.unsplash.com/photo-1559770220-42b78db7e01e?q=80&w=2940&auto=format&fit=crop',
    description: 'The Tesla of the seas. Electric hydrofoil technology delivers a silent, smooth flight above the waves.',
    specs: [
      { label: 'Range', value: '57 NM' },
      { label: 'Speed', value: '24 kn' },
      { label: 'Tech', value: 'Hydrofoil' }
    ],
    details: {
        length: '8.50 m',
        beam: '2.50 m',
        builder: 'Candela',
        yearBuilt: '2025',
        guests: 8,
        cabins: 1,
        crew: 0,
        cruisingSpeed: '22 kn',
        maxSpeed: '30 kn',
        location: 'Dubai Canal',
        flag: 'UAE',
        engines: 'Candela C-POD Electric'
    }
  },

  // --- MOTORBIKES ---
  // Superbikes
  {
    id: '4',
    title: 'Ducati Panigale V4 R',
    location: 'Yas Marina, UAE',
    type: 'MOTORBIKE',
    subtype: 'Superbikes',
    visibility: 'PUBLIC',
    pricePerFraction: 45000,
    currency: 'AED',
    fractionsAvailable: 7,
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2832&auto=format&fit=crop',
    description: 'Born for the track, legal for the road. The closest production model to a competition bike ever.',
    specs: [
      { label: 'Power', value: '218 hp' },
      { label: 'Weight', value: '172 kg' },
      { label: 'Engine', value: '998 cc' }
    ],
    details: {
        year: '2024',
        engine: '998cc Desmosedici Stradale R',
        power: '218 hp',
        torque: '111.3 Nm',
        weight: '172 kg',
        seatHeight: '850 mm',
        electronics: ['DTC EVO 3', 'DWC EVO', 'DSC', 'EBC EVO']
    }
  },
  {
    id: '20',
    title: 'BMW M 1000 RR',
    location: 'Dubai Autodrome, UAE',
    type: 'MOTORBIKE',
    subtype: 'Superbikes',
    visibility: 'PUBLIC',
    pricePerFraction: 38000,
    currency: 'AED',
    fractionsAvailable: 5,
    imageUrl: 'https://images.unsplash.com/photo-1625043484550-df60256f6ea5?q=80&w=2942&auto=format&fit=crop',
    description: 'Pure M DNA. Carbon winglets, high windscreen, and a chassis designed for the podium.',
    specs: [
      { label: 'Power', value: '212 hp' },
      { label: '0-100', value: '3.1s' },
      { label: 'Tech', value: 'M Comp' }
    ],
    details: {
        year: '2024',
        engine: '999cc Water/Oil-Cooled 4-Cylinder',
        power: '212 hp',
        torque: '113 Nm',
        weight: '192 kg',
        seatHeight: '832 mm',
        electronics: ['M GPS Data Trigger', 'M Competition Package']
    }
  },
  // Adventure
  {
    id: '21',
    title: 'BMW R 1250 GS Adv',
    location: 'Hatta Mountains, UAE',
    type: 'MOTORBIKE',
    subtype: 'Adventure',
    visibility: 'PUBLIC',
    pricePerFraction: 18000,
    currency: 'AED',
    fractionsAvailable: 6,
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2940&auto=format&fit=crop',
    description: 'The King of Adventure. Triple Black edition with complete touring pannier set and navigation system.',
    specs: [
      { label: 'Engine', value: '1254 cc' },
      { label: 'Range', value: '600 km' },
      { label: 'Mode', value: 'Enduro' }
    ],
    details: {
        year: '2023',
        engine: '1254cc Boxer Twin',
        power: '136 hp',
        torque: '143 Nm',
        weight: '268 kg',
        seatHeight: '890 mm',
        electronics: ['Dynamic ESA', 'Pro Riding Modes', 'Hill Start Control']
    }
  },
  {
    id: '22',
    title: 'Ducati Multistrada V4',
    location: 'Jebel Jais, UAE',
    type: 'MOTORBIKE',
    subtype: 'Adventure',
    visibility: 'PUBLIC',
    pricePerFraction: 22000,
    currency: 'AED',
    fractionsAvailable: 4,
    imageUrl: 'https://images.unsplash.com/photo-1647963283256-4b68e7cc27e0?q=80&w=2796&auto=format&fit=crop',
    description: 'Pikes Peak Edition. Sporty handling meets touring comfort. Adaptive cruise control and blind spot detection.',
    specs: [
      { label: 'Power', value: '170 hp' },
      { label: 'Tech', value: 'Radar' },
      { label: 'Wheel', value: '17"' }
    ],
    details: {
        year: '2024',
        engine: '1158cc V4 Granturismo',
        power: '170 hp',
        torque: '125 Nm',
        weight: '215 kg',
        seatHeight: '840 mm',
        electronics: ['Adaptive Cruise Control', 'Blind Spot Detection']
    }
  },
  // Cruisers
  {
    id: '23',
    title: 'Harley CVO Road Glide',
    location: 'Sheikh Zayed Road, UAE',
    type: 'MOTORBIKE',
    subtype: 'Cruisers',
    visibility: 'PUBLIC',
    pricePerFraction: 35000,
    currency: 'AED',
    fractionsAvailable: 3,
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2940&auto=format&fit=crop',
    description: 'The pinnacle of factory custom touring. Milwaukee-Eight 117 powertrain and exclusive paint.',
    specs: [
      { label: 'Engine', value: '1923 cc' },
      { label: 'Audio', value: 'Stage II' },
      { label: 'Style', value: 'Bagger' }
    ],
    details: {
        year: '2024',
        engine: 'Milwaukee-Eight 117 (1923cc)',
        power: '105 hp',
        torque: '171 Nm',
        weight: '391 kg',
        seatHeight: '680 mm',
        electronics: ['Boom! Box GTS', 'RDRS Safety Enhancements']
    }
  },
  {
    id: '24',
    title: 'Triumph Rocket 3 GT',
    location: 'Abu Dhabi Corniche, UAE',
    type: 'MOTORBIKE',
    subtype: 'Cruisers',
    visibility: 'PUBLIC',
    pricePerFraction: 25000,
    currency: 'AED',
    fractionsAvailable: 5,
    imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2787&auto=format&fit=crop',
    description: 'Chrome Edition. The world’s largest production motorcycle engine. 2500cc of pure torque.',
    specs: [
      { label: 'Torque', value: '221 Nm' },
      { label: 'Engine', value: '2.5L' },
      { label: '0-100', value: '2.7s' }
    ],
    details: {
        year: '2023',
        engine: '2458cc Inline-3',
        power: '165 hp',
        torque: '221 Nm',
        weight: '294 kg',
        seatHeight: '750 mm',
        electronics: ['Cornering ABS', 'Traction Control', 'Hill Hold']
    }
  },
  // Classics / Cafe Racers
  {
    id: '25',
    title: 'Norton Commando 961',
    location: 'Al Serkal Avenue, UAE',
    type: 'MOTORBIKE',
    subtype: 'Classics / Cafe Racers',
    visibility: 'PUBLIC',
    pricePerFraction: 19000,
    currency: 'AED',
    fractionsAvailable: 6,
    imageUrl: 'https://images.unsplash.com/photo-1595180633800-410a56828b6d?q=80&w=2862&auto=format&fit=crop',
    description: 'Modern classic perfection. Hand-built in England with Öhlins suspension and Brembo brakes.',
    specs: [
      { label: 'Style', value: 'Cafe' },
      { label: 'Power', value: '76 hp' },
      { label: 'Build', value: 'Handmade' }
    ],
    details: {
        year: '2022',
        engine: '961cc Parallel Twin',
        power: '76 hp',
        torque: '81 Nm',
        weight: '230 kg',
        seatHeight: '810 mm',
        electronics: ['ABS']
    }
  },
  {
    id: '26',
    title: 'Triumph Thruxton RS',
    location: 'City Walk, UAE',
    type: 'MOTORBIKE',
    subtype: 'Classics / Cafe Racers',
    visibility: 'PUBLIC',
    pricePerFraction: 15000,
    currency: 'AED',
    fractionsAvailable: 7,
    imageUrl: 'https://images.unsplash.com/photo-1614165936126-2ed18e471b10?q=80&w=2938&auto=format&fit=crop',
    description: 'Final Edition. The definitive cafe racer. Competition Green metallic paint and gold lining.',
    specs: [
      { label: 'Engine', value: '1200 cc' },
      { label: 'Torque', value: '112 Nm' },
      { label: 'Ed.', value: 'Final' }
    ],
    details: {
        year: '2024',
        engine: '1200cc Parallel Twin',
        power: '103 hp',
        torque: '112 Nm',
        weight: '197 kg',
        seatHeight: '810 mm',
        electronics: ['Ride Modes', 'Switchable TC']
    }
  },
  // Dirt / Motocross
  {
    id: '27',
    title: 'KTM 450 SX-F Factory',
    location: 'XQuarry, UAE',
    type: 'MOTORBIKE',
    subtype: 'Dirt / Motocross',
    visibility: 'PUBLIC',
    pricePerFraction: 12000,
    currency: 'AED',
    fractionsAvailable: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516215322122-383794121526?q=80&w=2940&auto=format&fit=crop',
    description: 'The closest thing to a works machine. Akrapovič slip-on, factory wheels, and Red Bull graphics.',
    specs: [
      { label: 'Weight', value: '102 kg' },
      { label: 'Power', value: '63 hp' },
      { label: 'Use', value: 'Track' }
    ],
    details: {
        year: '2024',
        engine: '449.9cc Single',
        power: '63 hp',
        torque: 'N/A',
        weight: '102.6 kg',
        seatHeight: '958 mm',
        electronics: ['Launch Control', 'Quickshifter']
    }
  },
  {
    id: '28',
    title: 'Husqvarna FC 450',
    location: 'Desert MX Track, UAE',
    type: 'MOTORBIKE',
    subtype: 'Dirt / Motocross',
    visibility: 'PUBLIC',
    pricePerFraction: 11500,
    currency: 'AED',
    fractionsAvailable: 6,
    imageUrl: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2940&auto=format&fit=crop',
    description: 'Rockstar Edition. ProTaper handlebars, factory racing triple clamps, and advanced electronics.',
    specs: [
      { label: 'Susp.', value: 'WP XACT' },
      { label: 'Map', value: 'Select' },
      { label: 'Ed.', value: 'Rockstar' }
    ],
    details: {
        year: '2024',
        engine: '449.9cc Single',
        power: '63 hp',
        torque: 'N/A',
        weight: '102 kg',
        seatHeight: '940 mm',
        electronics: ['Map Select Switch', 'Traction Control']
    }
  }
];

// Helper to generate weeks starting from today (Monday aligned)
export const generateWeeks = (): CalendarWeek[] => {
  const weeks: CalendarWeek[] = [];
  const today = new Date();
  // Adjust to next Monday
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const nextMonday = new Date(today.setDate(diff + 7));

  for (let i = 0; i < 8; i++) {
    const start = new Date(nextMonday);
    start.setDate(nextMonday.getDate() + (i * 7));
    weeks.push({
      startDate: start.toISOString(),
      isBooked: Math.random() > 0.7,
      isRentBack: false,
      price: 1500 + Math.floor(Math.random() * 1000)
    });
  }
  return weeks;
};
