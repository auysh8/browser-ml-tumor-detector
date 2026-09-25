import styles from "./css/Loading.module.css";
import { BrainScanAnimation } from "./LoadingAnimations";

const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.animation_box}>
        <BrainScanAnimation />
      </div>
      <h3 className={styles.title}>Analyzing MRI Scan</h3>
      <p className={styles.status}>Running neural network classification...</p>
    </div>
  );
};

export default Loading;
