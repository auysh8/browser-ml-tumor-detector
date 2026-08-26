import styles from "./css/About.module.css";
import { FaBrain, FaUserGraduate, FaShieldAlt, FaFlask, FaMicrochip } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

const About = () => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.content}>
        {/* Technical Specification Hero */}
        <section className={styles.hero_card}>
          <div className={styles.hero_tag}>
            <FaBrain />
            <span>Neural Diagnostic System Specs</span>
          </div>
          <h1 className={styles.hero_title}>NeuroScan AI Workstation</h1>
          <p className={styles.hero_subtitle}>
            Client-side deep learning web workstation engineered for on-device, private automated brain MRI screening. Powered by TensorFlow.js, it executes quantized convolutional neural graph models directly within browser WebGL GPU memory with zero server data retention.
          </p>
          <div className={styles.hero_badges}>
            <span className={styles.badge}>
              <FaMicrochip style={{ marginRight: "6px", color: "var(--m3-primary)" }} /> TensorFlow.js WebGL Runtime
            </span>
            <span className={styles.badge}>
              <FaShieldAlt style={{ marginRight: "6px", color: "var(--m3-success)" }} /> On-Device HIPAA Compliance
            </span>
            <span className={styles.badge}>
              <MdVerifiedUser style={{ marginRight: "6px", color: "var(--m3-primary)" }} /> 224x224 Bilinear Tensor Input
            </span>
          </div>
        </section>

        {/* Model Architecture Technical Matrix */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <FaMicrochip style={{ color: "var(--m3-primary)" }} />
            <span>AI Neural Network Specifications</span>
          </h2>
          <div className={styles.highlights_grid}>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Topology & Quantization</h3>
              <p className={styles.highlight_text}>
                Quantized GraphModel manifest (`tfjs_model/model.json`) sharded into 4 binary weights files (`group1-shard1of4.bin` to `shard4of4.bin`).
              </p>
            </div>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Target Classification Classes</h3>
              <p className={styles.highlight_text}>
                5 Target Classes: 0: Glioma, 1: Meningioma, 2: Not an MRI (Invalid format check), 3: No Tumor (Normal), 4: Pituitary.
              </p>
            </div>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Zero Cloud Footprint</h3>
              <p className={styles.highlight_text}>
                100% static architecture running offline. No patient imagery or health metrics are ever transmitted across networks.
              </p>
            </div>
          </div>
        </section>

        {/* Project Supervision */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <FaUserGraduate style={{ color: "var(--m3-primary)" }} />
            <span>Project Guidance & Direction</span>
          </h2>
          <div className={styles.cards_grid}>
            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <span>SD</span>
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Dr. Shri Prakash Dwivedi</h3>
                <p className={styles.card_subtitle}>Project Guide & Research Supervisor</p>
                <p className={styles.card_text}>
                  Directing research methodology, clinical imaging evaluation, and neural network performance metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <FaFlask style={{ color: "var(--m3-primary)" }} />
            <span>Development & Engineering Team</span>
          </h2>
          <div className={styles.cards_grid}>
            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <span>DM</span>
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Dipesh Maindolia</h3>
                <p className={styles.card_subtitle}>ID: 58875</p>
                <p className={styles.card_text}>Machine Learning & Tensor Pipeline Integration</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <span>PB</span>
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Pankaj Bhandari</h3>
                <p className={styles.card_subtitle}>ID: 58950</p>
                <p className={styles.card_text}>Workstation Architecture & Diagnostic Interface Specialist</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <span>NS</span>
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Nikunj Sharma</h3>
                <p className={styles.card_subtitle}>ID: 58948</p>
                <p className={styles.card_text}>Data Preprocessing & Network Testing Specialist</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
