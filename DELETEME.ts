import RabbitMQIntegration from "./catalog/sources/rabbitmq/rabbitmq";

const rabbitMQ = new RabbitMQIntegration({
  RABBITMQ_URL: "localhost",
  RABBITMQ_QUEUE: "z",
});

rabbitMQ.init({ webhookUrl: "", events: ["consumer"] }).then(console.log).catch(console.error);
