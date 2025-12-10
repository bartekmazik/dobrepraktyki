import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "people-detection-api",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

let producer: Producer | null = null;

export async function initProducer() {
  if (!producer) {
    producer = kafka.producer();
    await producer.connect();
    console.log("Kafka Producer connected");
  }
  return producer;
}

export async function sendToKafka(topic: string, message: any) {
  const prod = await initProducer();
  await prod.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
}

export async function disconnectProducer() {
  if (producer) {
    await producer.disconnect();
  }
}
