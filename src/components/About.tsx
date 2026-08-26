import styles from "./css/About.module.css";
import { FaBrain, FaUserGraduate, FaShieldAlt, FaLightbulb, FaFlask } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

const About = () => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.content}>
        {/* Hero Card */}
        <section className={styles.hero_card}>
          <div className={styles.hero_tag}>
            <FaBrain />
            <span>Brain Tumor AI Screening</span>
          </div>
          <h1 className={styles.hero_title}>About NeuroScanAI</h1>
          <p className={styles.hero_subtitle}>
            NeuroScanAI is a client-side medical machine learning web application that assists in automated early screening of brain tumors from MRI scans. Operating purely on-device via TensorFlow.js, it ensures complete patient data privacy with zero server dependency.
          </p>
          <div className={styles.hero_badges}>
            <span className={styles.badge}>
              <FaShieldAlt style={{ marginRight: "6px" }} /> On-Device Inference
            </span>
            <span className={styles.badge}>
              <FaBrain style={{ marginRight: "6px" }} /> 4-Class Diagnostic Model
            </span>
            <span className={styles.badge}>
              <MdVerifiedUser style={{ marginRight: "6px" }} /> Private & Secure
            </span>
          </div>
        </section>

        {/* Project Guide Section */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <FaUserGraduate style={{ color: "var(--m3-primary)" }} />
            <span>Project Supervisor</span>
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
                <p className={styles.card_subtitle}>Project Guide & Mentor</p>
                <p className={styles.card_text}>
                  Providing technical direction and domain expertise for neural network model validation and medical imaging diagnostic research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <FaFlask style={{ color: "var(--m3-primary)" }} />
            <span>Research & Development Team</span>
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
                <p className={styles.card_text}>
                  Machine Learning & Web Integration Engineer
                </p>
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
                <p className={styles.card_text}>
                  Frontend Architecture & UI Specialist
                </p>
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
                <p className={styles.card_text}>
                  Data Preprocessing & Evaluation Specialist
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <FaLightbulb style={{ color: "var(--m3-warning)" }} />
            <span>Key Project Innovations</span>
          </h2>
          <div className={styles.highlights_grid}>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Zero Backend Infrastructure</h3>
              <p className={styles.highlight_text}>
                Model weights are loaded locally into browser WebGL/WASM memory, running inferences in milliseconds without backend latency.
              </p>
            </div>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Transparent Multi-Class Evaluation</h3>
              <p className={styles.highlight_text}>
                Outputs confidence percentages for Glioma, Meningioma, Pituitary, and Normal scans alongside input validity verification.
              </p>
            </div>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Responsive Clinical Ergonomics</h3>
              <p className={styles.highlight_text}>
                Designed around Material 3 Expressive standards with light and dark mode adaptivity across desktop and mobile devices.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
