import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import UploadMri from "./components/UploadMri";
import Loading from "./components/Loading";
import Results from "./components/Results";
import { FiSun, FiMoon } from "react-icons/fi";
import "./App.css";

export interface AnalysisResult {
  predictions: string;
  confidence: string;
  urgency: string;
  image: string;
  isError: boolean;
  classProbabilities?: { label: string; percentage: number }[];
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleAnalyze = async (file: File) => {
    if (!model) {
      alert("Model is still loading. Please wait a moment.");
      return;
    }

    const startTime = Date.now();
    setAppState("loading");

    try {
      const objectUrl = URL.createObjectURL(file);
      const imgElement = document.createElement("img");
      imgElement.src = objectUrl;

      await new Promise((resolve, reject) => {
        imgElement.onload = resolve;
        imgElement.onerror = reject;
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

      const scoresArray = Array.from(data);
      const maxConfidence = Math.max(...scoresArray);
      const classIndex = scoresArray.indexOf(maxConfidence);
      const resultText = CLASSES[classIndex];
      const confidencePercent = (maxConfidence * 100).toFixed(1);

      const sumProbabilities = scoresArray.reduce((acc, curr) => acc + curr, 0);
      const classProbabilities = scoresArray.map((prob, idx) => ({
        label: CLASSES[idx],
        percentage: sumProbabilities > 0 ? parseFloat(((prob / sumProbabilities) * 100).toFixed(1)) : 0,
      }));

      // Smooth minimum display time for the scanning animation (1.8s)
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1800 - elapsedTime);
      if (remainingTime > 0) {
        await new Promise((r) => setTimeout(r, remainingTime));
      }

      setAnalysisResult({
        predictions: resultText,
        confidence: confidencePercent,
        urgency: resultText === "No Tumor" || resultText === "Not an MRI" ? "None" : "High",
        image: objectUrl,
        isError: false,
        classProbabilities,
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
    <div className="app_wrapper">
      <header className="app_header">
        <div className="brand_group">
          <span className="brand_dot" />
          <h1 className="brand_title">NeuroScan</h1>
          <span className="model_status">
            {model ? (
              <span className="status_ready" title="TensorFlow.js model loaded">
                ● Ready
              </span>
            ) : (
              <span className="status_loading" title="Loading TensorFlow.js model...">
                ○ Loading model...
              </span>
            )}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="theme_toggle"
          aria-label="Toggle theme"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      <main className="main_container">
        {appState === "upload" && (
          <UploadMri onAnalyze={handleAnalyze} isModelReady={!!model} />
        )}

        {appState === "loading" && <Loading />}

        {appState === "result" && analysisResult && (
          <Results results={analysisResult} onReset={handleReset} />
        )}
      </main>

      <footer className="app_footer">
        <span>Private & on-device • TensorFlow.js</span>
      </footer>
    </div>
  );
};

export default App;
