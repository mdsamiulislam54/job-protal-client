import { ElementType } from "react";
export interface NavItem {
  name: string;
  href: string;
  icon?: ElementType<{ size?: number; className?: string }>;
}