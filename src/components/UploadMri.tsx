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
      <div className={styles.header_row}>
        <h2 className={styles.acquisition_title}>Import Brain MRI Scan</h2>
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
              alt="Scan"
            />
            <span className={styles.change_text}>Click or drop file to replace</span>
          </div>
        ) : (
          <>
            <FiUploadCloud className={styles.drop_icon} />
            <span className={styles.drop_title}>Drop brain MRI scan here</span>
            <span className={styles.drop_subtitle}>PNG, JPG, JPEG</span>
          </>
        )}
      </div>

      <div className={styles.action_bar}>
        <span className={styles.privacy_note}>🔒 100% Client-Side</span>
        <button
          className={styles.submit_btn}
          onClick={() => file && onClick(file)}
          disabled={!file}
          type="button"
        >
          Run Analysis →
        </button>
      </div>
    </div>
  );
};

export default UploadMri;
