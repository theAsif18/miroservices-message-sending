const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

const sendMessage = async () => {

  try {
    const connection = await amqp.connect('amqp://localhost');

    const channel = await connection.createChannel();

    await channel.assertQueue("queue1", {
      durable: true
    });

    const correlationId = uuidv4();

    for (let i = 1; i <= 10; i++) {
      const buff = Buffer.from(JSON.stringify({
        test: `Hello world ${i}!!`
      }), 'utf-8');

      const result = channel.sendToQueue("queue1", buff, {
        persistent: true,
        messageId: uuidv4(),
        correlationId: correlationId,
      });
      console.log("result", result);
    }

    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
}

sendMessage();
