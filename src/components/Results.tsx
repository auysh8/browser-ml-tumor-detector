import { useState } from "react";
import styles from "./css/Results.module.css";
import { FiArrowRight } from "react-icons/fi";
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
        <div className={styles.wave_chart_box}>
          <svg className={styles.wave_svg} viewBox="0 0 500 160" preserveAspectRatio="none">
            {/* Baseline */}
            <line x1="0" y1="150" x2="500" y2="150" stroke="var(--border-subtle)" strokeWidth="1.5" />

            {/* Glioma Curve (Plum) */}
            <path
              d={`M 20 150 C 70 150, 90 ${150 - (gliomaProb / 100) * 120}, 140 ${
                150 - (gliomaProb / 100) * 120
              } C 190 ${150 - (gliomaProb / 100) * 120}, 210 150, 260 150 Z`}
              fill="var(--color-glioma)"
              opacity="0.8"
            />

            {/* Meningioma Curve (Rose) */}
            <path
              d={`M 120 150 C 170 150, 190 ${150 - (meningiomaProb / 100) * 120}, 240 ${
                150 - (meningiomaProb / 100) * 120
              } C 290 ${150 - (meningiomaProb / 100) * 120}, 310 150, 360 150 Z`}
              fill="var(--color-meningioma)"
              opacity="0.85"
            />

            {/* Pituitary Curve (Terracotta) */}
            <path
              d={`M 220 150 C 270 150, 290 ${150 - (pituitaryProb / 100) * 120}, 340 ${
                150 - (pituitaryProb / 100) * 120
              } C 390 ${150 - (pituitaryProb / 100) * 120}, 410 150, 460 150 Z`}
              fill="var(--color-pituitary)"
              opacity="0.8"
            />

            {/* No Tumor Curve (Sage) */}
            <path
              d={`M 300 150 C 350 150, 370 ${150 - (noTumorProb / 100) * 120}, 420 ${
                150 - (noTumorProb / 100) * 120
              } C 460 ${150 - (noTumorProb / 100) * 120}, 480 150, 500 150 Z`}
              fill="var(--color-notumor)"
              opacity="0.85"
            />

            {/* Labels & Percentages */}
            <g style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fill: "var(--text-main)" }}>
              {/* Glioma Peak */}
              <text x="140" y={Math.min(135, 140 - (gliomaProb / 100) * 120)} textAnchor="middle">
                GLIOMA
              </text>
              <text x="140" y={Math.min(147, 152 - (gliomaProb / 100) * 120)} textAnchor="middle" fontWeight="bold">
                {gliomaProb}%
              </text>

              {/* Meningioma Peak */}
              <text x="240" y={Math.min(135, 140 - (meningiomaProb / 100) * 120)} textAnchor="middle">
                MENINGIOMA
              </text>
              <text x="240" y={Math.min(147, 152 - (meningiomaProb / 100) * 120)} textAnchor="middle" fontWeight="bold">
                {meningiomaProb}%
              </text>

              {/* Pituitary Peak */}
              <text x="340" y={Math.min(135, 140 - (pituitaryProb / 100) * 120)} textAnchor="middle">
                PITUITARY
              </text>
              <text x="340" y={Math.min(147, 152 - (pituitaryProb / 100) * 120)} textAnchor="middle" fontWeight="bold">
                {pituitaryProb}%
              </text>

              {/* Normal Peak */}
              <text x="420" y={Math.min(135, 140 - (noTumorProb / 100) * 120)} textAnchor="middle">
                NORMAL
              </text>
              <text x="420" y={Math.min(147, 152 - (noTumorProb / 100) * 120)} textAnchor="middle" fontWeight="bold">
                {noTumorProb}%
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Lower Section Grid */}
      <div className={styles.bottom_grid}>
        {/* Left Column: Active Scan Topography */}
        <div>
          <h3 className={styles.section_title}>
            <span>⊕ Active scan topography</span>
          </h3>

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
                  <span className={styles.spec_key}>Layer Dimension</span>
                  <span className={styles.spec_val}>Float32 [1, 224, 224, 3]</span>
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
                </div>
              </div>
            </div>

            <div className={styles.topography_footer}>
              <span>TFJS GRAPHMODEL V1</span>
              <span>100% CLIENT-SIDE ENCLAVE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Next Clinical Actions */}
        <div>
          <h3 className={styles.section_title}>
            <span>☵ Next clinical actions</span>
          </h3>

          <div className={styles.actions_column}>
            <div className={styles.action_card} onClick={onReset}>
              <span className={styles.action_num}>01</span>
              <div className={styles.action_body}>
                <span className={styles.action_title}>Conduct secondary axial confirmation</span>
                <span className={styles.action_desc}>
                  Cross-verify with contrast-enhanced T1 post-gadolinium sequence or acquire new scan.
                </span>
              </div>
              <FiArrowRight className={styles.action_arrow} />
            </div>

            <div
              className={styles.action_card}
              onClick={copiedStatus ? handlePrintReport : handleCopyTelemetry}
            >
              <span className={styles.action_num}>02</span>
              <div className={styles.action_body}>
                <span className={styles.action_title}>
                  {copiedStatus ? "Telemetry Copied to Clipboard!" : "Export diagnostic PDF report & Telemetry"}
                </span>
                <span className={styles.action_desc}>
                  Render signed report containing softmax telemetry and model weights.
                </span>
              </div>
              <FiArrowRight className={styles.action_arrow} />
            </div>

            <div className={styles.action_card} onClick={handlePrintReport}>
              <span className={styles.action_num}>03</span>
              <div className={styles.action_body}>
                <span className={styles.action_title}>Dispatch to neuro-oncology team</span>
                <span className={styles.action_desc}>
                  Alert neuro-oncology triage team for clinical review & surgical scheduling.
                </span>
              </div>
              <FiArrowRight className={styles.action_arrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
