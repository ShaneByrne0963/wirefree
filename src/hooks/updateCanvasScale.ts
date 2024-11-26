import { useEffect, useRef } from "react";
import { ScreenSize } from "../state/slices/screenSizeSlice";

function updateCanvasScale(screenSize: ScreenSize) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // A reference to the old resize observer, allowing it to be removed in the next render
  const scaleObserver = useRef<ResizeObserver | null>(null);

  // Renew the event listener with the new screen size values
  useEffect(() => {
    function handleScale() {
      if (canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const scale = screenSize.width > screenSize.height
            ? canvasRect.width / screenSize.width
            : canvasRect.height / screenSize.height;
        const ratio = screenSize.width / screenSize.height;
        const canvasCss = `--scale: ${scale}; --aspect-ratio: ${ratio};`;
        canvasRef.current.setAttribute("style", canvasCss);
      }
    }
    function addObserver() {
      if (canvasRef.current) {
        const resizeObserver = new ResizeObserver(handleScale);
        scaleObserver.current = resizeObserver;
        resizeObserver.observe(canvasRef.current);
      }
    }
    function unbindObserver() {
      if (scaleObserver.current) {
        scaleObserver.current.disconnect();
      }
    }
    unbindObserver();
    addObserver();
    handleScale();

    return unbindObserver;
  }, [screenSize]);

  return canvasRef;
}

export default updateCanvasScale;