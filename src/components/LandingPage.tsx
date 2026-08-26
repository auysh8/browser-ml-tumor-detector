import styles from "./css/LandingPage.module.css";
import { FiArrowRight, FiShield, FiCpu, FiActivity, FiLayers } from "react-icons/fi";

interface LandingPageProps {
  onLaunchDashboard: () => void;
  onViewModelSpecs: () => void;
}

const LandingPage = ({ onLaunchDashboard, onViewModelSpecs }: LandingPageProps) => {
  return (
    <div className={styles.landing_container}>
      {/* Hero Section */}
      <section className={styles.hero_section}>
        <div className={styles.hero_badge}>
          <span className={styles.badge_dot}></span>
          <span>Browser Machine Learning Platform</span>
        </div>

        <h1 className={styles.hero_title}>
          Brain Tumor Screening <br />
          <span className={styles.hero_title_italic}>Directly In Browser</span>
        </h1>

        <p className={styles.hero_subtitle}>
          Private WebGL-accelerated neural classification. Zero cloud transfers, local processing, and sub-50ms latency.
        </p>

        <div className={styles.hero_ctas}>
          <button className={styles.cta_primary} onClick={onLaunchDashboard} type="button">
            <span>Open Workstation</span>
            <FiArrowRight className={styles.cta_icon} />
          </button>
          <button className={styles.cta_secondary} onClick={onViewModelSpecs} type="button">
            <span>Model Specs</span>
          </button>
        </div>

        {/* Hero Feature Badges */}
        <div className={styles.hero_highlights}>
          <div className={styles.highlight_item}>
            <FiShield className={styles.highlight_icon} />
            <div>
              <strong>100% Private</strong>
              <span>Runs in browser memory</span>
            </div>
          </div>
          <div className={styles.highlight_item}>
            <FiCpu className={styles.highlight_icon} />
            <div>
              <strong>WebGL GPU Engine</strong>
              <span>Sub-50ms inference</span>
            </div>
          </div>
          <div className={styles.highlight_item}>
            <FiActivity className={styles.highlight_icon} />
            <div>
              <strong>4 Classes</strong>
              <span>Glioma, Meningioma, Pituitary, Normal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className={styles.features_section}>
        <div className={styles.feature_grid}>
          <div className={styles.feature_card}>
            <div className={styles.feature_icon_box}>
              <FiShield />
            </div>
            <h3>Private Sandbox</h3>
            <p>
              Scans are evaluated locally in memory without API calls or cloud uploads.
            </p>
          </div>

          <div className={styles.feature_card}>
            <div className={styles.feature_icon_box}>
              <FiLayers />
            </div>
            <h3>Probability Distribution</h3>
            <p>
              Real-time logits and softmax confidence scores across all scan categories.
            </p>
          </div>

          <div className={styles.feature_card}>
            <div className={styles.feature_icon_box}>
              <FiCpu />
            </div>
            <h3>Quantized Model</h3>
            <p>
              Optimized 224x224 graph model for client-side GPU acceleration.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className={styles.workflow_section}>
        <div className={styles.workflow_grid}>
          <div className={styles.workflow_step}>
            <span className={styles.step_num}>01</span>
            <h4>Import Scan</h4>
            <p>Drop or select an MRI image file.</p>
          </div>

          <div className={styles.workflow_step}>
            <span className={styles.step_num}>02</span>
            <h4>Analyze</h4>
            <p>Process tensor in WebGL sandbox.</p>
          </div>

          <div className={styles.workflow_step}>
            <span className={styles.step_num}>03</span>
            <h4>Review</h4>
            <p>View diagnosis, curves, and export JSON.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
