import { RefProps } from "./refProps";

export interface BlockProps {
  isEditing: boolean;
  blockIndex: number;
  handleBlur: (blockIndex: number) => void;
  ref: React.RefObject<RefProps>;
}
