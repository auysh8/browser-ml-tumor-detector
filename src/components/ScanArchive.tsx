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
          <h2 className={styles.archive_title}>Scan History</h2>
        </div>

        <div className={styles.header_actions}>
          <button className={styles.action_btn} onClick={onNewScan} type="button">
            ＋ New Scan
          </button>
          {history.length > 0 && (
            <button className={styles.clear_btn} onClick={onClearHistory} type="button">
              Clear History
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className={styles.empty_state}>
          <h3>No Scans in History</h3>
          <p>
            Scans analyzed during this session will appear here.
          </p>
          <button className={styles.action_btn} onClick={onNewScan} type="button">
            Open Workstation
          </button>
        </div>
      ) : (
        <div className={styles.archive_table_container}>
          <table className={styles.archive_table}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Classification</th>
                <th>Confidence</th>
                <th>Urgency</th>
                <th>Action</th>
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
                      View →
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
