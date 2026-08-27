import styles from "./css/Loading.module.css";
import {
  BrainScanAnimation,
  NeuralNetworkAnimation,
  WaveformAnimation,
} from "./LoadingAnimations";
import type { AnimationMode } from "./UploadMri";

const MODE_CONFIGS: Record<
  AnimationMode,
  {
    name: string;
    title: string;
    subtitle: string;
    Component: React.ComponentType;
  }
> = {
  brain: {
    name: "Brain Scan",
    title: "Brain Scan Analysis",
    subtitle: "Performing high-resolution voxel slice scanning and feature mapping...",
    Component: BrainScanAnimation,
  },
  network: {
    name: "Neural Network",
    title: "Neural Tensor Inference",
    subtitle: "Running GraphModel graph evaluation across WebGL GPU memory shaders [1, 224, 224, 3]...",
    Component: NeuralNetworkAnimation,
  },
  waveform: {
    name: "Waveform Pulse",
    title: "Neural Signal Waveform",
    subtitle: "Analyzing high-frequency neural pulse metrics & tissue density dynamics...",
    Component: WaveformAnimation,
  },
};

interface LoadingProps {
  animationMode?: AnimationMode;
}

const Loading = ({ animationMode = "brain" }: LoadingProps) => {
  const currentConfig = MODE_CONFIGS[animationMode];
  const ActiveAnimation = currentConfig.Component;

  return (
    <div className={styles.loading_wrapper}>
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
