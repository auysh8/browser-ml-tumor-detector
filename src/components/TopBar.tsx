import { useLayoutEffect, useRef, useState } from "react";
import { BsMoon } from "react-icons/bs";
import { FiSun, FiGrid, FiActivity, FiClock, FiLayers, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTab: "landing" | "detector" | "archive" | "about";
  onTabChange: (tab: "landing" | "detector" | "archive" | "about") => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const TopBar = ({
  isDarkMode,
  toggleDarkMode,
  currentTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
}: TopBarProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{ top: number; height: number; opacity: number }>({
    top: 0,
    height: 0,
    opacity: 0,
  });

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector<HTMLButtonElement>(
      `button[data-tab="${currentTab}"]`
    );
    if (activeBtn) {
      setPillStyle({
        top: activeBtn.offsetTop,
        height: activeBtn.offsetHeight,
        opacity: 1,
      });
    }
  }, [currentTab, isCollapsed]);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar_top">
        {/* Logo & Collapse Toggle */}
        <div className="sidebar_header">
          <div
            className="brand_title"
            onClick={() => onTabChange("detector")}
            role="button"
            tabIndex={0}
            title="NeuroScan AI"
          >
            <span className="brand_icon">✱</span>
            {!isCollapsed && <span>NeuroScan</span>}
          </div>

          <button
            className="collapse_toggle_btn"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            type="button"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="sidebar_nav" ref={navRef}>
          {/* Animated Active Pill Background Indicator */}
          <div
            className="active_pill_indicator"
            style={{
              top: `${pillStyle.top}px`,
              height: `${pillStyle.height}px`,
              opacity: pillStyle.opacity,
            }}
          />

          <div className="nav_group">
            <button
              data-tab="landing"
              className={`nav_item ${currentTab === "landing" ? "active" : ""}`}
              onClick={() => onTabChange("landing")}
              type="button"
              title="Overview & Landing"
            >
              <FiGrid className="nav_icon" />
              {!isCollapsed && <span className="nav_label">Overview</span>}
            </button>
            <button
              data-tab="detector"
              className={`nav_item ${currentTab === "detector" ? "active" : ""}`}
              onClick={() => onTabChange("detector")}
              type="button"
              title="Neural Analysis Workstation"
            >
              <FiActivity className="nav_icon" />
              {!isCollapsed && <span className="nav_label">Workstation</span>}
            </button>
            <button
              data-tab="archive"
              className={`nav_item ${currentTab === "archive" ? "active" : ""}`}
              onClick={() => onTabChange("archive")}
              type="button"
              title="Session Archive & History"
            >
              <FiClock className="nav_icon" />
              {!isCollapsed && <span className="nav_label">Scan History</span>}
            </button>
          </div>

          <div className="nav_divider"></div>

          <div className="nav_group">
            <button
              data-tab="about"
              className={`nav_item ${currentTab === "about" ? "active" : ""}`}
              onClick={() => onTabChange("about")}
              type="button"
              title="Model Specifications"
            >
              <FiLayers className="nav_icon" />
              {!isCollapsed && <span className="nav_label">Model Specs</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Profile Footer */}
      <div className="sidebar_footer">
        <div className="user_profile">
          <div className="user_avatar" title="Radiology Operator">O</div>
          {!isCollapsed && (
            <div className="user_info">
              <span className="user_name">Radiology Operator</span>
              <span className="user_sub">Workstation v1.0</span>
            </div>
          )}
        </div>

        <div className="footer_actions">
          <button
            className="theme_toggle_btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            type="button"
          >
            {isDarkMode ? <FiSun /> : <BsMoon />}
          </button>
          {!isCollapsed && <span className="tfjs_tag">TFJS</span>}
        </div>
      </div>
    </aside>
  );
};

export default TopBar;
