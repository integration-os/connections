## Node.js Source Setup

To use the [Node.js SDK](https://www.npmjs.com/package/@event-inc/emit), run the following code snippet. Check out our [quick start guide](https://docs.buildable.dev/) for more info.

```js
const { createClient } = require('@event-inc/emit');

const client = createClient('{{SECRET_KEY}}');

// Emit custom events using a name and payload
client.emit("user.created", { 
  name: "John Doe"
});
```