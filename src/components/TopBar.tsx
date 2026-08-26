import { useLayoutEffect, useRef, useState } from "react";
import { BsMoon } from "react-icons/bs";
import { FiSun } from "react-icons/fi";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTab: "landing" | "detector" | "archive" | "about";
  onTabChange: (tab: "landing" | "detector" | "archive" | "about") => void;
}

const TopBar = ({
  isDarkMode,
  toggleDarkMode,
  currentTab,
  onTabChange,
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
  }, [currentTab]);

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
            >
              Overview & Landing
            </button>
            <button
              data-tab="detector"
              className={`nav_item ${currentTab === "detector" ? "active" : ""}`}
              onClick={() => onTabChange("detector")}
              type="button"
            >
              Neural Analysis Workstation
            </button>
            <button
              data-tab="archive"
              className={`nav_item ${currentTab === "archive" ? "active" : ""}`}
              onClick={() => onTabChange("archive")}
              type="button"
            >
              Session Archive & History
            </button>
          </div>

          <div className="nav_divider"></div>

          <div className="nav_group">
            <button
              data-tab="about"
              className={`nav_item ${currentTab === "about" ? "active" : ""}`}
              onClick={() => onTabChange("about")}
              type="button"
            >
              Model Specifications
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Profile Footer */}
      <div className="sidebar_footer">
        <div className="user_profile">
          <div className="user_avatar">O</div>
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
