import getProxyDriver from "./xero";

export async function main({ payload, config, action }) {
  console.log(payload, "PAYLOAD");
  console.log(config, "CONFIG");
  console.log(action, "ACTION");
  try {
    const driver = getProxyDriver(config);

    const data = await driver[action](payload);

    return { data, status: 200 };
  } catch (error) {
    throw error;
  }
}
