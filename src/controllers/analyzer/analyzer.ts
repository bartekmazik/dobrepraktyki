import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import fetch from "node-fetch";

let modelPromise: Promise<cocoSsd.ObjectDetection> | null = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = cocoSsd.load({ base: "lite_mobilenet_v2" }); // lekkie, szybsze
  }
  return modelPromise;
}
async function loadImageFromUrl(url: string): Promise<tf.Tensor3D> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Nie udało się pobrać obrazu, status: ${res.status}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const imageTensor = tf.node.decodeImage(buffer, 3) as tf.Tensor3D;
  return imageTensor;
}

export async function detectPeopleFromUrl(url: string) {
  const model = await getModel();
  const imageTensor = await loadImageFromUrl(url);

  try {
    const predictions = await model.detect(imageTensor);
    const people = predictions.filter((p) => p.class === "person");

    return {
      count: people.length,
      people,
    };
  } finally {
    imageTensor.dispose();
  }
}
