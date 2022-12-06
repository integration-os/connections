## Node.js Source Setup

To use the [Node.js SDK](https://www.npmjs.com/package/@buildable/client), run the following code snippet. Check out our [quick start guide](https://docs.buildable.dev/) for more info.

```js
const { createClient } = require('@buildable/client');

const client = createClient('{{SECRET_KEY}}');

// Emit custom events using a name and payload
client.emit("user.created", { 
  name: "John Doe"
});
```