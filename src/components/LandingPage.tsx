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
          <span>Browser-Based Neural Oncology Enclave</span>
        </div>

        <h1 className={styles.hero_title}>
          Automated Brain Tumor Detection <br />
          <span className={styles.hero_title_italic}>Directly In Your Web Browser</span>
        </h1>

        <p className={styles.hero_subtitle}>
          NeuroScan leverages client-side WebGL acceleration and TensorFlow.js to execute quantized convolutional graph models locally. Zero cloud transfers, zero data retention, and instant inference latency.
        </p>

        <div className={styles.hero_ctas}>
          <button className={styles.cta_primary} onClick={onLaunchDashboard} type="button">
            <span>Launch Clinical Dashboard</span>
            <FiArrowRight className={styles.cta_icon} />
          </button>
          <button className={styles.cta_secondary} onClick={onViewModelSpecs} type="button">
            <span>Model Specifications</span>
          </button>
        </div>

        {/* Hero Feature Badges */}
        <div className={styles.hero_highlights}>
          <div className={styles.highlight_item}>
            <FiShield className={styles.highlight_icon} />
            <div>
              <strong>100% Private</strong>
              <span>Scans never leave browser sandbox</span>
            </div>
          </div>
          <div className={styles.highlight_item}>
            <FiCpu className={styles.highlight_icon} />
            <div>
              <strong>WebGL GPU Engine</strong>
              <span>Sub-50ms local inference latency</span>
            </div>
          </div>
          <div className={styles.highlight_item}>
            <FiActivity className={styles.highlight_icon} />
            <div>
              <strong>4-Class Classification</strong>
              <span>Glioma, Meningioma, Pituitary, Normal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className={styles.features_section}>
        <div className={styles.section_header}>
          <span className={styles.mono_tag}>'CORE CAPABILITIES'</span>
          <h2 className={styles.section_title}>Engineering Designed for Precision & Privacy</h2>
          <p className={styles.section_sub}>
            Combining modern browser machine learning runtimes with clinical-grade visual analytics and local telemetry export.
          </p>
        </div>

        <div className={styles.feature_grid}>
          <div className={styles.feature_card}>
            <div className={styles.feature_icon_box}>
              <FiShield />
            </div>
            <h3>Zero-Retention Enclave</h3>
            <p>
              Patient MRI acquisitions are resampled and evaluated locally in-memory. No external API calls, servers, or cloud storage required.
            </p>
          </div>

          <div className={styles.feature_card}>
            <div className={styles.feature_icon_box}>
              <FiLayers />
            </div>
            <h3>Softmax Probability Curves</h3>
            <p>
              View continuous visual probability density curves representing model logits for Glioma, Meningioma, Pituitary, and Normal classifications.
            </p>
          </div>

          <div className={styles.feature_card}>
            <div className={styles.feature_icon_box}>
              <FiCpu />
            </div>
            <h3>GraphModel Quantization</h3>
            <p>
              Lightweight 224x224 bilinear input tensor graph model optimized for rapid memory allocation and execution on client WebGL GPUs.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className={styles.workflow_section}>
        <div className={styles.section_header}>
          <span className={styles.mono_tag}>'OPERATIONAL WORKFLOW'</span>
          <h2 className={styles.section_title}>3-Step Diagnostic Screening</h2>
        </div>

        <div className={styles.workflow_grid}>
          <div className={styles.workflow_step}>
            <span className={styles.step_num}>01</span>
            <h4>Import Axial Scan</h4>
            <p>Select or drag an axial brain MRI scan image directly into the workstation dropzone.</p>
          </div>

          <div className={styles.workflow_step}>
            <span className={styles.step_num}>02</span>
            <h4>Local Inference</h4>
            <p>TensorFlow.js processes the tensor in WebGL sandbox with real-time confidence metrics.</p>
          </div>

          <div className={styles.workflow_step}>
            <span className={styles.step_num}>03</span>
            <h4>Export Telemetry</h4>
            <p>Inspect topography, toggle contrast inversion, and copy JSON telemetry or print reports.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className={styles.banner_section}>
        <div className={styles.banner_content}>
          <h2>Ready to perform browser-based neural screening?</h2>
          <p>Access the workstation dashboard immediately without registration or data upload.</p>
          <button className={styles.cta_primary} onClick={onLaunchDashboard} type="button">
            <span>Open Workstation Dashboard</span>
            <FiArrowRight className={styles.cta_icon} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
