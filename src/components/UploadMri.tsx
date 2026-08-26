import { useState, type ChangeEvent, type DragEvent } from "react";
import styles from "./css/UploadMri.module.css";
import { FaCloudUploadAlt, FaArrowRight, FaBrain, FaRegFileImage } from "react-icons/fa";
import { BsStars, BsLightningChargeFill } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";

interface UploadMriProps {
  onClick: (file: File) => void;
}

const UploadMri = ({ onClick }: UploadMriProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileChange(selectedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileChange(droppedFile);
    }
  };

  // Helper to generate sample MRI scan images on the fly via canvas
  const handleSelectPreset = (type: "tumor" | "normal" | "invalid") => {
    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0a0a0d";
    ctx.fillRect(0, 0, 224, 224);

    if (type === "invalid") {
      // Non-MRI sample image (e.g., color photo background)
      const grad = ctx.createLinearGradient(0, 0, 224, 224);
      grad.addColorStop(0, "#ff7e5f");
      grad.addColorStop(1, "#feb47b");
      ctx.fillStyle = grad;
      ctx.fillRect(20, 20, 184, 184);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Standard Photo", 112, 118);
    } else {
      // Synthetic MRI Brain Scan Drawing
      // Outer Skull
      ctx.beginPath();
      ctx.ellipse(112, 112, 85, 95, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "#1e1e24";
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#4a4a5a";
      ctx.stroke();

      // Brain Parenchyma
      ctx.beginPath();
      ctx.ellipse(112, 112, 75, 85, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "#2c2c38";
      ctx.fill();

      // Brain Gyri / Tissue Detail
      ctx.fillStyle = "#5c5c70";
      for (let i = 0; i < 12; i++) {
        const x = 75 + (i % 4) * 22;
        const y = 60 + Math.floor(i / 4) * 35;
        ctx.beginPath();
        ctx.arc(x, y, 10 + (i % 3) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ventricles
      ctx.fillStyle = "#121216";
      ctx.beginPath();
      ctx.ellipse(100, 105, 8, 22, -0.2, 0, 2 * Math.PI);
      ctx.ellipse(124, 105, 8, 22, 0.2, 0, 2 * Math.PI);
      ctx.fill();

      if (type === "tumor") {
        // High-intensity tumor lesion with edema
        const tumorGrad = ctx.createRadialGradient(85, 85, 2, 85, 85, 22);
        tumorGrad.addColorStop(0, "#ffffff");
        tumorGrad.addColorStop(0.5, "#d0d0e8");
        tumorGrad.addColorStop(1, "rgba(180, 180, 210, 0)");

        ctx.fillStyle = tumorGrad;
        ctx.beginPath();
        ctx.arc(85, 85, 24, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const sampleFile = new File(
          [blob],
          type === "tumor"
            ? "sample_mri_anomaly.png"
            : type === "normal"
            ? "sample_mri_normal.png"
            : "sample_photo.png",
          { type: "image/png" }
        );
        handleFileChange(sampleFile);
      }
    }, "image/png");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_badge}>
        <FaBrain className={styles.header_icon} />
        <span>MRI Neural Diagnostics</span>
      </div>

      <h1 className={styles.heading}>Brain Scan Analysis</h1>
      <p className={styles.instructions}>
        Upload or drag a brain MRI image scan to run real-time client-side machine learning diagnostic classification.
      </p>

      {/* Dropzone Container */}
      <div
        className={`${styles.input_area} ${isDragging ? styles.is_dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name="file_upload"
          id="file_upload"
          accept="image/*"
          onChange={handleFileInput}
        />

        {preview ? (
          <div className={styles.preview_wrapper}>
            <img
              className={styles.preview_img}
              src={preview}
              alt="Uploaded MRI Preview"
            />
            <span className={styles.change_file_text}>Click or drop new file to replace</span>
          </div>
        ) : (
          <>
            <div className={styles.icon_circle}>
              <FaCloudUploadAlt />
            </div>
            <span className={styles.drop_title}>Drop your MRI scan here</span>
            <span className={styles.drop_subtitle}>or click to browse files (PNG, JPG, JPEG)</span>
          </>
        )}
      </div>

      {/* Preset Samples Selector */}
      <div className={styles.presets_section}>
        <div className={styles.presets_title}>
          <BsLightningChargeFill style={{ color: "var(--m3-warning)" }} />
          <span>Quick Test with Sample Scans</span>
        </div>
        <div className={styles.preset_chips_row}>
          <button
            className={styles.preset_chip}
            onClick={() => handleSelectPreset("tumor")}
            type="button"
          >
            <FaBrain style={{ color: "var(--m3-primary)" }} />
            <span>Sample Scan (Anomaly)</span>
          </button>
          <button
            className={styles.preset_chip}
            onClick={() => handleSelectPreset("normal")}
            type="button"
          >
            <FaBrain style={{ color: "var(--m3-success)" }} />
            <span>Sample Scan (Normal)</span>
          </button>
          <button
            className={styles.preset_chip}
            onClick={() => handleSelectPreset("invalid")}
            type="button"
          >
            <FaRegFileImage style={{ color: "var(--m3-outline)" }} />
            <span>Non-MRI File</span>
          </button>
        </div>
      </div>

      {/* Action Button */}
      <button
        className={styles.submit_button}
        onClick={() => file && onClick(file)}
        disabled={!file}
        type="button"
      >
        <BsStars size={18} />
        <span>Analyze MRI Scan</span>
        <FaArrowRight size={16} />
      </button>

      {/* Security Footer */}
      <div className={styles.footer}>
        <IoMdLock size={15} />
        <span>100% Private On-Device AI — Medical imagery never leaves your browser.</span>
      </div>
    </div>
  );
};

export default UploadMri;
