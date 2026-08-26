import { useState, type ChangeEvent, type DragEvent } from "react";
import styles from "./css/UploadMri.module.css";
import { FaCloudUploadAlt, FaArrowRight, FaBrain } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
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

  return (
    <div className={styles.main_container}>
      <div className={styles.header_badge}>
        <FaBrain className={styles.header_icon} />
        <span>MRI Neural Diagnostics</span>
      </div>

      <h1 className={styles.heading}>Brain Scan Analysis</h1>
      <p className={styles.instructions}>
        Select or drag a brain MRI image scan to run real-time client-side machine learning diagnostic classification.
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
