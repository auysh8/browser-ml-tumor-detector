import styles from "./css/ScanArchive.module.css";
import type { AnalysisResult } from "../App";

interface ArchiveEntry {
  id: string;
  timestamp: string;
  filename: string;
  result: AnalysisResult;
}

interface ScanArchiveProps {
  history: ArchiveEntry[];
  onSelectResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onNewScan: () => void;
}

const ScanArchive = ({
  history,
  onSelectResult,
  onClearHistory,
  onNewScan,
}: ScanArchiveProps) => {
  return (
    <div className={styles.archive_wrapper}>
      <div className={styles.archive_header}>
        <div>
          <span className={styles.mono_tag}>'LOCAL SESSION LOGS'</span>
          <h2 className={styles.archive_title}>Session Scan Archive</h2>
          <p className={styles.archive_sub}>
            Evaluated patient scan history stored in client session memory.
          </p>
        </div>

        <div className={styles.header_actions}>
          <button className={styles.action_btn} onClick={onNewScan} type="button">
            ＋ Analyze New Scan
          </button>
          {history.length > 0 && (
            <button className={styles.clear_btn} onClick={onClearHistory} type="button">
              Clear Session Logs
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className={styles.empty_state}>
          <h3>No Scans Analyzed in Current Session</h3>
          <p>
            When you evaluate brain MRI scans in the Neural Analysis Workstation, local classification logs and probability distributions will appear here.
          </p>
          <button className={styles.action_btn} onClick={onNewScan} type="button">
            Go to Workstation
          </button>
        </div>
      ) : (
        <div className={styles.archive_table_container}>
          <table className={styles.archive_table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Primary Classification</th>
                <th>Confidence</th>
                <th>Urgency Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry.id}>
                  <td className={styles.mono_cell}>{entry.timestamp}</td>
                  <td>
                    <span className={styles.prediction_badge}>
                      {entry.result.predictions}
                    </span>
                  </td>
                  <td className={styles.mono_cell}>{entry.result.confidence}%</td>
                  <td>
                    <span
                      className={`${styles.urgency_tag} ${
                        entry.result.urgency === "High" ? styles.urgency_high : styles.urgency_none
                      }`}
                    >
                      {entry.result.urgency}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.view_btn}
                      onClick={() => onSelectResult(entry.result)}
                      type="button"
                    >
                      Inspect Report →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScanArchive;
