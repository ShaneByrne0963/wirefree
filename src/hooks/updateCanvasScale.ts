import { useEffect, useRef } from "react";
import { ScreenSize } from "../state/slices/screenSizeSlice";

function updateCanvasScale(screenSize: ScreenSize) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // A reference to the old resize observer, allowing it to be removed in the next render
  const resizeRef = useRef<(() => void) | null>(null);

  // Renew the event listener with the new screen size values
  useEffect(() => {
    function handleScale() {
      const canvasContainer = document.getElementById("canvas-container");
      if (canvasContainer && canvasRef.current) {
        const containerStyles = window.getComputedStyle(canvasContainer);
        const containerPadding = parseInt(containerStyles.getPropertyValue("padding").replace("px", "")) * 2;
        const containerRect = canvasContainer.getBoundingClientRect();
        const [containerWidth, containerHeight] = [containerRect.width - containerPadding, containerRect.height - containerPadding];

        const scale = Math.min(containerWidth / screenSize.width, containerHeight / screenSize.height);
        const ratio = screenSize.width / screenSize.height;
        const canvasCss = `scale: ${scale}; --aspect-ratio: ${ratio}; width: ${screenSize.width}px; height: ${screenSize.height}px`;
        canvasRef.current.setAttribute("style", canvasCss);
      }
    }
    if (resizeRef.current !== null) {
      window.removeEventListener("resize", resizeRef.current);
    }
    window.addEventListener("resize", handleScale);
    resizeRef.current = handleScale;
    handleScale();

    return () => window.removeEventListener("resize", handleScale);
  }, [screenSize]);

  return canvasRef;
}

export default updateCanvasScale;