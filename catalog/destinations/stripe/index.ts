import {
  getModelAndAction,
  callDynamicAction,
  testConnection,
} from "./lib/index";
import { StripeConfig } from "./lib/types";

export async function main({
  payload,
  config,
  action,
}: {
  payload: Record<string, unknown>;
  config: StripeConfig;
  action: string;
}) {
  try {
    if (action === "testConnection") {
      const result = await testConnection(config);

      return { data: result, status: 200 };
    }

    const { modelName, actionName } = getModelAndAction(action);

    const result = await callDynamicAction({
      dataModel: modelName,
      action: actionName,
      env: config,
      args: payload,
    });

    return { data: result, status: 200 };
  } catch (error) {
    throw error;
  }
}
