import { BsMoon } from "react-icons/bs";
import { FiSun } from "react-icons/fi";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTab: "detector" | "about";
  onTabChange: (tab: "detector" | "about") => void;
}

const TopBar = ({
  isDarkMode,
  toggleDarkMode,
  currentTab,
  onTabChange,
}: TopBarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar_top">
        {/* Logo */}
        <div
          className="brand_title"
          onClick={() => onTabChange("detector")}
          role="button"
          tabIndex={0}
        >
          <span className="brand_icon">✱</span>
          <span>NeuroScan</span>
        </div>

        {/* Navigation Section 1 */}
        <div className="sidebar_nav">
          <div className="nav_group">
            <button
              className={`nav_item ${currentTab === "detector" ? "active" : ""}`}
              onClick={() => onTabChange("detector")}
              type="button"
            >
              Neural Analysis
            </button>
            <button className="nav_item" style={{ opacity: 0.6 }} type="button" disabled>
              Overview
            </button>
            <button className="nav_item" style={{ opacity: 0.6 }} type="button" disabled>
              Patient Series
            </button>
            <button className="nav_item" style={{ opacity: 0.6 }} type="button" disabled>
              Softmax Weights
            </button>
            <button className="nav_item" style={{ opacity: 0.6 }} type="button" disabled>
              DICOM Archive
            </button>
          </div>

          <div className="nav_divider"></div>

          {/* Navigation Section 2 */}
          <div className="nav_group">
            <button
              className={`nav_item ${currentTab === "about" ? "active" : ""}`}
              onClick={() => onTabChange("about")}
              type="button"
            >
              Model Specs & Team
            </button>
            <button className="nav_item" style={{ opacity: 0.6 }} type="button" disabled>
              Model Protocols
            </button>
            <button className="nav_item" style={{ opacity: 0.6 }} type="button" disabled>
              Zero-Retention Policy
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Profile Footer */}
      <div className="sidebar_footer">
        <div className="user_profile">
          <div className="avatar">O</div>
          <div className="user_info">
            <span className="user_name">Radiology Operator</span>
            <span className="user_sub">Workstation v1.0</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            className="theme_toggle_btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            type="button"
          >
            {isDarkMode ? <FiSun /> : <BsMoon />}
          </button>
          <span className="tfjs_tag">TFJS</span>
        </div>
      </div>
    </aside>
  );
};

export default TopBar;
