import { useEffect, useRef, useState } from "react";

interface ThreeDScanViewerProps {
  imageSrc: string;
  isInverted?: boolean;
}

const ThreeDScanViewer = ({ imageSrc, isInverted = false }: ThreeDScanViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0.4;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      setLoading(false);
      const GRID_SIZE = 44;
      const offscreen = document.createElement("canvas");
      offscreen.width = GRID_SIZE;
      offscreen.height = GRID_SIZE;
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);
      const imgData = offCtx.getImageData(0, 0, GRID_SIZE, GRID_SIZE).data;

      // Build height map matrix
      const heights: number[][] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        const row: number[] = [];
        for (let x = 0; x < GRID_SIZE; x++) {
          const idx = (y * GRID_SIZE + x) * 4;
          let b = (imgData[idx] + imgData[idx + 1] + imgData[idx + 2]) / 3;
          if (isInverted) b = 255 - b;
          row.push(b);
        }
        heights.push(row);
      }

      const render = () => {
        angle += 0.007;

        const rect = canvas.getBoundingClientRect();
        const width = (canvas.width = rect.width || 600);
        const height = (canvas.height = 320);

        ctx.fillStyle = "#05070a";
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2 + 15;

        const scale = Math.min(width, height) / (GRID_SIZE * 1.7);
        const tilt = 0.52;

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const projected: { px: number; py: number; z: number; normZ: number }[][] = [];
        const half = GRID_SIZE / 2;

        for (let y = 0; y < GRID_SIZE; y++) {
          const row = [];
          for (let x = 0; x < GRID_SIZE; x++) {
            const val = heights[y][x];
            const normZ = val / 255;
            const elevation = normZ * 38;

            const gx = x - half;
            const gy = y - half;

            const rx = gx * cosA - gy * sinA;
            const ry = gx * sinA + gy * cosA;

            const px = centerX + rx * scale * 1.25;
            const py = centerY + (ry * tilt - elevation) * scale * 0.85;

            row.push({ px, py, z: elevation, normZ });
          }
          projected.push(row);
        }

        ctx.lineWidth = 1;

        for (let y = 0; y < GRID_SIZE; y++) {
          for (let x = 0; x < GRID_SIZE; x++) {
            const curr = projected[y][x];

            if (curr.normZ > 0.6) {
              ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + curr.normZ * 0.45})`;
            } else if (curr.normZ > 0.3) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + curr.normZ * 0.4})`;
            } else {
              ctx.strokeStyle = `rgba(51, 65, 85, ${0.15 + curr.normZ * 0.2})`;
            }

            if (x < GRID_SIZE - 1) {
              const nextX = projected[y][x + 1];
              ctx.beginPath();
              ctx.moveTo(curr.px, curr.py);
              ctx.lineTo(nextX.px, nextX.py);
              ctx.stroke();
            }

            if (y < GRID_SIZE - 1) {
              const nextY = projected[y + 1][x];
              ctx.beginPath();
              ctx.moveTo(curr.px, curr.py);
              ctx.lineTo(nextY.px, nextY.py);
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [imageSrc, isInverted]);

  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        background: "#05070a",
        position: "relative",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-tertiary)",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          GENERATING 3D TOPOGRAPHY MESH...
        </div>
      )}
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
};

export default ThreeDScanViewer;
