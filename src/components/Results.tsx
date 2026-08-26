import styles from "./css/Results.module.css";
import { GiHazardSign } from "react-icons/gi";
import { BsStars, BsCheckCircleFill } from "react-icons/bs";
import { FaArrowLeft, FaPrint } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import type { AnalysisResult } from "../App";

interface ResultsProps {
  results: AnalysisResult;
  onReset: () => void;
}

const Results = ({ results, onReset }: ResultsProps) => {
  const isInvalid = results.predictions === "Not an MRI" || results.isError;
  const isNoTumor = results.predictions === "No Tumor";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.card_container}>
        {/* Status Chip Header */}
        {isInvalid ? (
          <div className={`${styles.status_chip} ${styles.status_warning}`}>
            <IoWarningOutline size={18} />
            <span>Unreadable File / Format Issue</span>
          </div>
        ) : isNoTumor ? (
          <div className={`${styles.status_chip} ${styles.status_success}`}>
            <BsCheckCircleFill size={16} />
            <span>Analysis Complete — Normal Scan</span>
          </div>
        ) : (
          <div className={`${styles.status_chip} ${styles.status_danger}`}>
            <GiHazardSign size={18} />
            <span>Analysis Complete — Anomaly Detected</span>
          </div>
        )}

        {/* Invalid Scan State */}
        {isInvalid ? (
          <div className={styles.error_container}>
            <div className={styles.error_icon}>
              <MdBrokenImage />
            </div>
            <h2 className={styles.prediction_title}>Scan Unreadable</h2>
            <p style={{ color: "var(--m3-outline)", maxWidth: "500px" }}>
              The uploaded file could not be verified as a valid brain MRI scan or was corrupted. Please verify the input file format.
            </p>
          </div>
        ) : (
          /* Valid MRI Result State */
          <>
            <div className={styles.summary_header}>
              <h2 className={styles.prediction_title}>
                {isNoTumor ? "No Anomaly Detected" : `Detected: ${results.predictions}`}
              </h2>
              <div className={styles.badges_row}>
                <span className={styles.confidence_pill}>
                  <BsStars />
                  {results.confidence}% Model Confidence
                </span>
                <span
                  className={`${styles.urgency_pill} ${
                    isNoTumor ? styles.urgency_none : styles.urgency_high
                  }`}
                >
                  Clinical Priority: {results.urgency}
                </span>
              </div>
            </div>

            {/* Split Grid View: MRI Image + Probability Breakdown */}
            <div className={styles.content_grid}>
              {results.image && (
                <div className={styles.image_card}>
                  <img
                    src={results.image}
                    alt="Analyzed Brain MRI Scan"
                    className={styles.valid_image}
                  />
                </div>
              )}

              {/* Class Probabilities Breakdown */}
              {results.classProbabilities && (
                <div className={styles.breakdown_card}>
                  <h3 className={styles.breakdown_title}>Probability Distribution</h3>
                  <div className={styles.breakdown_list}>
                    {results.classProbabilities.map((item) => {
                      const isTarget = item.label === results.predictions;
                      return (
                        <div key={item.label} className={styles.breakdown_item}>
                          <div className={styles.breakdown_label_row}>
                            <span style={{ fontWeight: isTarget ? "800" : "600" }}>
                              {item.label}
                            </span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className={styles.breakdown_bar_bg}>
                            <div
                              className={`${styles.breakdown_bar_fill} ${
                                isTarget && !isNoTumor ? styles.highlight : ""
                              }`}
                              style={{ width: `${Math.max(item.percentage, 3)}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.actions_row}>
        <button className={styles.primary_btn} onClick={onReset}>
          <FaArrowLeft />
          <span>Upload & Analyze New Scan</span>
        </button>

        {!isInvalid && (
          <button className={styles.secondary_btn} onClick={handlePrint}>
            <FaPrint />
            <span>Print Report</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
