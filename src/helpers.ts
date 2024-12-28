import html2canvas from "html2canvas";

/**
 * Downloads a file onto the user's computer
 * Source: https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
 * @param filename The name of the file to be saved
 * @param text The contents in that file
 */
export function downloadTextFile(filename: string, text: string) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function downloadImageFile(filename: string, canvas: HTMLCanvasElement) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * Saves a project to the user's computer
 * @param data All the saved data of the project
 */
export function saveProject(data: {[key: string]: any}) {
  const name = data.name;
  delete data.name;
  downloadTextFile(name + ".json", JSON.stringify(data));
}

export function exportPage() {
  let canvasElement = document.querySelector("#canvas-render") as HTMLElement;
  if (!canvasElement) return;

  const pageName = canvasElement.getAttribute("data-page")?.toLowerCase() || "page";
  const screen = canvasElement.getAttribute("data-screensize")?.toLowerCase() || "screen";

  // Render the canvas
  const config = {
    backgroundColor: "#ffffff",
    foreignObjectRendering: false
  }
  html2canvas(canvasElement, config).then((render) => {
    downloadImageFile(`${pageName}-${screen}.jpeg`, render);
  });
}

/**
 * Converts a display name to be used as a class, removing any capital letters and spaces
 * @param value The value to be converted
 * @returns The converted value
 */
export function convertDisplayToClassName(value: string) {
  return value.replace(" ", "-").toLowerCase();
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
};

function componentToHex(c: number) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function convertRgbToHex(value: string) {
  let rgb = value.replace("rgb(", "").replace(")", "").split(", ");
  return rgb.reduce((prev: string, value: string) => `${prev}${componentToHex(parseInt(value))}`, "#");
}

/**
 * Extracts the number value from a style property
 * @param style The value of the style
 * @returns The value in int format
 */
export function getNumberFromStyle(style: string) {
  const units = ["px", "%", "vw", "vh", "em", "rem"];
  return parseInt(units.reduce((prev: string, unit: string) => prev.replace(unit, ""), style));
}

export function getShapeColor(element: HTMLElement) {
  const defaultColor = "rgb(255, 255, 255)";
  // First check if the element is a shape
  const shapeElement = element.querySelector(".shape") as HTMLElement;
  if (shapeElement) {
    return shapeElement.style.backgroundColor || defaultColor;
  }

  // If not a shape, check if its a text component
  if (element.classList.contains("canvas-text")) {
    return element.style.color || defaultColor;
  }

  // If not, it should be an icon
  const iconElement = element.querySelector("path");
  if (iconElement) {
    return iconElement.getAttribute("fill") || defaultColor;
  }

  // Return white if nothing was found (Shouldn't happen)
  return defaultColor;
}

export function getShapeData(id: string) {
  const foundElement = document.getElementById(id);

  if (foundElement) {
    return {
      index: parseInt(foundElement.getAttribute("data-index") || "0"),
      layer: foundElement.getAttribute("data-layer") || "",
      left: getNumberFromStyle(foundElement.style.left) || 0,
      top: getNumberFromStyle(foundElement.style.top) || 0,
      width: getNumberFromStyle(foundElement.style.width) || 0,
      height: getNumberFromStyle(foundElement.style.height) || 0,
      color: getShapeColor(foundElement)
    }
  }
  return null;
}