import Stripe from "stripe";

export type StripeConfig = {
  STRIPE_SECRET_KEY: string;
};

export type StripeModels = keyof typeof Stripe.prototype;
export type StripeActions<T extends StripeModels> =
  keyof typeof Stripe.prototype[T];

export type ModelAndAction<T extends StripeModels> = {
  modelName: T;
  actionName: StripeActions<T>;
};

export type DynamicAction<T extends StripeModels, U = unknown> = {
  dataModel: T;
  action: StripeActions<T>;
  env: StripeConfig;
  args: U;
};

export type RunStripeActionArgs<T extends StripeModels, U = unknown> = {
  env: StripeConfig;
  dataModel: T;
  action: StripeActions<T>;
  args: U;
};
