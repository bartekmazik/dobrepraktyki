import { Kafka, Consumer } from "kafkajs";

const kafka = new Kafka({
  clientId: "people-detection-consumer",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

let consumer: Consumer | null = null;

export async function initConsumer() {
  if (!consumer) {
    consumer = kafka.consumer({ groupId: "people-detection-group" });
    await consumer.connect();
    await consumer.subscribe({
      topic: "people-detection",
      fromBeginning: true,
    });
    console.log("Kafka Consumer connected and subscribed");
  }
  return consumer;
}

export async function startConsumer() {
  const cons = await initConsumer();

  await cons.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value?.toString() || "{}");
      console.log("Received message from Kafka:", {
        topic,
        partition,
        offset: message.offset,
        data,
      });
    },
  });
}

export async function disconnectConsumer() {
  if (consumer) {
    await consumer.disconnect();
  }
}
