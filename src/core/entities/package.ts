import { PackageType } from "../types/packageType";

export interface Package {
  type: PackageType;
  maxWebsites: number;
  maxArticles: number;
  monthlyCost: number; // USD
  name: string;
  description: string;
  bullets: string[];
  productId: string;
  hideOnUi?: boolean;
}
