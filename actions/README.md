# What are Action Templates?

[Action Templates](/actions/catalog/) are open-source functions that save developers hundreds of hours when integrating databases, apps and other complicated logic. They work natively with [Buildable Workflows](https://docs.buildable.dev/workflows/building-workflows), which means you can build, test, deploy any integration using Templates in a matter of minutes.

Check out the [contribution guidelines](/actions/docs/CONTRIBUTING.md) to start creating your own Actions. 

## How Templates Work

Each Action Template is comprised of an `input` and `run` function. Together, they should represent one logic step with a single purpose (i.e. Sending an email with Sendgrid).

### The Input Function
The `input` function’s sole purpose is to select the data that will be passed into the run function.

It has access to:

- `$body` - The Workflow's body
- `$headers` - The Workflow's headers
- `$env` - Your Environment Variables
- `$actions` - The outputs of all Actions above itself
- `$query` - The Workflow's query

⚠️ It’s important to make sure your input function is only used for selection and not for processing. Following best practices, you shouldn’t write any logic within the input function. To enforce this, Buildable purposefully allocates lower resources to input functions.

### The Run Function
The `run` function is where you write the processing and logic of your Action. Whatever is returned in the run function will be the response of the Action.

It has access to:

- `input` - The values passed in from the input function

You can view a sample `run` function in the [sample directory](actions/sample/).

## Read More

Check out [docs.buildable.dev](https://docs.buildable.dev) to read more on Actions and Workflows.
- [Actions Catalog](https://docs.buildable.dev/connections/action-catalog)
- [Building Workflows](https://docs.buildable.dev/workflows/building-workflows)
- [Managing Workflows](https://docs.buildable.dev/workflows/managing-workflows)
