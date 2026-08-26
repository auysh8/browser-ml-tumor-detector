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

  const getProb = (labelName: string) => {
    if (!results.classProbabilities) return 0;
    const match = results.classProbabilities.find(
      (p) => p.label.toLowerCase() === labelName.toLowerCase()
    );
    return match ? match.percentage : 0;
  };

  const classes = [
    { name: "Glioma", prob: getProb("Glioma"), color: "var(--color-glioma)" },
    { name: "Meningioma", prob: getProb("Meningioma"), color: "var(--color-meningioma)" },
    { name: "Pituitary", prob: getProb("Pituitary"), color: "var(--color-pituitary)" },
    { name: "Normal", prob: getProb("No Tumor"), color: "var(--color-notumor)" },
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
    };
    navigator.clipboard.writeText(JSON.stringify(telemetryData, null, 2));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className={styles.editorial_wrapper}>
      {/* Finding & Chart */}
      <div className={styles.top_finding_grid}>
        <div className={styles.finding_info}>
          <div className={styles.cert_number}>
            <span>{isInvalid ? "0.0" : results.confidence}</span>
            <span className={styles.cert_unit}>% confidence</span>
          </div>
          <h2 className={styles.finding_heading}>
            {isInvalid
              ? "Unreadable / Format Error"
              : isNoTumor
              ? "No Tumor Detected"
              : `${results.predictions}`}
          </h2>
        </div>

        {/* Probability Density Chart */}
        <div className={styles.wave_chart_container}>
          <div className={styles.chart_columns_grid}>
            {classes.map((cls) => {
              const heightPercentage = Math.max(0, Math.min(100, cls.prob));
              const peakY = 120 - (heightPercentage / 100) * 100;

              return (
                <div key={cls.name} className={styles.chart_col}>
                  <div className={styles.svg_wrapper}>
                    <svg className={styles.wave_svg} viewBox="0 0 100 120">
                      <line x1="0" y1="120" x2="100" y2="120" stroke="var(--border-subtle)" strokeWidth="1.5" />
                      <path
                        className={styles.animated_wave}
                        d={`M 5 120 C 25 120, 32 ${peakY}, 50 ${peakY} C 68 ${peakY}, 75 120, 95 120 Z`}
                        fill={cls.color}
                        opacity="0.85"
                      />
                    </svg>
                  </div>

                  <div className={styles.legend_item}>
                    <div className={styles.legend_header}>
                      <span className={styles.legend_dot} style={{ backgroundColor: cls.color }} />
                      <span className={styles.legend_label}>{cls.name}</span>
                    </div>
                    <span className={styles.legend_value}>{cls.prob}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Scan Display */}
      <div className={styles.full_topography_section}>
        <div className={styles.topography_box}>
          <div className={styles.scan_content_row}>
            <div className={styles.scan_image_frame}>
              {results.image ? (
                <img
                  src={results.image}
                  alt="MRI Scan"
                  style={{ filter: isInverted ? "invert(100%)" : "none" }}
                />
              ) : (
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>No scan loaded</span>
              )}
            </div>

            <div className={styles.scan_specs_list}>
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>Classification</span>
                <span className={styles.spec_val}>{results.predictions}</span>
              </div>
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>Confidence</span>
                <span className={styles.spec_val}>{results.confidence}%</span>
              </div>
              <div className={styles.spec_row}>
                <span className={styles.spec_key}>Engine</span>
                <span className={styles.spec_val}>TensorFlow.js WebGL</span>
              </div>

              <div className={styles.scan_btn_row}>
                <button className={styles.mini_btn} onClick={onReset} type="button">
                  New Scan
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
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
