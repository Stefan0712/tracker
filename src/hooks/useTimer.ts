import { useState, useEffect, useCallback } from "react";

export function useTimer(autoStart = true) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const toggle = useCallback(() => setIsRunning((prev) => !prev), []);
  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  // Formats seconds into "MM:SS" or "HH:MM:SS"
  const formattedTime = (() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");

    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  })();

  return {
    seconds,         // Raw number of seconds
    formattedTime,   // Ready-to-render string ("01:30")
    isRunning,       // Boolean status
    start,           // Call to start/resume
    pause,           // Call to pause
    toggle,          // Call to toggle play/pause
    reset,           // Call to reset timer back to 0
  };
}