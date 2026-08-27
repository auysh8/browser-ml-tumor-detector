import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import UploadMri from "./components/UploadMri";
import Results from "./components/Results";
import Loading from "./components/Loading";
import TopBar from "./components/TopBar";
import About from "./components/About";
import LandingPage from "./components/LandingPage";
import ScanArchive from "./components/ScanArchive";
import "./App.css";

export interface ArchiveEntry {
  id: string;
  timestamp: string;
  filename: string;
  result: AnalysisResult;
}

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
  const [currentTab, setCurrentTab] = useState<"landing" | "detector" | "archive" | "about">("landing");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ArchiveEntry[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleAnalyze = async (file: File) => {
    if (!model) {
      alert("Model is loading. Please wait a moment.");
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

      // Ensure loading animation runs for at least 2 seconds (2000ms)
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);
      if (remainingTime > 0) {
        await new Promise((r) => setTimeout(r, remainingTime));
      }

      const resultObj: AnalysisResult = {
        predictions: resultText,
        confidence: confidencePercent,
        urgency:
          resultText === "No Tumor" || resultText === "Not an MRI"
            ? "None"
            : "High",
        image: objectUrl,
        isError: false,
        classProbabilities,
      };

      setAnalysisResult(resultObj);

      const newEntry: ArchiveEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        filename: file.name,
        result: resultObj,
      };

      setScanHistory((prev) => [newEntry, ...prev]);

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
    <div className={`workstation_frame ${isDarkMode ? "dark" : ""} ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Left Sidebar */}
      <TopBar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* Main Right Area */}
      <main className="main_panel bg-dotted-grid">
        <div>
          {/* Main Panel Header */}
          <div className="panel_header">
            <div className="header_titles">
              <h1 className="main_title">
                {currentTab === "landing"
                  ? "NeuroScan AI"
                  : currentTab === "about"
                  ? "Model Specs"
                  : currentTab === "archive"
                  ? "Scan History"
                  : "Diagnostic Workstation"}
              </h1>
            </div>
          </div>

          {/* Active View */}
          {currentTab === "landing" && (
            <LandingPage
              onLaunchDashboard={() => setCurrentTab("detector")}
              onViewModelSpecs={() => setCurrentTab("about")}
            />
          )}

          {currentTab === "about" && <About />}

          {currentTab === "archive" && (
            <ScanArchive
              history={scanHistory}
              onSelectResult={(res) => {
                setAnalysisResult(res);
                setAppState("result");
                setCurrentTab("detector");
              }}
              onClearHistory={() => setScanHistory([])}
              onNewScan={() => {
                handleReset();
                setCurrentTab("detector");
              }}
            />
          )}

          {currentTab === "detector" && (
            <>
              {appState === "upload" && <UploadMri onClick={handleAnalyze} />}

              {appState === "loading" && <Loading />}

              {appState === "result" && analysisResult && (
                <Results results={analysisResult} onReset={handleReset} />
              )}
            </>
          )}
        </div>

        {/* Editorial Footer */}
        <footer className="panel_footer">
          <div>
            <span>NeuroScan AI Workstation</span>
          </div>
          <div className="team_names">
            <span>TensorFlow.js Engine</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
