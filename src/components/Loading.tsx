import styles from "./css/Loading.module.css";
import { NeuralNetworkAnimation } from "./LoadingAnimations";

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.animation_container}>
        <NeuralNetworkAnimation />
      </div>

      <div className={styles.text_content}>
        <h2 className={styles.title}>Analyzing MRI...</h2>
      </div>
    </div>
  );
};

export default Loading;
