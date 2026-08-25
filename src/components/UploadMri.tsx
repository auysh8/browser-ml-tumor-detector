import { useState, type ChangeEvent, useRef } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (file) {
      onClick(file);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.header_icon} aria-hidden="true">
        <FaCloudUploadAlt />
      </div>
      
      <h1 className={styles.heading}>Upload MRI Scans</h1>
      <p className={styles.instructions}>
        Drag and drop your MRI scans to continue
      </p>

      <div
        className={`${styles.input_area} ${preview ? styles.has_preview : ''} ${isDragging ? styles.dragging : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="File upload area"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="file_upload"
          id="file_upload"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.file_input}
          aria-label="Upload MRI scan file"
        />
        
        {preview ? (
          <button
            type="button"
            className={styles.preview_button}
            onClick={handleClick}
            aria-label="Click to change image"
          >
            <img
              className={styles.preview}
              src={preview}
              alt="MRI Scan preview"
            />
            <div className={styles.change_hint}>Click to change</div>
          </button>
        ) : (
          <button
            type="button"
            className={styles.upload_prompt}
            onClick={handleClick}
          >
            <div className={styles.icon_circle}>
              <FaCloudUploadAlt />
            </div>
            <span className={styles.drop_title}>Drop files to analyze</span>
            <span className={styles.drop_subtitle}>or click to browse</span>
          </button>
        )}
      </div>

      <button
        className={styles.submit_button}
        onClick={handleSubmit}
        disabled={!file}
        aria-label="Analyze the uploaded MRI scan"
      >
        <BsStars size={18} style={{ transform: "rotate(90deg)" }} aria-hidden="true" />
        <span>Analyze Scans</span>
        <FaArrowRight size={16} aria-hidden="true" />
      </button>

      <div className={styles.footer}>
        <IoMdLock size={14} aria-hidden="true" />
        <span>Data is encrypted end-to-end and processed locally.</span>
      </div>
    </div>
  );
};

export default UploadMri;
