# NeuroScan AI — Browser ML Tumor Detector

A client-side machine learning web workstation that classifies brain tumors from MRI scans directly within the browser with zero server dependencies. Built with TensorFlow.js, React, and TypeScript for private, real-time medical imaging diagnostics.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## Live Application

- **Live Application (Vercel):** [https://brain-tumor-detector-pi.vercel.app/](https://brain-tumor-detector-pi.vercel.app/)

---

## Visual Preview

| Landing Overview | Diagnostic Workstation |
| :---: | :---: |
| ![Landing Overview](image.png) | ![Diagnostic Workstation](Results.png) |

---

## Project Overview

Brain tumor detection traditionally requires specialized software or uploading sensitive medical imagery to external cloud servers.

**NeuroScan AI** performs deep learning inference on-device using WebGL acceleration:
- **100% Client-Side Processing:** MRI scans are processed purely in the browser; no patient health data leaves the local machine.
- **Zero Server Infrastructure:** Completely static architecture with zero backend hosting cost.
- **Real-Time Classification:** Instant inference across 4 tumor classes (Glioma, Meningioma, Pituitary, No Tumor) plus invalid image detection.
- **Collapsible Sidebar & Dark Mode:** Clean clinical workstation layout with responsive navigation and theme switching.

---

## Repository Structure

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
│   │   ├── css/                 # Modular CSS styling
│   │   ├── About.tsx            # Model specifications
│   │   ├── LandingPage.tsx      # Overview and feature landing page
│   │   ├── Loading.tsx          # Inference loading state
│   │   ├── Results.tsx          # Classification & probability wave density
│   │   ├── ScanArchive.tsx      # Session scan history log
│   │   ├── TopBar.tsx           # Collapsible sidebar navigation
│   │   └── UploadMri.tsx        # File drag-and-drop handler
│   ├── App.tsx                  # Root application state & tab router
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global base styles & themes
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Architecture & Data Flow

```mermaid
flowchart TD
    A[User / Medical Staff] -->|Import MRI Scan| B[Drag & Drop UI]
    B -->|Convert to HTMLImageElement| C[Image Preprocessing / Tensor Normalization 224x224]
    C -->|Feed Tensor| D[TensorFlow.js Graph Model]
    D -->|Softmax Probabilities| E[Class Classification & Confidence Evaluation]
    E -->|Render Urgency & Confidence Score| F[Results Dashboard]
```

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Machine Learning** | TensorFlow.js (GraphModel runtime, WebGL acceleration) |
| **Styling** | Modular CSS, Custom CSS Variables, React Icons |
| **Tooling** | ESLint, TypeScript Compiler |
| **Hosting & Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/auysh8/browser-ml-tumor-detector.git
   cd browser-ml-tumor-detector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server |
| `npm run build` | Compiles TypeScript and builds production distribution into `dist` |
| `npm run preview` | Previews production build locally |

---

## Model Classification Classes

The model classifies uploaded brain MRI scans into the following categories:
- **0: Glioma** — High Urgency
- **1: Meningioma** — High Urgency
- **2: Not an MRI** — Input validation check
- **3: No Tumor** — Normal scan (No urgency)
- **4: Pituitary** — High Urgency

---

## License

This project is open-source and licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
