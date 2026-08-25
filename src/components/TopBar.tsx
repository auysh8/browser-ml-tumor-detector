import styles from "./css/TopBar.module.css";
import { MdOutlineDocumentScanner, MdDarkMode, MdLightMode } from "react-icons/md";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentView?: 'upload' | 'about';
  onNavigate?: (view: 'upload' | 'about') => void;
}

const TopBar = ({ isDarkMode, toggleDarkMode, currentView = 'upload', onNavigate }: TopBarProps) => {
  return (
    <header className={styles.top_bar} role="banner">
      <div className={styles.app_name_logo}>
        <MdOutlineDocumentScanner aria-hidden="true" />
        <span className="appname">NeuroScanAI</span>
      </div>
      
      <nav className={styles.nav_bar} aria-label="Main navigation">
        <ul className={styles.nav_items} role="tablist">
          <li role="presentation">
            <button
              role="tab"
              aria-selected={currentView === 'upload'}
              aria-controls="upload-panel"
              className={`${styles.nav_item} ${currentView === 'upload' ? styles.active : ''}`}
              onClick={() => onNavigate?.('upload')}
            >
              Upload
            </button>
          </li>
          <li role="presentation">
            <button
              role="tab"
              aria-selected={currentView === 'about'}
              aria-controls="about-panel"
              className={`${styles.nav_item} ${currentView === 'about' ? styles.active : ''}`}
              onClick={() => onNavigate?.('about')}
            >
              About
            </button>
          </li>
        </ul>
      </nav>
      
      <button
        onClick={toggleDarkMode}
        className={styles.theme_toggle}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <MdLightMode aria-hidden="true" /> : <MdDarkMode aria-hidden="true" />}
      </button>
    </header>
  );
};

export default TopBar;