import { ElementType } from "react";

export interface PaymentMethodType {
  id: string;
  name: string;
  description: string;
  icon: ElementType;
  className: string;
  badge?: string;
}
