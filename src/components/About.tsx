import styles from "./css/About.module.css";

const About = () => {
  return (
    <div className={styles.about_wrapper}>
      <div>
        <span className={styles.mono_tag}>'SYSTEM MANIFEST'</span>
        <h2 className={styles.about_title}>Model Specifications & Research Team</h2>
        <p className={styles.about_sub}>
          NeuroScan AI is a client-side deep learning workstation performing private automated brain tumor screening from MRI scans. Powered by TensorFlow.js, it executes quantized convolutional neural graph models directly inside WebGL GPU sandbox.
        </p>
      </div>

      <div className={styles.section_grid}>
        {/* Model Architecture Specs */}
        <div className={styles.section_card}>
          <h3 className={styles.card_heading}>Tensor Network Specifications</h3>
          <div className={styles.specs_table}>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Model Topology</span>
              <span className={styles.spec_val}>Quantized GraphModel</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Tensor Dimensions</span>
              <span className={styles.spec_val}>Float32 [1, 224, 224, 3]</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Target Classes</span>
              <span className={styles.spec_val}>Glioma, Meningioma, Pituitary, Normal, Non-MRI</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Execution Engine</span>
              <span className={styles.spec_val}>TensorFlow.js WebGL GPU Sandbox</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Data Privacy</span>
              <span className={styles.spec_val}>100% Client-Side Local Enclave</span>
            </div>
          </div>
        </div>

        {/* Project Supervision & Team */}
        <div className={styles.section_card}>
          <h3 className={styles.card_heading}>Research & Development Team</h3>
          <div className={styles.team_list}>
            <div className={styles.team_item}>
              <div className={styles.member_avatar}>SD</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>Dr. Shri Prakash Dwivedi</span>
                <span className={styles.member_role}>Project Guide & Research Supervisor</span>
              </div>
            </div>

            <div className={styles.team_item}>
              <div className={styles.member_avatar}>DM</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>Dipesh Maindolia</span>
                <span className={styles.member_role}>ID: 58875 — ML Integration</span>
              </div>
            </div>

            <div className={styles.team_item}>
              <div className={styles.member_avatar}>PB</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>Pankaj Bhandari</span>
                <span className={styles.member_role}>ID: 58950 — Workstation Architecture</span>
              </div>
            </div>

            <div className={styles.team_item}>
              <div className={styles.member_avatar}>NS</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>Nikunj Sharma</span>
                <span className={styles.member_role}>ID: 58948 — Model Testing & Evaluation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
