export interface AnyObject {
  [key: string]: any;
}

export type Truthy = boolean | number | string | AnyObject;

export interface TestConnection {
  success: boolean;
  message: string;
}

export interface DestinationClassI {
  connect: (config: AnyObject) => Promise<void | Truthy>;

  disconnect: () => Promise<void | Truthy>;

  testConnection: () => Promise<TestConnection>;
}
