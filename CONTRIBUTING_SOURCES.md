# Creating Source Connections

This is where we build and share our App Connections for popular and useful apps like Stripe, Shopify, and many more.

## Setup

1. Fork this repository

2. Create a branch for your work

Create a folder in the [catalog](/catalog/) that matches the name of the connection that is being created. Copy over the [sample definition file](/sample/source/config.json) and [sample changelog file](/sample/source/CHANGELOG.md) into the folder and begin creating the Class file.

```
├── catalog/
│   ├── stripe/
│       ├── CHANGELOG.md
│       ├── config.json
|       └── stripe.ts
```

Once you've tested and finished your Source Connection, create a pull request on the `development` branch of this repository from your forked repository's branch. Once approved and merged to main, your Connection will be live on Event, for the entire community!

## Class Definition

The class has the below methods and your implementation **must** not change the [TypeScript interface](/types/sourceClassDefinition.d.ts). The class will be used to communicate and manage the `service (i.e. github)` webhook.

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

- Retrieves all the webhooks created by Event

### `getSubscribedEvents`

- Retrieves all the currently subscribed events (to cross reference / sync)

### `deleteWebhookEndpoint`

- Deletes a webhook, given its webhook id

### `testConnection`

- Should authenticate as many of the auth keys as possible
- Must throw an error if unable to establish a connection
- If any keys cannot be tested, this must be added in the markdown notes in the definition (`frontend.options.docs`)

## Sample Source Connection Definition

You can view a sample Source Connection definition in the [sample folder](/sample/source/).
