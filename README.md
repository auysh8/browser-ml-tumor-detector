# Browser ML Tumor Detector 🧠

Client-side machine learning application for instant, privacy-focused brain MRI scan classification using TensorFlow.js and React.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📸 Visual Preview

| Application Overview | Detection Results |
| :---: | :---: |
| ![Application Overview](https://raw.githubusercontent.com/auysh8/browser-ml-tumor-detector/main/image.png) | ![Detection Results](https://raw.githubusercontent.com/auysh8/browser-ml-tumor-detector/main/Results.png) |

---

## ✨ Features

- **100% Client-Side Inference**: Runs deep learning models directly in the web browser using WebGL acceleration via TensorFlow.js.
- **Privacy-First Processing**: Patient MRI scans never leave the local browser session; no backend server uploads or external API requests.
- **Instant Analysis**: Near real-time prediction and probability scoring for uploaded MRI scans.
- **Detailed Classification Results**: Generates actionable insight reports including class probability distributions and visual feedback.
- **Modular Component Architecture**: Clean UI built with React, TypeScript, and CSS Modules for robust state management and styling isolation.

---

## 📂 Repository Structure

```text
browser-ml-tumor-detector/
├── public/
│   └── tfjs_model/              # Quantized TensorFlow.js neural network files
│       ├── group1-shard1of4.bin
│       ├── group1-shard2of4.bin
│       ├── group1-shard3of4.bin
│       ├── group1-shard4of4.bin
│       └── model.json           # Model topology and manifest
├── src/
│   ├── components/
│   │   ├── css/                 # CSS Modules for targeted styling
│   │   │   ├── About.module.css
│   │   │   ├── Loading.module.css
│   │   │   ├── Results.module.css
│   │   │   ├── TopBar.module.css
│   │   │   └── UploadMri.module.css
│   │   ├── About.tsx            # Project explanation and guidelines
│   │   ├── Loading.tsx          # Inference loading state view
│   │   ├── Results.tsx          # Model output visualization component
│   │   ├── TopBar.tsx           # Application navigation header
│   │   └── UploadMri.tsx        # File drag-and-drop & pre-processing handler
│   ├── App.tsx                  # Root application state & lifecycle
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global base styles
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript |
| **Machine Learning** | TensorFlow.js (`@tensorflow/tfjs`) |
| **Build Tooling & Bundler** | Vite |
| **Code Quality** | ESLint |
| **Styling** | Modular CSS (CSS Modules), Custom CSS |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/auysh8/browser-ml-tumor-detector.git
   cd browser-ml-tumor-detector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to interact with the application.

---

## 📖 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server with hot module replacement (HMR). |
| `npm run build` | Compiles TypeScript and builds production artifacts into the `dist/` folder. |
| `npm run lint` | Runs ESLint across source files to enforce code style and catch issues. |
| `npm run preview` | Serves the production build locally for verification before deployment. |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
