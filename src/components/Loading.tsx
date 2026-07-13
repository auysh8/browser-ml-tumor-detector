import styles from "./css/Loading.module.css";
import { FaBrain } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.loading_card}>
        <div className={styles.animation_container}>
          <div className={styles.pulse_ring}></div>
          <div className={styles.icon_circle}>
            <FaBrain className={styles.brain_icon} />
          </div>
          <div className={styles.spinner_overlay}>
            <BiLoaderAlt />
          </div>
        </div>

        <div className={styles.text_content}>
          <h2 className={styles.title}>Analyzing Scan</h2>
          <p className={styles.subtitle}>
            Our AI is processing the MRI data. This usually takes a few seconds...
          </p>
        </div>

        <div className={styles.progress_bar_container}>
            <div className={styles.progress_fill}></div>
        </div>

      </div>
    </div>
  );
};

export default Loading;