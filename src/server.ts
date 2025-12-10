import app from "./app";
import { initProducer, disconnectProducer } from "./kafka/producer";
import { startConsumer, disconnectConsumer } from "./kafka/consumer";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Inicjalizuj Kafka
    await initProducer();
    await startConsumer();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await disconnectProducer();
  await disconnectConsumer();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  await disconnectProducer();
  await disconnectConsumer();
  process.exit(0);
});

startServer();
