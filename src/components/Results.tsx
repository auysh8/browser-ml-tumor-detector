import styles from "./css/Results.module.css";
import { GiHazardSign } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { MdBrokenImage } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

interface ResultsProps {
  results: {
    predictions: string;
    confidence: string;
    urgency: string;
    image: string;
    isError: boolean;
  };
  onReset: () => void;
}

const Results = ({ results, onReset }: ResultsProps) => {
  const isInvalid = results.predictions === "Not an MRI" || results.isError;
  const isNoTumor = results.predictions === "No Tumor";

  const getButtonClass = () => {
    if (isInvalid) return styles.btn_warning;
    if (isNoTumor) return styles.btn_success;
    return styles.btn_danger;
  };

  return (
    <div className={styles.main_wrapper}>
      {isInvalid ? (
        <div className={styles.card_container}>
          <div className={styles.error_header_row}>
            <IoWarningOutline className={styles.orange_icon} />
            <span>PROCESSING ERROR</span>
          </div>

          <h2 className={styles.error_title}>Scan Unreadable</h2>

          <p className={styles.error_subtitle}>
            The uploaded file is either corrupted or in an unsupported format.
            Please check the file format or try uploading again.
          </p>

          <div className={styles.invalid_badge}>
            <GiHazardSign />
            <span>Invalid Format</span>
          </div>

          <div className={styles.preview_unavailable_box}>
            <div className={styles.preview_icon_circle}>
              <MdBrokenImage size={28} color="#f97316" />
            </div>
            <h3>Preview Unavailable</h3>
            <p>
              The system could not render a preview for this file. Ensure the file
              is a valid image scan.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.card_container}>
          <div
            className={styles.analysis_status}
            style={{ color: isNoTumor ? "#10b981" : "#ef4444" }}
          >
            <GiHazardSign />
            <span>Analysis Complete</span>
          </div>

          <div className={styles.results}>
            <span className={styles.tumor_type}>
              {isNoTumor
                ? "No Anomaly Detected"
                : `Anomaly Detected: ${results.predictions}`}
            </span>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <span
                className={styles.confidence_score}
                style={{
                  background: isNoTumor ? "#d1fae5" : "#fee2e2",
                  color: isNoTumor ? "#065f46" : "#991b1b",
                }}
              >
                <BsStars style={{ marginRight: "6px" }} />
                {results.confidence}% Confidence
              </span>
              <span className={styles.urgency}>
                Urgency: {results.urgency}
              </span>
            </div>
          </div>

          {results.image && (
            <div className={styles.image_container}>
              <img
                src={results.image}
                alt="Scan"
                className={styles.valid_image}
              />
            </div>
          )}
        </div>
      )}

      <div className={styles.action_buttons_row}>
        <button
          className={`${styles.btn_action} ${getButtonClass()}`}
          onClick={onReset}
        >
          <FaArrowRight style={{ transform: "rotate(180deg)" }} />
          <span>Upload New Scan</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
