import styles from "./css/Loading.module.css";
import { NeuralNetworkAnimation } from "./LoadingAnimations";

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.animation_container}>
        <NeuralNetworkAnimation />
      </div>

      <div className={styles.text_content}>
        <h2 className={styles.title}>Neural Tensor Inference</h2>
        <p className={styles.subtitle}>
          Running GraphModel graph evaluation across WebGL GPU memory shaders [1, 224, 224, 3]...
        </p>
      </div>
    </div>
  );
};

export default Loading;
