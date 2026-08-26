import styles from "./css/TopBar.module.css";
import { MdOutlineDocumentScanner, MdDarkMode, MdLightMode, MdOutlineInfo } from "react-icons/md";
import { FaBrain, FaLock } from "react-icons/fa";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTab: "detector" | "about";
  onTabChange: (tab: "detector" | "about") => void;
}

const TopBar = ({ isDarkMode, toggleDarkMode, currentTab, onTabChange }: TopBarProps) => {
  return (
    <header className={styles.top_bar}>
      {/* Brand & Logo */}
      <div className={styles.left_section}>
        <div
          className={styles.brand_logo}
          onClick={() => onTabChange("detector")}
          role="button"
          tabIndex={0}
        >
          <div className={styles.logo_icon_box}>
            <MdOutlineDocumentScanner />
          </div>
          <span className={styles.app_title}>
            NeuroScan <span style={{ color: "var(--m3-primary)" }}>AI</span>
          </span>
        </div>
        <span className={styles.version_badge}>WORKSTATION v1.0</span>
      </div>

      {/* Navigation Tabs & Telemetry */}
      <div className={styles.center_section}>
        <div className={styles.telemetry_pills}>
          <span className={styles.telemetry_pill}>
            <span className={styles.status_dot}></span>
            <span>TF.js WebGL GPU</span>
          </span>
          <span className={styles.telemetry_pill}>
            <FaLock size={10} style={{ color: "var(--m3-success)" }} />
            <span>Zero-Retention Local</span>
          </span>
        </div>

        <nav className={styles.nav_tabs}>
          <button
            className={`${styles.nav_tab_btn} ${currentTab === "detector" ? styles.active : ""}`}
            onClick={() => onTabChange("detector")}
            type="button"
          >
            <FaBrain size={14} />
            <span>Workstation</span>
          </button>
          <button
            className={`${styles.nav_tab_btn} ${currentTab === "about" ? styles.active : ""}`}
            onClick={() => onTabChange("about")}
            type="button"
          >
            <MdOutlineInfo size={16} />
            <span>Model Specs & Team</span>
          </button>
        </nav>
      </div>

      {/* Theme Toggle Button */}
      <div className={styles.right_section}>
        <button
          className={styles.theme_btn}
          onClick={toggleDarkMode}
          aria-label="Toggle Theme"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          type="button"
        >
          {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
