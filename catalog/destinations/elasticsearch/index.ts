import getProxyDriver from "./elasticsearch";

export async function main({ payload, config, action }) {
  try {
    const driver = getProxyDriver(config);

    const data = await driver[action](payload);

    return { data, status: 200 };
  } catch (error) {
    throw error;
  }
}
