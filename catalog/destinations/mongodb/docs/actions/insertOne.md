### Insert One

Inserts a single document into a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/)

***Parameters***

<table class="tg">
  <thead>
    <tr>
      <th><span style="font-weight:bold">Name</span></th>
      <th><span style="font-weight:bold">Description</span></th>
      <th><span style="font-weight:bold">Type</span></th>
      <th><span style="font-weight:bold">Default</span></th>
      <th><span style="font-weight:bold">Required</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>collection</td>
      <td>MongoDB collection name</td>
      <td>String</td>
      <td>`""`</td>
      <td>true</td>
    </tr>
    <tr>
      <td>payload</td>
      <td>Record to insert into collection</td>
      <td>Object</td>
      <td>`{}</td>
      <td>true</td>
    </tr>
  </tbody>
</table>

***Sample Payload***

```js
{
  "collection": "posts",
  "payload": {
    "name": "My blog post",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "createdAt": new Date().getTime() 
  }
}
```

***Sample Response***

```js
{
  "data": {
    "acknowledged": true,
    "insertedId": "636c1406dfc1c70029bcb8ea"
  },
  "status": 200
}
```
