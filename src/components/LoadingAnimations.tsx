import React from "react";
import styles from "./css/LoadingAnimations.module.css";

export const BrainScanAnimation: React.FC = () => {
  return (
    <div className={styles.svg_wrapper} title="Brain Scan Animation">
      <svg
        viewBox="0 0 180 180"
        className={styles.svg_canvas}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="laserGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Tech Ring */}
        <circle
          cx="90"
          cy="90"
          r="82"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.3"
          className={styles.tech_ring}
        />
        <circle
          cx="90"
          cy="90"
          r="74"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.15"
        />

        {/* Target Reticle Marks */}
        <line x1="90" y1="6" x2="90" y2="16" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="90" y1="164" x2="90" y2="174" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="6" y1="90" x2="16" y2="90" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="164" y1="90" x2="174" y2="90" stroke="currentColor" strokeWidth="2" opacity="0.6" />

        {/* Brain Silhouette Path */}
        <g className={styles.brain_group}>
          {/* Left Hemisphere */}
          <path
            d="M 85 40
               C 70 36, 50 45, 42 62
               C 34 78, 36 96, 44 110
               C 50 120, 62 128, 72 130
               C 78 131, 83 128, 85 122
               Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Right Hemisphere */}
          <path
            d="M 95 40
               C 110 36, 130 45, 138 62
               C 146 78, 144 96, 136 110
               C 130 120, 118 128, 108 130
               C 102 131, 97 128, 95 122
               Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Internal Sulci Details */}
          <path
            d="M 52 70 C 62 72, 68 84, 60 96 C 54 104, 68 114, 76 116"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 128 70 C 118 72, 112 84, 120 96 C 126 104, 112 114, 104 116"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 66 54 C 76 60, 78 74, 84 78"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 114 54 C 104 60, 102 74, 96 78"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* Laser Scanning Line */}
        <g className={styles.laser_scanner}>
          <line
            x1="25"
            y1="0"
            x2="155"
            y2="0"
            stroke="currentColor"
            strokeWidth="2.5"
            filter="url(#glowFilter)"
          />
          <rect
            x="25"
            y="-12"
            width="130"
            height="24"
            fill="url(#laserGradient)"
          />
        </g>
      </svg>
    </div>
  );
};

export const NeuralNetworkAnimation: React.FC = () => {
  return (
    <div className={styles.svg_wrapper} title="Neural Network Animation">
      <svg
        viewBox="0 0 180 180"
        className={styles.svg_canvas}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Network Grid */}
        <circle cx="90" cy="90" r="80" stroke="currentColor" strokeWidth="1" opacity="0.1" />

        {/* Connections */}
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.35">
          {/* Layer 1 to 2 */}
          <line x1="40" y1="50" x2="90" y2="40" className={styles.connection_line} />
          <line x1="40" y1="50" x2="90" y2="90" className={styles.connection_line} />
          <line x1="40" y1="90" x2="90" y2="40" className={styles.connection_line} />
          <line x1="40" y1="90" x2="90" y2="90" className={styles.connection_line} />
          <line x1="40" y1="90" x2="90" y2="140" className={styles.connection_line} />
          <line x1="40" y1="130" x2="90" y2="90" className={styles.connection_line} />
          <line x1="40" y1="130" x2="90" y2="140" className={styles.connection_line} />

          {/* Layer 2 to 3 */}
          <line x1="90" y1="40" x2="140" y2="65" className={styles.connection_line} />
          <line x1="90" y1="40" x2="140" y2="115" className={styles.connection_line} />
          <line x1="90" y1="90" x2="140" y2="65" className={styles.connection_line} />
          <line x1="90" y1="90" x2="140" y2="115" className={styles.connection_line} />
          <line x1="90" y1="140" x2="140" y2="115" className={styles.connection_line} />
        </g>

        {/* Animated Traveling Pulses */}
        <circle className={`${styles.pulse_dot} ${styles.p1}`} r="3.5" fill="currentColor" />
        <circle className={`${styles.pulse_dot} ${styles.p2}`} r="3.5" fill="currentColor" />
        <circle className={`${styles.pulse_dot} ${styles.p3}`} r="3.5" fill="currentColor" />
        <circle className={`${styles.pulse_dot} ${styles.p4}`} r="3.5" fill="currentColor" />
        <circle className={`${styles.pulse_dot} ${styles.p5}`} r="3.5" fill="currentColor" />

        {/* Nodes Layer 1 */}
        <g className={styles.nodes_layer}>
          <circle cx="40" cy="50" r="7" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="40" cy="90" r="7" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="40" cy="130" r="7" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />

          {/* Nodes Layer 2 */}
          <circle cx="90" cy="40" r="8" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="90" cy="90" r="9" fill="var(--bg-card)" stroke="currentColor" strokeWidth="3" />
          <circle cx="90" cy="140" r="8" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />

          {/* Nodes Layer 3 */}
          <circle cx="140" cy="65" r="7" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="140" cy="115" r="7" fill="var(--bg-card)" stroke="currentColor" strokeWidth="2.5" />
        </g>

        {/* Inner Glowing Core Dots */}
        <circle cx="40" cy="50" r="3" fill="currentColor" className={styles.node_core} />
        <circle cx="40" cy="90" r="3" fill="currentColor" className={styles.node_core} />
        <circle cx="40" cy="130" r="3" fill="currentColor" className={styles.node_core} />
        <circle cx="90" cy="40" r="3.5" fill="currentColor" className={styles.node_core} />
        <circle cx="90" cy="90" r="4.5" fill="currentColor" className={styles.node_core_center} />
        <circle cx="90" cy="140" r="3.5" fill="currentColor" className={styles.node_core} />
        <circle cx="140" cy="65" r="3" fill="currentColor" className={styles.node_core} />
        <circle cx="140" cy="115" r="3" fill="currentColor" className={styles.node_core} />
      </svg>
    </div>
  );
};

export const WaveformAnimation: React.FC = () => {
  return (
    <div className={styles.svg_wrapper} title="Waveform Signal Animation">
      <svg
        viewBox="0 0 180 180"
        className={styles.svg_canvas}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid Lines */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.08">
          <line x1="20" y1="40" x2="160" y2="40" />
          <line x1="20" y1="65" x2="160" y2="65" />
          <line x1="20" y1="90" x2="160" y2="90" />
          <line x1="20" y1="115" x2="160" y2="115" />
          <line x1="20" y1="140" x2="160" y2="140" />

          <line x1="40" y1="20" x2="40" y2="160" />
          <line x1="65" y1="20" x2="65" y2="160" />
          <line x1="90" y1="20" x2="90" y2="160" />
          <line x1="115" y1="20" x2="115" y2="160" />
          <line x1="140" y1="20" x2="140" y2="160" />
        </g>

        {/* Circle Boundary */}
        <circle cx="90" cy="90" r="80" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />

        {/* Dim Baseline Trace */}
        <path
          d="M 15 90 H 45 L 55 75 L 65 105 L 75 40 L 88 145 L 98 60 L 108 100 L 118 90 H 165"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glowing Animated Pulse Trace */}
        <path
          d="M 15 90 H 45 L 55 75 L 65 105 L 75 40 L 88 145 L 98 60 L 108 100 L 118 90 H 165"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.waveform_path}
        />

        {/* Leading Pulse Dot */}
        <circle cx="88" cy="145" r="4" fill="currentColor" className={styles.signal_dot} />
      </svg>
    </div>
  );
};
