# Creating Source Connections

This is where we build and share our App Connections for popular and useful apps like Stripe, Shopify, and many more.

The class has the below methods and your implementation **must** not change the TypeScript interface. The class will be used to communicate and manage the `service (i.e. github)` webhook.

## Class Definition

### `constructor`

- Receives all the keys mentioned in the **`authSecrets`** object, in the definition.
- Should create an instance of the integration with the auth keys

### `init`

- Caveats
  - If `webhookData` returns an object, then the subscribe and unsubscribe actions will be passed `webhookId (webhook id)`
  - If `webhookData` returns an array of objects, then the subscribe and unsubscribe actions will be passed `webhookIds (array of webhook ids)`

### `verifyWebhookSignature`

- If the verification fails, an error must be thrown.

### `subscribe`

- You are given only the new events to subscribe to

### `unsubscribe`

- You are given only the events to unsubscribe to

### `getWebhooks`

- Retrieves all the webhooks created by Buildable

### `getSubscribedEvents`

- Retrieves all the currently subscribed events (to cross reference / sync)

### `deleteWebhookEndpoint`

- Deletes a webhook, given its webhook id

### `testConnection`

- Should authenticate as many of the auth keys as possible
- Must throw an error if unable to establish a connection
- If any keys cannot be tested, this must be added in the markdown notes in the definition (`frontend.options.docs`)

## Sample Integration Definition

```json
{
  "title": "Stripe",
  "description": "Payment processing and ecommerce",
  "apiVersion": "2020-03-02",
  "platform": "stripe",
  "category": "payments",
  "image": "https://assets.buildable.dev/catalog/node-templates/stripe.svg",
  "tags": ["payments", "stripe", "ecommerce"],
  "authentication": [
    {
      "name": "STRIPE_SECRET_KEY",
      "label": "Enter your Stripe Secret Key",
      "placeholder": "sk_test_Hrs6SAopgFPF0bZXSN3f6ELN"
    }
  ],
  "eventSchema": {
    "id": "evt_1CiPtv2eZvKYlo2CcUZsDcO6",
    "object": "event",
    "api_version": "2018-05-21",
    "created": 1530291411.0,
    "data": {
      "object": {
        "id": "src_1CiPsl2eZvKYlo2CVVyt3LKy",
        "object": "source",
        "amount": 1000.0,
        "client_secret": "src_client_secret_D8hHhtdrGWQyK8bLM4M3uFQ6",
        "created": 1530291339.0,
        "currency": "eur",
        "flow": "redirect",
        "livemode": false,
        "metadata": {},
        "owner": {
          "address": null,
          "email": null,
          "name": null,
          "phone": null,
          "verified_address": null,
          "verified_email": null,
          "verified_name": "Jenny Rosen",
          "verified_phone": null
        },
        "redirect": {
          "failure_reason": null,
          "return_url": "https://minkpolice.com",
          "status": "succeeded",
          "url": "https://hooks.stripe.com/redirect/authenticate/src_1CiPsl2eZvKYlo2CVVyt3LKy?client_secret=src_client_secret_D8hHhtdrGWQyK8bLM4M3uFQ6"
        },
        "sofort": {
          "country": "DE",
          "bank_code": "DEUT",
          "bank_name": "Deutsche Bank",
          "bic": "DEUTDE2H",
          "iban_last4": "3000",
          "statement_descriptor": null,
          "preferred_language": null
        },
        "statement_descriptor": null,
        "status": "chargeable",
        "type": "sofort",
        "usage": "single_use"
      }
    },
    "livemode": false,
    "pending_webhooks": 0.0,
    "request": {
      "id": null,
      "idempotency_key": null
    },
    "type": "source.chargeable"
  },
  "settings": {
    "parseWebhookBody": false,
    "hasSubscriptionDelay": false,
    "subscriptionDelayMultiplier": 0.0
  },
  "paths": {
    "id": "_.body.id",
    "event": "_.body.type",
    "payload": "_.body",
    "secret": "_.body.secret",
    "signature": "_.headers.stripe-signature"
  },
  "events": [
    {
      "name": "account.application.authorized",
      "description": "",
      "group": ""
    },
    {
      "name": "account.application.deauthorized",
      "description": "",
      "group": ""
    }
    // ... etc.
  ]
}
```
