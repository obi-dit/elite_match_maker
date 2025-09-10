import { SupscriptionPeriod } from "@/utils/enum";

export interface Feature {
  id: string;
  name: string;
  description: string;
}

export interface SubscriptionFeature {
  feature: Feature;
  isIncluded: boolean;
}

export interface Subscription {
  id: string;
  tier: string;
  price: number;
  period: SupscriptionPeriod;
  color: string;
  icon?: React.ReactNode;
  subscriptionFeatures: SubscriptionFeature[];
  popular?: boolean;
  cta: string;
}
