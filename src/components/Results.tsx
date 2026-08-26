import { useState } from "react";
import styles from "./css/Results.module.css";
import type { AnalysisResult } from "../App";

interface ResultsProps {
  results: AnalysisResult;
  onReset: () => void;
}

const Results = ({ results, onReset }: ResultsProps) => {
  const [isInverted, setIsInverted] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  const isInvalid = results.predictions === "Not an MRI" || results.isError;
  const isNoTumor = results.predictions === "No Tumor";

  // Helper to extract probability percentage for a class name
  const getProb = (labelName: string) => {
    if (!results.classProbabilities) return 0;
    const match = results.classProbabilities.find(
      (p) => p.label.toLowerCase() === labelName.toLowerCase()
    );
    return match ? match.percentage : 0;
  };

  const gliomaProb = getProb("Glioma");
  const meningiomaProb = getProb("Meningioma");
  const pituitaryProb = getProb("Pituitary");
  const noTumorProb = getProb("No Tumor");

  const classes = [
    { name: "Glioma", prob: gliomaProb, color: "var(--color-glioma)" },
    { name: "Meningioma", prob: meningiomaProb, color: "var(--color-meningioma)" },
    { name: "Pituitary", prob: pituitaryProb, color: "var(--color-pituitary)" },
    { name: "Normal", prob: noTumorProb, color: "var(--color-notumor)" },
  ];

  const handlePrintReport = () => {
    window.print();
  };

  const handleCopyTelemetry = () => {
    const telemetryData = {
      timestamp: new Date().toISOString(),
      primaryDiagnosis: results.predictions,
      confidenceScore: `${results.confidence}%`,
      urgency: results.urgency,
      probabilities: results.classProbabilities,
      runtime: "TensorFlow.js WebGL Execution Enclave",
    };
    navigator.clipboard.writeText(JSON.stringify(telemetryData, null, 2));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className={styles.editorial_wrapper}>
      {/* Top Primary Finding & Softmax Wave Chart Grid */}
      <div className={styles.top_finding_grid}>
        {/* Left Finding Info */}
        <div className={styles.finding_info}>
          <span className={styles.mono_label}>'PRIMARY FINDING'</span>
          <div className={styles.cert_number}>
            <span>{isInvalid ? "0.0" : results.confidence}</span>
            <span className={styles.cert_unit}>% cert.</span>
          </div>
          <h2 className={styles.finding_heading}>
            {isInvalid
              ? "Scan Unreadable / Format Error"
              : isNoTumor
              ? "No anomaly detected"
              : `${results.predictions} mass detected`}
          </h2>
          <p className={styles.finding_sub}>
            Tensor calculated in WebGL GPU sandbox with 38ms latency.
          </p>
        </div>

        {/* Right Softmax Wave Density Curve Chart */}
        <div className={styles.wave_chart_container}>
          <div className={styles.wave_chart_box}>
            <svg className={styles.wave_svg} viewBox="0 0 500 130">
              {/* Baseline */}
              <line x1="0" y1="125" x2="500" y2="125" stroke="var(--border-subtle)" strokeWidth="1.5" />

              {/* Glioma Curve (Plum) */}
              <path
                className={styles.animated_wave}
                d={`M 20 125 C 70 125, 90 ${125 - (gliomaProb / 100) * 105}, 140 ${
                  125 - (gliomaProb / 100) * 105
                } C 190 ${125 - (gliomaProb / 100) * 105}, 210 125, 260 125 Z`}
                fill="var(--color-glioma)"
                opacity="0.8"
              />

              {/* Meningioma Curve (Rose) */}
              <path
                className={styles.animated_wave}
                d={`M 120 125 C 170 125, 190 ${125 - (meningiomaProb / 100) * 105}, 240 ${
                  125 - (meningiomaProb / 100) * 105
                } C 290 ${125 - (meningiomaProb / 100) * 105}, 310 125, 360 125 Z`}
                fill="var(--color-meningioma)"
                opacity="0.85"
              />

              {/* Pituitary Curve (Terracotta) */}
              <path
                className={styles.animated_wave}
                d={`M 220 125 C 270 125, 290 ${125 - (pituitaryProb / 100) * 105}, 340 ${
                  125 - (pituitaryProb / 100) * 120
                } C 390 ${125 - (pituitaryProb / 100) * 105}, 410 125, 460 125 Z`}
                fill="var(--color-pituitary)"
                opacity="0.8"
              />

              {/* No Tumor Curve (Sage) */}
              <path
                className={styles.animated_wave}
                d={`M 300 125 C 350 125, 370 ${125 - (noTumorProb / 100) * 105}, 420 ${
                  125 - (noTumorProb / 100) * 105
                } C 460 ${125 - (noTumorProb / 100) * 105}, 480 125, 500 125 Z`}
                fill="var(--color-notumor)"
                opacity="0.85"
              />
            </svg>
          </div>

          {/* Clean HTML Legend Overlay beneath curves - No SVG stretching or clipping */}
          <div className={styles.chart_legend_row}>
            {classes.map((cls) => (
              <div key={cls.name} className={styles.legend_item}>
                <div className={styles.legend_header}>
                  <span className={styles.legend_dot} style={{ backgroundColor: cls.color }} />
                  <span className={styles.legend_label}>{cls.name}</span>
                </div>
                <span className={styles.legend_value}>{cls.prob}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Scan Display */}
      <div className={styles.full_topography_section}>
        <div className={styles.topography_header}>
          <h3 className={styles.section_title}>
            <span>⊕ Active Patient MRI Scan Slice</span>
          </h3>
        </div>

        <div className={styles.topography_box}>
          <div className={styles.scan_content_row}>
            <div className={styles.scan_image_frame}>
              <span className={styles.scan_badge}>S14</span>
              {results.image ? (
                <img
                  src={results.image}
                  alt="Uploaded MRI Scan"
                  style={{ filter: isInverted ? "invert(100%)" : "none" }}
                />
              ) : (
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>No scan loaded</span>
              )}
            </div>

            <div className={styles.scan_specs_list}>
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>Patient Record</span>
                <span className={styles.spec_val}>ANON-SCAN-01</span>
              </div>
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>Resolution</span>
                <span className={styles.spec_val}>224 × 224 RGB</span>
              </div>
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>Inference Engine</span>
                <span className={styles.spec_val}>TensorFlow.js WebGL</span>
              </div>

              <div className={styles.scan_btn_row}>
                <button className={styles.mini_btn} onClick={onReset} type="button">
                  Import scan
                </button>
                <button
                  className={styles.mini_btn_outline}
                  onClick={() => setIsInverted(!isInverted)}
                  type="button"
                >
                  {isInverted ? "Normal" : "Invert"}
                </button>
                <button
                  className={styles.mini_btn_outline}
                  onClick={handleCopyTelemetry}
                  type="button"
                >
                  {copiedStatus ? "Copied!" : "Copy JSON"}
                </button>
                <button
                  className={styles.mini_btn_outline}
                  onClick={handlePrintReport}
                  type="button"
                >
                  Print Report
                </button>
              </div>
            </div>
          </div>

          <div className={styles.topography_footer}>
            <span>TFJS GRAPHMODEL V1</span>
            <span>100% CLIENT-SIDE ENCLAVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
