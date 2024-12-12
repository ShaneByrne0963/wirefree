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
  // First check if the element is a shape
  const shapeElement = element.querySelector(".shape") as HTMLElement;
  if (shapeElement) {
    return shapeElement.style.backgroundColor;
  }

  // If not, it should be an icon
  const iconElement = element.querySelector("path");
  if (iconElement) {
    return iconElement.getAttribute("fill");
  }

  // Return white if nothing was found (Shouldn't happen)
  return "rgb(255, 255, 255)";
}

export function getShapeData(id: string) {
  const foundElement = document.getElementById(id);

  if (foundElement) {
    return {
      index: foundElement.getAttribute("data-index") || 0,
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