import { createContext } from "react";

// Default Screen Sizes
export const defaultScreenSizes = [
  { name: "Desktop", width: 1920, height: 1080 },
  { name: "Tablet", width: 1200, height: 800 },
  { name: "Mobile", width: 768, height: 1024 },
  { name: "iPhone", width: 1170, height: 2532 },
];

export type Axis = "x" | "y";

export const ThemeContext = createContext('red');