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