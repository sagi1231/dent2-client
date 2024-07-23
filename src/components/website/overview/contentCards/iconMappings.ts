// src/components/contentCard/iconMappings.ts
import { ReactComponent as IgIcon } from "../../../../assets/Icons/contentCardIcons/content_card_icon_ig.svg";
import { ContentCardType } from "./cardTypes";

// Map the types to their corresponding icon components
export const ContentCardIcons = {
  [ContentCardType.INSTAGRAM]: IgIcon,
} as const;

export type ContentCardIconKey = keyof typeof ContentCardIcons;
