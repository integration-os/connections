import Stripe from "stripe";

import {
  StripeModels,
  StripeActions,
  DynamicAction,
  StripeConfig,
  ModelAndAction,
} from "./types";

export const createClient = (config: StripeConfig) =>
  new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

export const getModelAndAction = <T extends StripeModels>(
  action: string,
): ModelAndAction<T> => {
  const [_modelName, ...rest] = action.split(".");
  const actionName = rest.join(".") as StripeActions<T>;

  return {
    modelName: _modelName as T,
    actionName,
  };
};

export const testConnection = async (config: StripeConfig) => {
  const stripe = createClient(config);

  try {
    // Test the connection by trying to list a charge
    await stripe.charges.list({ limit: 1 });

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export const callDynamicAction = async <T extends StripeModels, U = unknown>({
  dataModel,
  action,
  env,
  args,
}: DynamicAction<T, U>) => {
  const stripe = createClient(env);

  if (typeof stripe[dataModel][action] === "function") {
    // @ts-ignore
    return await (stripe[dataModel][action] as (args: U) => Promise<unknown>)(args);
  } else {
    throw new Error(`Expected a function but got: ${typeof stripe[dataModel][action]}`);
  }
};
