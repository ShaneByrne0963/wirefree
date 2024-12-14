import { useRef } from "react";

function ProjectLoader() {
  const loaderRef = useRef<HTMLInputElement | null>(null);

  function handleInput() {
    if (!loaderRef.current) return;
    const files = loaderRef.current.files;
    if (!files) return;

    // Read the data from the input
    const reader = new FileReader();
    reader.readAsText(files[0], "UTF-8");
    reader.onload = (event) => {
      if (!event.target) return;
      console.log(event.target.result);
    };
  }

  return (
    <input
      type="file"
      id="project-loader"
      accept=".json"
      onChange={handleInput}
      ref={loaderRef}
    />
  );
}

export default ProjectLoader;
