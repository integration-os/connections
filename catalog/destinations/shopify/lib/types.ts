import { AnyObject } from "../../../../types/sourceClassDefinition";

export interface ShopifyAction {
  primaryResourceId?: string | number;
  secondaryResourceId?: string | number;
  data?: AnyObject
}
