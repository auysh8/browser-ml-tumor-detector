import { useState } from "react";
import styles from "./css/Results.module.css";
import { GiHazardSign } from "react-icons/gi";
import { BsStars, BsCheckCircleFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaArrowLeft, FaPrint, FaCopy, FaEye, FaAdjust } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import type { AnalysisResult } from "../App";

interface ResultsProps {
  results: AnalysisResult;
  onReset: () => void;
}

const Results = ({ results, onReset }: ResultsProps) => {
  const [isInverted, setIsInverted] = useState(false);
  const [isContrastBoosted, setIsContrastBoosted] = useState(false);
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [copiedTelemetry, setCopiedTelemetry] = useState(false);

  const isInvalid = results.predictions === "Not an MRI" || results.isError;
  const isNoTumor = results.predictions === "No Tumor";

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJson = () => {
    const telemetryData = {
      timestamp: new Date().toISOString(),
      primaryDiagnosis: results.predictions,
      confidenceScore: `${results.confidence}%`,
      clinicalPriority: results.urgency,
      probabilities: results.classProbabilities,
      modelBackend: "TensorFlow.js WebGL GraphModel",
      tensorShape: "[1, 224, 224, 3]",
    };
    navigator.clipboard.writeText(JSON.stringify(telemetryData, null, 2));
    setCopiedTelemetry(true);
    setTimeout(() => setCopiedTelemetry(false), 2000);
  };

  const getFilterStyle = () => {
    const filters = [];
    if (isInverted) filters.push("invert(100%)");
    if (isContrastBoosted) filters.push("contrast(160%) brightness(110%)");
    return filters.length > 0 ? filters.join(" ") : "none";
  };

  return (
    <div className={styles.workstation_wrapper}>
      {/* Telemetry Header Bar */}
      <div className={styles.telemetry_bar}>
        <div
          className={`${styles.triage_pill} ${
            isInvalid
              ? styles.triage_warning
              : isNoTumor
              ? styles.triage_normal
              : styles.triage_high
          }`}
        >
          {isInvalid ? (
            <>
              <IoWarningOutline size={16} />
              <span>Input Validation Error</span>
            </>
          ) : isNoTumor ? (
            <>
              <BsCheckCircleFill size={15} />
              <span>Normal Scan — No Anomaly Detected</span>
            </>
          ) : (
            <>
              <GiHazardSign size={18} />
              <span>Clinical Triage Alert: High Priority Anomaly</span>
            </>
          )}
        </div>

        <div className={styles.meta_stats_row}>
          <div className={styles.stat_item}>
            <span>TENSOR RUNTIME:</span>
            <span className={styles.stat_value}>WebGL WASM</span>
          </div>
          <div className={styles.stat_item}>
            <span>INFERENCE TIME:</span>
            <span className={styles.stat_value}>~38 ms</span>
          </div>
          <div className={styles.stat_item}>
            <span>WINDOW:</span>
            <span className={styles.stat_value}>SOFT TISSUE</span>
          </div>
        </div>
      </div>

      {/* Two-Column Diagnostic Dashboard */}
      <div className={styles.dashboard_grid}>
        {/* Left Column: DICOM Medical Image Viewer */}
        <div className={styles.dicom_panel}>
          <div className={styles.panel_header}>
            <span className={styles.panel_title}>
              <FaEye style={{ color: "var(--m3-primary)" }} />
              <span>DICOM Image Viewer</span>
            </span>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--m3-outline)" }}>
              224x224 RGB
            </span>
          </div>

          {/* Viewport Frame */}
          <div className={styles.viewer_viewport}>
            {results.image && (
              <img
                src={results.image}
                alt="Analyzed Brain MRI Scan"
                className={styles.mri_image}
                style={{ filter: getFilterStyle() }}
              />
            )}

            {/* Grid Overlay */}
            {showGridOverlay && (
              <>
                <div className={styles.grid_overlay}></div>
                <div className={styles.crosshair_v}></div>
                <div className={styles.crosshair_h}></div>
              </>
            )}

            {/* DICOM HUD Text Overlays */}
            <div className={styles.hud_tl}>
              <div>PATIENT_ID: ANON-SCAN-01</div>
              <div>SERIES: AXIAL T2</div>
            </div>
            <div className={styles.hud_tr}>
              <div>MATRIX: 224 x 224</div>
              <div>ZOOM: 100%</div>
            </div>
            <div className={styles.hud_bl}>
              <div>FILTER: {getFilterStyle()}</div>
            </div>
            <div className={styles.hud_br}>
              <div>TFJS WEBGL</div>
            </div>
          </div>

          {/* DICOM Toolbar Controls */}
          <div className={styles.filter_bar}>
            <button
              className={`${styles.tool_btn} ${isInverted ? styles.active : ""}`}
              onClick={() => setIsInverted(!isInverted)}
              title="Invert monochromatic colors"
              type="button"
            >
              <FaAdjust />
              <span>{isInverted ? "Normal" : "Invert"}</span>
            </button>

            <button
              className={`${styles.tool_btn} ${isContrastBoosted ? styles.active : ""}`}
              onClick={() => setIsContrastBoosted(!isContrastBoosted)}
              title="Boost tissue contrast"
              type="button"
            >
              <BsStars />
              <span>Contrast</span>
            </button>

            <button
              className={`${styles.tool_btn} ${showGridOverlay ? styles.active : ""}`}
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              title="Toggle spatial grid lines"
              type="button"
            >
              <BsGrid3X3GapFill />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {/* Right Column: Diagnostic Findings & Probability Matrix */}
        <div className={styles.findings_panel}>
          <div className={styles.classification_hero}>
            <span className={styles.hero_label}>Primary Neural Classification</span>
            <h2 className={styles.primary_diagnosis}>
              {isInvalid
                ? "Scan Unreadable / Invalid File"
                : isNoTumor
                ? "No Tumor Detected"
                : results.predictions}
            </h2>

            {!isInvalid && (
              <div className={styles.metrics_chips}>
                <span className={styles.metric_chip}>
                  <BsStars />
                  {results.confidence}% Confidence Score
                </span>
                <span className={styles.metric_chip} style={{ backgroundColor: "var(--m3-surface-container-low)" }}>
                  Priority: {results.urgency}
                </span>
              </div>
            )}
          </div>

          {/* Probability Distribution Matrix */}
          {!isInvalid && results.classProbabilities && (
            <div className={styles.matrix_section}>
              <div className={styles.section_heading}>
                <span>Softmax Class Probability Distribution</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>TOTAL: 100%</span>
              </div>

              <div className={styles.prob_rows}>
                {results.classProbabilities.map((item) => {
                  const isTop = item.label === results.predictions;
                  return (
                    <div key={item.label} className={styles.prob_item}>
                      <div className={styles.prob_label_row}>
                        <span style={{ fontWeight: isTop ? "800" : "600", color: isTop ? "var(--m3-primary)" : "inherit" }}>
                          {item.label}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)" }}>{item.percentage}%</span>
                      </div>
                      <div className={styles.bar_bg}>
                        <div
                          className={`${styles.bar_fill} ${
                            isTop ? (isNoTumor ? styles.top_normal : styles.top_anomaly) : ""
                          }`}
                          style={{ width: `${Math.max(item.percentage, 2)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Diagnostic Action Controls */}
          <div className={styles.action_row}>
            <button className={styles.primary_action_btn} onClick={onReset} type="button">
              <FaArrowLeft />
              <span>Acquire New Scan</span>
            </button>

            {!isInvalid && (
              <>
                <button className={styles.secondary_action_btn} onClick={handlePrint} type="button">
                  <FaPrint />
                  <span>Print Diagnostic Report</span>
                </button>

                <button className={styles.secondary_action_btn} onClick={handleCopyJson} type="button">
                  <FaCopy />
                  <span>{copiedTelemetry ? "Telemetry Copied!" : "Copy Telemetry"}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
