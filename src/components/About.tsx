import styles from "./css/About.module.css";

const About = () => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.content}>
        {/* Hero / overview */}
        <section className={styles.hero}>
          <p className={styles.hero_tag}>Brain Tumor Detection · MRI</p>
          <h1 className={styles.hero_title}>About this project</h1>
          <p className={styles.hero_subtitle}>
            NeuroScanAI is an experimental tool that uses deep learning to assist with
            early screening of brain tumors from MRI scans. It is designed for
            learning, research, and demonstrating how AI can support radiology
            workflows.
          </p>
          <div className={styles.hero_badges}>
            <span className={styles.badge}>AI-powered analysis</span>
            <span className={styles.badge}>MRI brain scans</span>
            <span className={styles.badge}>Privacy-focused</span>
          </div>
        </section>

        {/* Project guide */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>Project Guide</h2>
          <div className={styles.cards_row}>
            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  {/* Replace the src below with your guide's photo later */}
                  <img
                    src="https://via.placeholder.com/120x120.png?text=Guide"
                    alt="Dr. Shri Prakash Dwivedi"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h2 className={styles.card_title}>Dr. Shri Prakash Dwivedi</h2>
                <p className={styles.card_subtitle}>Project Guide</p>
                <p className={styles.card_text}>
                  Guiding the research, methodology, and clinical relevance of the
                  brain tumor detection system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team members */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>Team Members</h2>
          <div className={styles.cards_grid}>
            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <img
                    src="https://via.placeholder.com/120x120.png?text=DM"
                    alt="Dipesh Maindolia"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Dipesh Maindolia</h3>
                <p className={styles.card_subtitle}>ID: 58875</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <img
                    src="https://via.placeholder.com/120x120.png?text=PB"
                    alt="Pankaj Bhandari"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Pankaj Bhandari</h3>
                <p className={styles.card_subtitle}>ID: 58950</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <img
                    src="https://via.placeholder.com/120x120.png?text=NS"
                    alt="Nikunj Sharma"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h3 className={styles.card_title}>Nikunj Sharma</h3>
                <p className={styles.card_subtitle}>ID: 58948</p>
              </div>
            </div>
          </div>
        </section>

        {/* Extra project highlights */}
        <section className={styles.section}>
          <h2 className={styles.section_title}>Project highlights</h2>
          <div className={styles.highlights_grid}>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>End-to-end pipeline</h3>
              <p className={styles.highlight_text}>
                From uploading MRI scans to getting model predictions, the
                interface is designed to be simple and classroom-friendly.
              </p>
            </div>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Explainable results</h3>
              <p className={styles.highlight_text}>
                Clear labels and confidence scores help users understand what the
                model is predicting for each scan.
              </p>
            </div>
            <div className={styles.highlight_card}>
              <h3 className={styles.highlight_title}>Future extensions</h3>
              <p className={styles.highlight_text}>
                You can extend this project with more tumor types,
                heatmaps/Grad-CAM, or integration with hospital PACS systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
