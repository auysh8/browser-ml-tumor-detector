import styles from "./css/TopBar.module.css";
import { MdOutlineDocumentScanner, MdDarkMode, MdLightMode, MdOutlineInfo } from "react-icons/md";
import { FaBrain } from "react-icons/fa";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTab: "detector" | "about";
  onTabChange: (tab: "detector" | "about") => void;
}

const TopBar = ({ isDarkMode, toggleDarkMode, currentTab, onTabChange }: TopBarProps) => {
  return (
    <header className={styles.top_bar}>
      <div
        className={styles.app_name_logo}
        onClick={() => onTabChange("detector")}
        role="button"
        tabIndex={0}
      >
        <div className={styles.logo_badge}>
          <MdOutlineDocumentScanner />
        </div>
        <span className={styles.app_name}>NeuroScan<span style={{ color: "var(--m3-primary)" }}>AI</span></span>
      </div>

      <nav className={styles.nav_bar}>
        <div className={styles.nav_items}>
          <button
            className={`${styles.nav_btn} ${currentTab === "detector" ? styles.active : ""}`}
            onClick={() => onTabChange("detector")}
          >
            <FaBrain size={16} />
            <span>Detector</span>
          </button>
          <button
            className={`${styles.nav_btn} ${currentTab === "about" ? styles.active : ""}`}
            onClick={() => onTabChange("about")}
          >
            <MdOutlineInfo size={18} />
            <span>About</span>
          </button>
        </div>
      </nav>

      <button
        className={styles.theme_toggle_btn}
        onClick={toggleDarkMode}
        aria-label="Toggle Theme"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </header>
  );
};

export default TopBar;
