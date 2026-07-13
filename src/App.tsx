import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import UploadMri from "./components/UploadMri";
import Results from "./components/Results";
import Loading from "./components/Loading";
import TopBar from "./components/TopBar";

interface AnalysisResult {
  predictions: string;
  confidence: string;
  urgency: string;
  image: string;
  isError: boolean;
}

const CLASSES: { [key: number]: string } = {
  0: "Glioma",
  1: "Meningioma",
  2: "Not an MRI",
  3: "No Tumor",
  4: "Pituitary",
};

const App = () => {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [appState, setAppState] = useState<"upload" | "loading" | "result">("upload");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadGraphModel("tfjs_model/model.json");
        setModel(loadedModel);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    }
    loadModel();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleAnalyze = async (file: File) => {
    if (!model) {
      alert("Model is still loading. Please wait a moment.");
      return;
    }

    setAppState("loading");

    try {
      const objectUrl = URL.createObjectURL(file);

      const imgElement = document.createElement("img");
      imgElement.src = objectUrl;

      await new Promise((resolve) => {
        imgElement.onload = resolve;
      });

      const predictions = tf.tidy(() => {
        const tensor = tf.browser
          .fromPixels(imgElement)
          .resizeBilinear([224, 224]);

        const batched = tensor.expandDims(0);
        return model.predict(batched) as tf.Tensor;
      });

      const data = await predictions.data();
      predictions.dispose();

      const maxConfidence = Math.max(...Array.from(data));
      const classIndex = Array.from(data).indexOf(maxConfidence);
      const resultText = CLASSES[classIndex];
      const confidencePercent = (maxConfidence * 100).toFixed(1);

      await new Promise((r) => setTimeout(r, 2000));

      setAnalysisResult({
        predictions: resultText,
        confidence: confidencePercent,
        urgency:
          resultText === "No Tumor" || resultText === "Not an MRI"
            ? "None"
            : "High",
        image: objectUrl,
        isError: false,
      });

      setAppState("result");
    } catch (error) {
      console.error("Analysis failed", error);
      setAnalysisResult({
        predictions: "Error",
        confidence: "0",
        urgency: "None",
        image: "",
        isError: true,
      });
      setAppState("result");
    }
  };

  const handleReset = () => {
    setAppState("upload");
    setAnalysisResult(null);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {appState === "upload" && <UploadMri onClick={handleAnalyze} />}

      {appState === "loading" && <Loading />}

      {appState === "result" && analysisResult && (
        <Results results={analysisResult} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
