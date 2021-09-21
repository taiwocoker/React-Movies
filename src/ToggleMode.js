import { useLayoutEffect } from "react";

import useLocalStorage from "./useLocalStorage";

function ToggleMode() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  useLayoutEffect(() => {
    if (isDarkMode) document.querySelector("html").classList.add("dark");
    else document.querySelector("html").classList.remove("dark");
  }, [isDarkMode]);

  const toggle = () => {
    setIsDarkMode((_isDarkMode) => !_isDarkMode);
  };

  return (
    <div className="text-white">
      {isDarkMode ? (
        <button onClick={toggle} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2" />
            <path d="M12 21v2" />
            <path d="M4.22 4.22l1.42 1.42" />
            <path d="M18.36 18.36l1.42 1.42" />
            <path d="M1 12h2" />
            <path d="M21 12h2" />
            <path d="M4.22 19.78l1.42-1.42" />
            <path d="M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      ) : (
        <button onClick={toggle} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default ToggleMode;
