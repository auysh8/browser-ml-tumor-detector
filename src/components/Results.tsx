import { useState } from "react";
import styles from "./css/Results.module.css";
import type { AnalysisResult } from "../App";
import { FiArrowLeft, FiCheckCircle, FiAlertTriangle, FiEye } from "react-icons/fi";

interface ResultsProps {
  results: AnalysisResult;
  onReset: () => void;
}

const Results = ({ results, onReset }: ResultsProps) => {
  const [isInverted, setIsInverted] = useState(false);

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
    { name: "No Tumor", prob: getProb("No Tumor"), color: "var(--color-notumor)" },
  ];

  return (
    <div className={styles.results_container}>
      {/* Result Verdict Header */}
      <div className={styles.verdict_card}>
        <div className={styles.verdict_header}>
          <div className={styles.verdict_badge}>
            {isNoTumor ? (
              <span className={styles.badge_success}>
                <FiCheckCircle /> Normal Scan
              </span>
            ) : isInvalid ? (
              <span className={styles.badge_warning}>
                <FiAlertTriangle /> Invalid Format
              </span>
            ) : (
              <span className={styles.badge_tumor}>
                <FiAlertTriangle /> Tumor Detected
              </span>
            )}
          </div>
          <span className={styles.confidence_badge}>
            {results.confidence}% confidence
          </span>
        </div>

        <h2 className={styles.verdict_title}>
          {isInvalid
            ? "Not a Valid Brain MRI"
            : isNoTumor
            ? "No Tumor Detected"
            : results.predictions}
        </h2>
      </div>

      {/* Main Content: Image & Probability breakdown */}
      <div className={styles.content_grid}>
        {/* Scanned Image Preview */}
        <div className={styles.image_section}>
          <div className={styles.image_frame}>
            {results.image ? (
              <img
                src={results.image}
                alt="Brain MRI Scan"
                className={styles.mri_image}
                style={{ filter: isInverted ? "invert(100%)" : "none" }}
              />
            ) : (
              <div className={styles.no_image}>No image available</div>
            )}
          </div>
          <button
            type="button"
            className={styles.invert_toggle}
            onClick={() => setIsInverted(!isInverted)}
          >
            <FiEye /> {isInverted ? "Normal View" : "Invert Contrast"}
          </button>
        </div>

        {/* Probabilities */}
        <div className={styles.breakdown_section}>
          <h3 className={styles.breakdown_title}>Class Probabilities</h3>
          <div className={styles.bars_list}>
            {classes.map((cls) => (
              <div key={cls.name} className={styles.bar_item}>
                <div className={styles.bar_labels}>
                  <span className={styles.class_name}>{cls.name}</span>
                  <span className={styles.class_value}>{cls.prob}%</span>
                </div>
                <div className={styles.bar_track}>
                  <div
                    className={styles.bar_fill}
                    style={{
                      width: `${Math.max(2, Math.min(100, cls.prob))}%`,
                      backgroundColor: cls.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className={styles.action_footer}>
        <button type="button" className={styles.reset_button} onClick={onReset}>
          <FiArrowLeft /> Analyze Another Scan
        </button>
      </div>
    </div>
  );
};

export default Results;
