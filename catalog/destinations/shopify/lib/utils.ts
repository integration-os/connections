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
 * a local function that composes the REST URI suffix given Shopify resource(s) and payload
 * @param resource
 * @param secondaryResource
 * @param payload
 */
export function composeUriSuffix(
  { resource, secondaryResource, payload }:
    {resource: string, secondaryResource?: string, payload?: ShopifyAction},
) {
  if (secondaryResource && !payload?.primaryResourceId) {
    throw new Error("Cannot select a secondary resource without a primary resource identifier");
  }

  let path = `/${resource}`;

  if (payload?.primaryResourceId) {
    path += `/${payload.primaryResourceId}`;
  }

  if (secondaryResource) {
    path += `/${secondaryResource}`;

    if (payload.secondaryResourceId) {
      path += `/${payload.secondaryResourceId}`;
    }
  }

  return `${path}.json`;
}
