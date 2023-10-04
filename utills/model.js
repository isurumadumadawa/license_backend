const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

// Function to load the saved model and normalization metadata
async function loadModelWithMetadata() {
  const modelSavePath = path.join(__dirname, "..", "model/model.json");
  const metadataSavePath = path.join(__dirname, "..", "model/metadata.json"); // Specify the path where the model is saved
  try {
    // Load normalization metadata
    const metadataString = fs.readFileSync(metadataSavePath, "utf8");
    const metadata = JSON.parse(metadataString);

    // Load the model
    const model = await tf.loadLayersModel(`file://${modelSavePath}`);
    console.log("Model loaded successfully.");

    return { model, metadata };
  } catch (error) {
    console.error("Error loading the model:", error);
    return null;
  }
}

async function getRecommendValue(model, metadata, inputData) {
  if (model && metadata) {
    // Extract values from metadata object
    const inputMin = tf.tensor(metadata.inputMin);
    const inputMax = tf.tensor(metadata.inputMax);
    const labelMin = tf.tensor(metadata.labelMin);
    const labelMax = tf.tensor(metadata.labelMax);

    // Normalize the input data using retrieved min-max values
    const inputTensor = tf.tensor2d(inputData);
    const normalizedInput = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));

    // Make predictions using the loaded model
    const predictions = model.predict(normalizedInput);

    // Denormalize the predictions
    const denormalizedPredictions = predictions
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    // Get the predicted change values as an array
    const predictedChanges = denormalizedPredictions.arraySync();

    return predictedChanges.flat();
  }
}

module.exports = {
  loadModelWithMetadata,
  getRecommendValue,
};
