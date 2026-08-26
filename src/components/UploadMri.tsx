import { useState, type ChangeEvent, type DragEvent } from "react";
import styles from "./css/UploadMri.module.css";
import { FiUploadCloud } from "react-icons/fi";

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
    <div className={styles.acquisition_card}>
      <div>
        <span className={styles.mono_tag}>'PRIMARY ACQUISITION'</span>
        <h2 className={styles.acquisition_title}>Import Patient MRI Scan</h2>
        <p className={styles.acquisition_sub}>
          Select or drag an axial brain MRI image scan to run client-side neural classification inside WebGL GPU sandbox.
        </p>
      </div>

      <div
        className={`${styles.dropzone_viewport} ${isDragging ? styles.is_dragging : ""}`}
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
          <div className={styles.preview_container}>
            <img
              className={styles.preview_img}
              src={preview}
              alt="Acquired Scan"
            />
            <span className={styles.change_text}>Click or drop file to replace scan</span>
          </div>
        ) : (
          <>
            <FiUploadCloud className={styles.drop_icon} />
            <span className={styles.drop_title}>Drop brain MRI scan file here</span>
            <span className={styles.drop_subtitle}>Accepts PNG, JPG, JPEG (224x224 Bilinear Resampled)</span>
          </>
        )}
      </div>

      <div className={styles.action_bar}>
        <span className={styles.privacy_note}>🔒 100% Client-Side Enclave — No Cloud Transfers</span>
        <button
          className={styles.submit_btn}
          onClick={() => file && onClick(file)}
          disabled={!file}
          type="button"
        >
          Execute Neural Analysis →
        </button>
      </div>
    </div>
  );
};

export default UploadMri;
