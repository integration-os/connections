
![Header](https://github.com/buildable/templates/blob/main/assets/templates.png)

[![Buildable](https://assets.buildable.dev/buildable-logos/powered-by-buildable.svg)](https://buildable.dev) [![GitHub stars](https://img.shields.io/github/stars/buildable/templates)](https://github.com/buildable/templates/stargazers) ![GitHub contributors](https://img.shields.io/github/contributors/buildable/templates) ![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/buildable/templates) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/buildable/templates) [![GitHub issues](https://img.shields.io/github/issues/buildable/templates)](https://github.com/buildable/templates/issues) ![GitHub closed issues](https://img.shields.io/github/issues-closed/buildable/templates) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/buildable/templates) [![GitHub license](https://img.shields.io/github/license/buildable/templates)](https://github.com/buildable/templates) [![Twitter Follow](https://img.shields.io/twitter/follow/BuildableHQ?style=social)](https://twitter.com/BuildableHQ)

---

## Buildable ⚡️

[Buildable](https://buildable.dev/) is an instant backend tool that makes a software developer’s day more delightful. We’re helping engineers breeze through feature development using enterprise-grade tools.

- [x] One-click Databases (Hosted and Self-Hosted)
- [x] Auto-generated APIs
- [x] 1,500+ Open-Source Integration Templates for Coinbase, Stripe, Shopify and hundreds more!
- [x] Managed infrastructure
- [x] Dashboard

## How to Contribute 🚀

### Publishing to the community
To get started with publishing your own templates, take a look at the [CONTRIBUTING.md](CONTRIBUTING.md) file.

### Creating your own private templates (BETA)
If you'd like to create private templates that are only accessible in your Buildable account, you can do so by publishing privately. This feature is currently still in Beta so if you'd like access, send us a request by emailing `friends@buildable.dev` for a private publishing token.

## Documentation 📖

For full documentation, visit [docs.buildable.dev](https://docs.buildable.dev)

To get to know Buildable, visit [Getting Started](https://docs.buildable.dev/introduction/getting-started)

## Community & Support 👥

- [GitHub Issues](https://github.com/buildable/templates/issues). Best for: bugs and errors you encounter using Buildable
- [Discord](https://discord.com/invite/47AJ42Wzys). Best for help with building, discussion about logic best practices, sharing your Flows and hanging out with the community
- [Email Support](https://docs.buildable.dev/help/need-support). Best For: problems with your Flows or infrastructure

## What are Templates? 🤔

[Buildable Templates](https://docs.buildable.dev/core-products/templates) is a collection of open-source functions that save developers hundreds of hours when integrating databases, apps and other complicated logic. They work natively with [Buildable Flows](https://docs.buildable.dev/core-products/flows), which means you can build, test, deploy any integration using Templates in a matter of minutes.

## Getting Started 🏁

To get access to the entire library, simply [create a free developer account](https://welcome.buildable.dev) on Buildable and follow the onboarding tutorial once your developer account is activated. The entire process takes less than 5 minutes. 

To add a Template to your Flow, simply press the `+` button to expose the Template Library, where you can instantly integrate any template within your Flow!

[![Adding Templates in Buildable](https://github.com/buildable/templates/blob/main/assets/buildable-templates.gif)](https://buildable.dev)

## How Templates Work ⚙️

Each Node Template is composed of an `input` and `run` function. Together, they should represent one logic step with a single purpose (i.e. Sending an email with Sendgrid).

### The Input Function
The input function’s sole purpose is to select the data that will be passed into the run function.

It has access to:

- `$trigger` - The Flow's request object
- `$nodes` - The outputs of all Nodes above itself

⚠️ It’s important to make sure your input function is only used for selection and not for processing. Following best practices, you shouldn’t write any logic within the Input function. To enforce this, Buildable purposefully allocates lower resources to input functions.

### The Run Function
The run function is where you write the processing and logic of your node. Whatever is returned in the run function will be the response of the node.

It has access to:

- `input` - The values passed in from the input function

You can view a sample `run` function in the `/sample` directory.

## Demos and Tutorials 📹

We've also got a library of on-demand demo videos and tutorials where we showcase how to use core features in Buildable along with building out real world examples.

You can find these resources below:
- [On-Demand Demos](https://www.buildable.dev/on-demand-demos)
- [Tutorials](https://www.buildable.dev/tutorials)

## Status 🚥
- [x] Alpha: Testing Buildable with a closed set of advisors, investors and technologists
- [x] Private Beta: Closed to a set of early community members and enterprise customers
- [x] Public Beta: Anyone with an invite code can sign up and invite others to the platform
- [x] Public: Production-ready and open to everyone
- [ ] Scale: Support for large organizations (50+ seats)

🎉 Buildable is currently availably publicly and is no longer invite-only! 

Watch this repo to stay notified on all updates ⬇️

[![Star and Watch](https://github.com/buildable/templates/blob/main/assets/star-and-watch.gif)](https://buildable.dev)

## Roadmap 🗺

<a href="https://roadmap.buildable.dev/">
  <img src="https://assets.buildable.dev/catalog/graphics/upvoty.png" width="150" />
</a>

Stay up to date with our roadmap on [UpVoty](https://roadmap.buildable.dev/), where you can request and vote for app features and new templates!

## Contributors ❤️

Bravo and a special thanks to all the awesome people who've contributed to the Template library!

<a href="https://github.com/buildable/templates/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=buildable/templates" />
</a>

## Want to chat? 📬

We'd love to! Reach out to us on [Discord](https://discord.gg/uKydsjsVga) or shoot over an email to [friends@buildable.dev](mailto:friends@buildable.dev).

<br />

### License

© 2022, Buildable Technologies Inc. - Released under the MIT License
