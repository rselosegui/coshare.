
export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP';
export type Locale = 'en' | 'ar';
export type InfoType = 'MANIFESTO' | 'MEMBERSHIP' | 'LEGAL' | 'CONTACT';
export type ViewState = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'ASSET_DETAIL' | 'VAULT' | 'UPLOAD' | 'PROFILE' | 'SETTINGS' | 'PRIVACY' | 'INFO';

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AGENT' | 'SYSTEM';
  text: string;
  timestamp: Date;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    whatsapp: boolean;
    newDrops: boolean;
    portfolioUpdates: boolean;
  };
  contactMethod: 'WHATSAPP' | 'EMAIL' | 'PHONE';
}

export interface UserPrivacy {
  isGhostMode: boolean; // Hides profile from public directories
  biometricEnabled: boolean; // Requires biometrics for Vault
  dataSharing: boolean; // Third-party partners
  searchableByEmail: boolean; // Allow finding by email
  showVibeTags: boolean; // Show tags on public profile
  showPortfolioValue: boolean; // Show equity on leaderboards
  allowAiLearning: boolean; // AI Concierge personalization
  twoFactorEnabled: boolean; // 2FA status
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  profileImage?: string;
  vibeTags: string[];
  isSeller?: boolean; // New flag for asset uploaders
  wishlist: string[]; // List of Asset IDs
  portfolio: string[]; // List of Asset IDs owned
  settings: UserPreferences;
  privacy: UserPrivacy;
}

// --- DETAILED ASSET SPECS ---

export interface RealEstateDetails {
    bua: string;
    plotSize?: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    completionYear: string;
    view: string;
    serviceCharge?: string;
    floorLevel?: string;
    furnishing?: string;
    poolSpecs?: string;
    amenities?: string[];
}

export interface CarDetails {
    year: string;
    odometer: string;
    engine: string;
    transmission: string;
    exteriorColor: string;
    interiorColor: string;
    warranty: string;
    serviceHistory: string;
    acceleration?: string; // 0-100
    topSpeed?: string;
    modifications?: string[];
}

export interface YachtDetails {
    length: string; // LOA
    beam: string;
    builder: string;
    yearBuilt: string;
    refitYear?: string;
    guests: number;
    cabins: number;
    crew: number;
    cruisingSpeed?: string;
    maxSpeed?: string;
    location: string;
    flag: string;
    engines?: string;
}

export interface MotorbikeDetails {
    year: string;
    engine: string;
    power: string;
    torque: string;
    weight: string;
    seatHeight: string;
    electronics?: string[];
}

export interface Asset {
  id: string;
  title: string;
  location: string;
  type: 'REAL_ESTATE' | 'CAR' | 'YACHT' | 'MOTORBIKE';
  subtype?: string; // e.g. "Supercar", "Desert 4x4"
  visibility: 'PUBLIC' | 'PRIVATE'; // New field for visibility control
  pricePerFraction: number;
  currency: Currency;
  fractionsAvailable: number; // Max 8
  imageUrl: string;
  blurHash?: string;
  specs: { label: string; value: string }[]; // Kept for AssetCard summary
  description: string;
  details: RealEstateDetails | CarDetails | YachtDetails | MotorbikeDetails;
}

export interface CalendarWeek {
  startDate: string; // ISO Date
  isBooked: boolean;
  isRentBack: boolean; // If true, user is monetizing this week
  price: number;
}