import styles from "./css/Loading.module.css";
import { FaBrain } from "react-icons/fa";

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.animation_container}>
        <div className={styles.pulse_ring}></div>
        <div className={styles.icon_circle}>
          <FaBrain />
        </div>
        <div className={styles.spinner_overlay}></div>
      </div>

      <div className={styles.text_content}>
        <h2 className={styles.title}>Neural Inference in Progress</h2>
        <p className={styles.subtitle}>
          TensorFlow.js is evaluating tensor probabilities across neural network graph layers...
        </p>
      </div>

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_fill}></div>
      </div>
    </div>
  );
};

export default Loading;
