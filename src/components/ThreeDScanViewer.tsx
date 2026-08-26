import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDScanViewerProps {
  imageSrc: string;
  isInverted?: boolean;
}

const ThreeDScanViewer = ({ imageSrc, isInverted = false }: ThreeDScanViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = 320;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background for medical contrast

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -120, 180);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(50, 100, 150);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 1.5, 300);
    pointLight.position.set(0, 0, 80);
    scene.add(pointLight);

    // 3. Texture Loader & Mesh Creation
    let mesh: THREE.Mesh | null = null;
    let animationFrameId: number;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Create high density plane geometry for 3D depth displacement
      const geometry = new THREE.PlaneGeometry(160, 160, 128, 128);

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        displacementMap: texture,
        displacementScale: isInverted ? -28 : 28,
        roughness: 0.4,
        metalness: 0.1,
        wireframe: false,
        side: THREE.DoubleSide,
      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 4;
      scene.add(mesh);

      // Render Loop & Auto Rotation
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (mesh) {
          mesh.rotation.z += 0.005;
        }
        renderer.render(scene, camera);
      };

      animate();
    });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [imageSrc, isInverted]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "320px",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        background: "#050505",
      }}
    />
  );
};

export default ThreeDScanViewer;
