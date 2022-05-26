# Creating Node Templates

To create and publish your own templates, simply follow the steps below.

### 1. Clone this repository ✅

```
git clone https://github.com/buildable/templates.git
```

### 2. Create a branch for your template ✅

`git checkout -b feature/utilities/your-template-name`

### 3. Copy the boilerplate folder into the proper directory ✅

Copy the `sample` folder into the respective location within the `templates` folder.

Each template folder is grouped in a parent directory that relates to its platform. For example, the <a href="https://www.twilio.com/" target="_blank">Twilio</a> action to send an SMS message should be stored in the following path structure:

```
├── templates/
│   ├── twilio/
│       ├── Send SMS/
│           ├── CHANGELOG.md
│           ├── config.json
|           ├── input.js
|           └── run.js
```

General templates that do not fall under the category of any vendor should be added under `templates/utilities/`.

### 4. Update the `config.json` file ✅

The `config.json` file contains all the settings for your template. Below are the descriptions for each configuration parameter.

<table>
<thead>
  <tr>
    <th>Setting Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the node. This should represent the output of out your run function.</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>The template title.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The description of the template.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>This can be either "js-function" for templates that run synchronous logic and do not require access to create requests to external endpoints or "js-request-function" for templates that run asynchronous logic and do require access to create requests to external endpoints. </td>
  </tr>
  <tr>
    <td>envVars</td>
    <td>Object</td>
    <td>An object of objects for each environment variable that your template requires.</td>
  </tr>
  <tr>
    <td>price</td>
    <td>String</td>
    <td>The pricing type of your template. This can be "free" or "paid". Currently, only free templates are supported.</td>
  </tr>
  <tr>
    <td>fee</td>
    <td>Number</td>
    <td>The cost of your template.</td>
  </tr>
  <tr>
    <td>image</td>
    <td>String</td>
    <td>The image url for your template's icon.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category your template falls under. i.e. "web3".</td>
  </tr>
  <tr>
    <td>accessType</td>
    <td>String</td>
    <td>This refers to the accessibility of the template itself. It can either be "open", "read-only" or "private". Currently, only "open" templates are supported.</td>
  </tr>
  <tr>
    <td>language</td>
    <td>String</td>
    <td>The language of your template. Currently, only javascript templates are supported.</td>
  </tr>
  <tr>
    <td>platform</td>
    <td>String</td>
    <td>The platform your template relates to. i.e. "coinbase". If this does not apply to your template, pass in an empty string as the value.</td>
  </tr>
  <tr>
    <td>tags</td>
    <td>Array</td>
    <td>An array of strings for tags that relate to your template. We recommend using tags with keywords that are not found in your template title or description to increase searchability. Tags are limited to a maximum of 3.</td>
  </tr>
  <tr>
    <td>stateType</td>
    <td>String</td>
    <td>This can either be "stateless" or "stateful".</td>
  </tr>
  <tr>
    <td>__version</td>
    <td>String</td>
    <td>The version of your template.</td>
  </tr>
</tbody>
</table>

A sample [config.json](sample/config.json) file is visible inside the `sample/` directory.

### 5. Update the `input.js` file ✅

Update your `input.js` file to set the input values that will be passed into your run function. Read more about the `input` function in our [docs](https://docs.buildable.dev/core-products/flows/add-nodes-to-a-flow#what-makes-up-a-node).

A sample [input.js](sample/input.js) file is visible inside the `sample/` directory.

### 6. Update the `run.js` file ✅

Write your template's main logic within the `run.js` file. Read more about the `run` function in our [docs](https://docs.buildable.dev/core-products/flows/add-nodes-to-a-flow#what-makes-up-a-node).

A sample [run.js](sample/run.js) file is visible inside the `sample/` directory.

### 7. Update the `CHANGELOG.md` file ✅

You'll notice that each template folder contains a `CHANGELOG.md` file. When creating a template, ensure that you've also copied this file over from the `sample/` folder. 

Update the sample `CHANGELOG.md` file to reflect the appropriate information about your template.

### 8. Create a pull request ✅

Once you've tested and finished your template, create a pull request on the `development` branch of this repository. Once approved and merged to main, your template will be live on Buildable, for the entire community!

---

### Testing your code 💡

To test your templates, you can write your logic within a Node in a [Buildable Flow](https://docs.buildable.dev/core-products/flows/creating-a-flow) to ensure everything works as expected.

### Code formatting

To format the code structure of the templates, simply run:

```
npm run prettier
```

### Tracking changes 📝

All updates to any template should be carefully documented in this file, following the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) structure and adhering to [Semantic Versioning](http://semver.org/).

### Creating your own private templates (BETA) 🤫

If you'd like to create private templates that are only accessible in your Buildable account, you can do so by publishing privately. This feature is currently still in Beta so if you'd like access, send us a request by emailing `friends@buildable.dev` for a private publishing token.
