## Node.js Source Setup

Check out our [setup guide](https://docs.buildable.dev/) to learn how to get started.

### Install the Buildable Node SDK

`> npm install @buildable/messages`

### Emitting messages

To use the SDK to emit messages, run the following code snippet:

```js
const { createClient } = require('@buildable/messages');

const client = createClient('{{SECRET_KEY}}');

client.emit("user.created", { 
  name: "John Doe"
});
```