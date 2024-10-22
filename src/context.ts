import { createContext } from "react";

// Default Screen Sizes
export const defaultScreenSizes = [
  { name: "iPhone", width: 1170, height: 2532 },
  { name: "Desktop", width: 1920, height: 1080 },
  { name: "Tablet", width: 1200, height: 800 },
  { name: "Mobile", width: 768, height: 1024 },
];

export const ThemeContext = createContext('red');