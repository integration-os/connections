export type RutterDecodedToken = {
  userId: string;
  iat: number;
  exp: number;
}

export type RutterWebhook = {
  id: string;
  url: string;
  isSandbox: boolean;
  disabled: boolean;
  allowlist: {
    allowedTypes: string[];
  }
}
