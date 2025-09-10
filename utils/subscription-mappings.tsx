import { Crown, Globe, Shield, Diamond } from "lucide-react";

export const SubcriptionIconMapping: Record<string, React.ReactNode> = {
  bronze: <Crown className="w-8 h-8" />,
  silver: <Globe className="w-8 h-8" />,
  gold: <Shield className="w-8 h-8" />,
  elitevip: <Diamond className="w-8 h-8" />,
};

export const SubscriptionColorMapping: Record<string, string> = {
  bronze: "from-teal-400 to-teal-600",
  silver: "from-sky-400 to-sky-600",
  gold: "from-teal-500 to-sky-600",
  elitevip: "from-sky-500 to-teal-700",
};

export const SubscriptionCTAMapping: Record<string, string> = {
  bronze: "Start Bronze",
  silver: "Upgrade to Silver",
  gold: "Go Gold",
  elitevip: "Become Elite VIP",
};

export const PopularSubscriptionMapping: Record<string, boolean> = {
  bronze: false,
  silver: true,
  gold: false,
  elitevip: false,
};
