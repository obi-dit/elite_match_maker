export type TransactionResponse<T> = {
  success: boolean;
  transaction: T;
};
export interface UserSubscription {
  id: number;
  userId: number;
  subscriptionId: number;
  stripeCustomerId: string;
  stripeSubscriptionId: null;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  price: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPackage {
  id: number;
  userId: number;
  packageId: number;
  name: string;
  price: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionType {
  id: number;
  userId: number;
  packageId: null;
  subscriptionId: number;
  stripePaymentIntentId: string;
  stripeCheckoutSessionId: string;
  amount: string;
  currency: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  metadata: Metadata;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  package: null;
  subscription: Subscription;
  userSubscription: UserSubscription;
  userPackage: UserPackage;
}

export interface Metadata {
  customerName: string;
  customerEmail: string;
}

export interface Subscription {
  id: number;
  tier: string;
  price: string;
  period: string;
  isActive: boolean;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  fullName: null;
  firstName: string;
  lastName: string;
  age: null;
  email: string;
  password: string;
  whatsappNumber: null;
  gender: string;
  cityOfResidence: null;
  cityOther: null;
  englishProficiency: null;
  heightCm: null;
  weightKg: null;
  isSingleAndAvailable: null;
  comfortableFilming: null;
  traditionalWantsMarriage: null;
  willingToCompete: null;
  children: null;
  willingLieDetector: null;
  consentForMedia: null;
  personalityThreeWords: null;
  relationshipGoals: null;
  attractionToOlderMen: null;
  whyGoodWife: null;
  talentsOrHobbies: null;
  comfortableBikiniChallenges: boolean;
  photo1: null;
  photo2: null;
  photo3: null;
  isApplicantApproved: boolean;
  introVideo: null;
  socialMediaLinks: null;
  isMembershipSubscribed: boolean;
  understandsPrivateShow: boolean;
  understandsNoCompensation: boolean;
  confirmsTruthful: boolean;
  selectedTier: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
