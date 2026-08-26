import styles from "./css/About.module.css";

const About = () => {
  return (
    <div className={styles.about_wrapper}>
      <div>
        <h2 className={styles.about_title}>Model Specifications</h2>
        <p className={styles.about_sub}>
          Quantized graph model executing client-side via TensorFlow.js and WebGL.
        </p>
      </div>

      <div className={styles.section_grid}>
        {/* Model Architecture Specs */}
        <div className={styles.section_card}>
          <h3 className={styles.card_heading}>Technical Specs</h3>
          <div className={styles.specs_table}>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Model</span>
              <span className={styles.spec_val}>Quantized GraphModel</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Input Shape</span>
              <span className={styles.spec_val}>Float32 [1, 224, 224, 3]</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Classes</span>
              <span className={styles.spec_val}>Glioma, Meningioma, Pituitary, Normal, Non-MRI</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Runtime</span>
              <span className={styles.spec_val}>TensorFlow.js WebGL</span>
            </div>
            <div className={styles.spec_row}>
              <span className={styles.spec_key}>Privacy</span>
              <span className={styles.spec_val}>100% Client-Side</span>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className={styles.section_card}>
          <h3 className={styles.card_heading}>Architecture & Verification</h3>
          <div className={styles.team_list}>
            <div className={styles.team_item}>
              <div className={styles.member_avatar}>CL</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>Clinical Protocols</span>
                <span className={styles.member_role}>Validation & Metrics</span>
              </div>
            </div>

            <div className={styles.team_item}>
              <div className={styles.member_avatar}>ML</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>ML Engineering</span>
                <span className={styles.member_role}>Graph Optimization</span>
              </div>
            </div>

            <div className={styles.team_item}>
              <div className={styles.member_avatar}>FE</div>
              <div className={styles.member_details}>
                <span className={styles.member_name}>Frontend Engineering</span>
                <span className={styles.member_role}>WebGL Acceleration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
