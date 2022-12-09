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

export const callDynamicAction = async <T extends StripeModels, U = unknown>({
  dataModel,
  action,
  env,
  args,
}: DynamicAction<T, U>) => {
  const stripe = createClient(env);

  return await (stripe[dataModel][action] as (args: U) => Promise<unknown>)(
    args,
  );
};
