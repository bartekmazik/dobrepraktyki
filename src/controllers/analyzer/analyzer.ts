import fetch from "node-fetch";
import { sendToKafka } from "../../kafka/producer";

const USE_FAKE_ANALYZER = process.env.USE_FAKE_ANALYZER === "true";

type PersonPrediction = {
  bbox: number[];
  score: number;
};

let modelPromise: Promise<{
  detect: (
    img: any
  ) => Promise<Array<{ class: string; bbox: number[]; score: number }>>;
}> | null = null;

async function getModel() {
  if (!modelPromise) {
    const tf = await import("@tensorflow/tfjs-node");
    const cocoSsd = await import("@tensorflow-models/coco-ssd");

    modelPromise = cocoSsd.load({ base: "lite_mobilenet_v2" });
  }
  return modelPromise;
}

async function loadImageFromUrl(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Nie udało się pobrać obrazu, status: ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const tf = await import("@tensorflow/tfjs-node");
  const imageTensor = tf.node.decodeImage(buffer, 3);
  return imageTensor;
}

export async function detectPeopleFromUrl(url: string) {
  if (USE_FAKE_ANALYZER) {
    const fakeCount = Math.floor(Math.random() * 5);

    await sendToKafka("people-detection", {
      url,
      count: fakeCount,
      timestamp: new Date().toISOString(),
      people: [],
    });

    return {
      count: fakeCount,
      people: [] as PersonPrediction[],
    };
  }

  const model = await getModel();
  const imageTensor = await loadImageFromUrl(url);

  try {
    const predictions = await model.detect(imageTensor as any);
    const people = predictions.filter((p) => p.class === "person");

    await sendToKafka("people-detection", {
      url,
      count: people.length,
      timestamp: new Date().toISOString(),
      people: people.map((p) => ({
        bbox: p.bbox,
        score: p.score,
      })),
    });

    return {
      count: people.length,
      people: people as PersonPrediction[],
    };
  } finally {
    (imageTensor as any).dispose?.();
  }
}
