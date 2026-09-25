import { useState, type ChangeEvent, type DragEvent } from "react";
import styles from "./css/UploadMri.module.css";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

interface UploadMriProps {
  onAnalyze: (file: File) => void;
  isModelReady: boolean;
}

const UploadMri = ({ onAnalyze, isModelReady }: UploadMriProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
  };

  return (
    <div className={styles.upload_container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Upload Brain MRI</h2>
        <p className={styles.subtitle}>Select or drop an MRI scan to detect and classify tumors</p>
      </div>

      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${preview ? styles.has_preview : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !preview && document.getElementById("file_upload")?.click()}
      >
        <input
          type="file"
          id="file_upload"
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: "none" }}
        />

        {preview ? (
          <div className={styles.preview_wrapper}>
            <img src={preview} alt="MRI preview" className={styles.preview_image} />
            <div className={styles.preview_info}>
              <div className={styles.file_details}>
                <FiFile className={styles.file_icon} />
                <span className={styles.file_name}>{file?.name}</span>
                <span className={styles.file_size}>
                  {file ? (file.size / 1024).toFixed(1) + " KB" : ""}
                </span>
              </div>
              <button
                type="button"
                className={styles.remove_btn}
                onClick={handleRemove}
                title="Remove image"
              >
                <FiX />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.empty_state}>
            <div className={styles.icon_circle}>
              <FiUploadCloud className={styles.upload_icon} />
            </div>
            <p className={styles.prompt_primary}>
              <span className={styles.browse_text}>Click to browse</span> or drag & drop
            </p>
            <p className={styles.prompt_secondary}>Supports PNG, JPG, or JPEG</p>
          </div>
        )}
      </div>

      <div className={styles.action_row}>
        <button
          type="button"
          className={styles.analyze_button}
          onClick={() => file && onAnalyze(file)}
          disabled={!file || !isModelReady}
        >
          {!isModelReady ? "Loading Model..." : "Analyze Scan"}
        </button>
      </div>
    </div>
  );
};

export default UploadMri;
