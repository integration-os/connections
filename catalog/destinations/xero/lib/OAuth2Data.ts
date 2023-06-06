import { AnyObject } from "../../../../types/destinationClassDefinition";

interface OAuth2Data {
  scopes: string[] | string;
  redirectUri: string;
  accessToken?: string;
  resolved?: AnyObject
}
