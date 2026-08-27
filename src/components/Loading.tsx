import { useState } from "react";
import styles from "./css/Loading.module.css";
import {
  BrainScanAnimation,
  NeuralNetworkAnimation,
  WaveformAnimation,
} from "./LoadingAnimations";
import { FaBrain, FaNetworkWired, FaWaveSquare } from "react-icons/fa";

type AnimationMode = "brain" | "network" | "waveform";

const MODE_CONFIGS: Record<
  AnimationMode,
  {
    name: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType;
    Component: React.ComponentType;
  }
> = {
  brain: {
    name: "Brain Scan",
    title: "Brain Scan Analysis",
    subtitle: "Performing high-resolution voxel slice scanning and feature mapping...",
    icon: FaBrain,
    Component: BrainScanAnimation,
  },
  network: {
    name: "Neural Network",
    title: "Neural Tensor Inference",
    subtitle: "Running GraphModel graph evaluation across WebGL GPU memory shaders [1, 224, 224, 3]...",
    icon: FaNetworkWired,
    Component: NeuralNetworkAnimation,
  },
  waveform: {
    name: "Waveform Pulse",
    title: "Neural Signal Waveform",
    subtitle: "Analyzing high-frequency neural pulse metrics & tissue density dynamics...",
    icon: FaWaveSquare,
    Component: WaveformAnimation,
  },
};

const Loading = () => {
  const [activeMode, setActiveMode] = useState<AnimationMode>("brain");

  const handleNextMode = () => {
    const modes: AnimationMode[] = ["brain", "network", "waveform"];
    const currentIndex = modes.indexOf(activeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setActiveMode(modes[nextIndex]);
  };

  const currentConfig = MODE_CONFIGS[activeMode];
  const ActiveAnimation = currentConfig.Component;

  return (
    <div className={styles.loading_wrapper}>
      {/* Switcher Controls */}
      <div className={styles.switcher_bar}>
        <div className={styles.mode_pills}>
          {(["brain", "network", "waveform"] as AnimationMode[]).map((mode) => {
            const Icon = MODE_CONFIGS[mode].icon;
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                type="button"
                className={`${styles.pill_btn} ${isActive ? styles.pill_active : ""}`}
                onClick={() => setActiveMode(mode)}
                title={`Switch to ${MODE_CONFIGS[mode].name}`}
              >
                <Icon />
                <span>{MODE_CONFIGS[mode].name}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.cycle_btn}
          onClick={handleNextMode}
          title="Switch Loading Animation"
        >
          Change Animation
        </button>
      </div>

      <div className={styles.animation_container}>
        <ActiveAnimation />
      </div>

      <div className={styles.text_content}>
        <h2 className={styles.title}>{currentConfig.title}</h2>
        <p className={styles.subtitle}>{currentConfig.subtitle}</p>
      </div>

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_fill}></div>
      </div>
    </div>
  );
};

export default Loading;
