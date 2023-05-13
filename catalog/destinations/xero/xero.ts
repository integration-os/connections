import { AnyObject, DestinationClassI, TestConnection, Truthy } from "../../../types/destinationClassDefinition";

export class XeroDriver implements DestinationClassI {
  constructor(_: AnyObject) {
    throw Error("Xero driver is not implemented yet");
  }

  async connect(_config?: AnyObject): Promise<void | Truthy> {
    throw Error("Xero driver is not implemented yet");
  }

  async disconnect(): Promise<void | Truthy> {
    throw Error("Xero driver is not implemented yet");
  }

  async testConnection(): Promise<TestConnection> {
    throw Error("Xero driver is not implemented yet");
  }
}

export default function getProxyDriver(config: AnyObject) {
  const driver = new XeroDriver(config);

  return new Proxy(driver, {
    get: (target, prop) => {
      if (typeof driver[prop] === "function") {
        if (prop === "testConnection") {
          return async () => driver.testConnection();
        }

        // Force the proxy to return a Promise that only resolves once the connection has been established
        if (prop === "connect") {
          return async () => {
            await driver.connect(config);
          };
        }

        // Force the proxy to return a Promise that only resolves once the connection has been dropped
        if (prop === "disconnect") {
          return async () => {
            await driver.disconnect();
          };
        }

        return async (payload) => {
          try {
            await driver.connect(config);

            const result = await target[prop](payload);

            await driver.disconnect();

            return result;
          } catch (err) {
            console.log("Error occurred ===> ", err);
            throw err;
          }
        };
      }

      throw new Error(`Method ${prop as string}() not found`);
    },
  });
}
