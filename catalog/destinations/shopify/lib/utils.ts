import { ShopifyAction } from "./types";

/**
 * extract corresponding HTTP method from action string
 * @param method
 */
export function extractMethod(method: string): "POST" | "PUT" | "DELETE" {
  switch (method.trim().toLowerCase()) {
    case "create":
      return "POST";
    case "update":
      return "PUT";
    case "delete":
      return "DELETE";
    default:
      throw new Error(`Method ${method} not supported`);
  }
}

/**
 * a local function that composes the REST URI suffix given a payload
 * @param resource
 * @param secondaryResource
 * @param payload
 */
export function composeUriSuffix(resource: string, secondaryResource?: string, payload?: ShopifyAction) {
  let path = `/${resource}`;

  if (payload.id) {
    path += `/${payload.id}`;
  }

  if (secondaryResource) {
    path += `/${secondaryResource}`;
  }

  return `${path}.json`;
}
