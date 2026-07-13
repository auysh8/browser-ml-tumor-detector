import { useState, type ChangeEvent } from "react";
import styles from "./css/UploadMri.module.css";
import { FaCloudUploadAlt, FaArrowRight } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";

interface UploadMriProps {
  onClick: (file: File) => void;
}

const UploadMri = ({ onClick }: UploadMriProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_icon}>
        <FaCloudUploadAlt />
      </div>
      <h1 className={styles.heading}>Upload MRI Scans</h1>
      <p className={styles.instructions}>
        Drag and drop your MRI scans to continue
      </p>

      <div className={`${styles.input_area} ${preview ? styles.has_preview : ""}`}>
        <input
          type="file"
          name="file_upload"
          id="file_upload"
          accept="image/*"
          onChange={handleFile}
        />
        {preview ? (
          <label htmlFor="file_upload" style={{ width: "100%", cursor: "pointer" }}>
            <img
              className={styles.preview}
              src={preview}
              alt="MRI Scan"
              height="200px"
            />
          </label>
        ) : (
          <label htmlFor="file_upload">
            <div className={styles.icon_circle}>
              <FaCloudUploadAlt />
            </div>
            <span className={styles.drop_title}>Drop files to analyze</span>
            <span className={styles.drop_subtitle}>or click to browse</span>
          </label>
        )}
      </div>

      <button
        className={styles.submit_button}
        onClick={() => file && onClick(file)}
        disabled={!file}
        style={{
          opacity: file ? 1 : 0.5,
          cursor: file ? "pointer" : "not-allowed",
        }}
      >
        <BsStars size={18} style={{ transform: "rotate(90deg)" }} />
        <span>Analyze Scans</span>
        <FaArrowRight size={16} />
      </button>

      <div className={styles.footer}>
        <IoMdLock size={14} />
        <span>Data is encrypted end-to-end and processed locally.</span>
      </div>
    </div>
  );
};

export default UploadMri;
