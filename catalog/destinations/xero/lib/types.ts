export interface XeroOAuth2TokenSet {
  access_token: string;
  expires_at: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}
