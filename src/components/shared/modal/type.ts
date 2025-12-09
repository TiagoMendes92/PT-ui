import type { ReactNode } from "react";

export type ModalProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onDismiss: () => void;
};
