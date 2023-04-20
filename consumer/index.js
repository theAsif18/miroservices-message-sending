const amqp = require('amqplib');

const getMessage = async () => {

  const connection = await amqp.connect('amqp://localhost');

  const channel = await connection.createChannel();

  await channel.assertQueue("queue1", {
    durable: true
  });

  channel.consume("queue1", (message) => {
    // console.log("[%s] Received with id (%s) message: %s", message.properties.correlationId, message.properties.messageId, message.content.toString());
    console.log(`${message.properties.correlationId} Received with id (${message.properties.messageId}) message: ${message.content.toString()}`);
    channel.ack(message);
  })
}

getMessage();