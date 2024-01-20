import { useEffect, useState } from "react";

type ResizeCallback = () => void;

function useWindowResize(callback: ResizeCallback) {
  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      callback();
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]); // Include the callback function in the dependency array
}

export default useWindowResize;
