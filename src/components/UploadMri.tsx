import { useState, type ChangeEvent, type DragEvent } from "react";
import styles from "./css/UploadMri.module.css";
import { FaCloudUploadAlt, FaArrowRight, FaBrain, FaLock } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

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

  return (
    <div className={styles.workstation_card}>
      {/* Header */}
      <div className={styles.card_header}>
        <div className={styles.header_title_group}>
          <div className={styles.header_icon_circle}>
            <FaBrain />
          </div>
          <div>
            <h1 className={styles.title}>MRI Diagnostic Acquisition</h1>
            <p className={styles.subtitle}>
              Load brain MRI DICOM/Image scan into local TensorFlow.js neural tensor memory
            </p>
          </div>
        </div>
        <div className={styles.spec_badge}>
          <span>TENSOR: 224x224x3</span>
        </div>
      </div>

      {/* DICOM Dropzone Viewport */}
      <div
        className={`${styles.dicom_viewport} ${isDragging ? styles.is_dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.corner_reticle_tl}></div>
        <div className={styles.corner_reticle_tr}></div>
        <div className={styles.corner_reticle_bl}></div>
        <div className={styles.corner_reticle_br}></div>

        <input
          type="file"
          name="file_upload"
          id="file_upload"
          accept="image/*"
          onChange={handleFileInput}
        />

        {preview ? (
          <div className={styles.preview_container}>
            <img
              className={styles.preview_frame}
              src={preview}
              alt="Acquired Brain MRI Scan"
            />
            <span className={styles.replace_chip}>Click or drag new scan to replace</span>
          </div>
        ) : (
          <>
            <div className={styles.upload_icon_box}>
              <FaCloudUploadAlt />
            </div>
            <span className={styles.prompt_main}>Import Patient MRI Scan</span>
            <span className={styles.prompt_sub}>Drag and drop DICOM / PNG / JPG file or browse local drive</span>
          </>
        )}
      </div>

      {/* Action Bar */}
      <div className={styles.action_bar}>
        <button
          className={styles.analyze_btn}
          onClick={() => file && onClick(file)}
          disabled={!file}
          type="button"
        >
          <BsStars size={18} />
          <span>Execute Neural Classification</span>
          <FaArrowRight size={15} />
        </button>

        <div className={styles.compliance_footer}>
          <FaLock style={{ color: "var(--m3-success)" }} />
          <span>Private Local Inference — Zero Cloud Data Retention</span>
        </div>
      </div>
    </div>
  );
};

export default UploadMri;
