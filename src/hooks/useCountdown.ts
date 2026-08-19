import { useState, useEffect, useCallback, useRef } from "react";

interface UseCountdownOptions {
  autoStart?: boolean;
  onComplete?: () => void;
}

export function useCountdown(
  initialSeconds: number,
  options: UseCountdownOptions = {}
) {
  const { autoStart = false, onComplete } = options;

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);

  // Keep callback reference updated without restarting effects
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Sync if initialSeconds prop changes from parent
  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onCompleteRef.current) onCompleteRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    if (timeLeft > 0) setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => setIsRunning(false), []);
  const toggle = useCallback(() => {
    if (timeLeft > 0) setIsRunning((prev) => !prev);
  }, [timeLeft]);

  // Reset to initial or a new custom number of seconds
  const reset = useCallback(
    (newSeconds?: number) => {
      setIsRunning(false);
      setTimeLeft(newSeconds !== undefined ? newSeconds : initialSeconds);
    },
    [initialSeconds]
  );

  // Formats time into "MM:SS" or "HH:MM:SS"
  const formattedTime = (() => {
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");

    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  })();

  return {
    timeLeft,        // Raw seconds remaining (number)
    formattedTime,   // Ready-to-render string ("01:30")
    isRunning,       // Boolean status
    isCompleted: timeLeft === 0, // Quick boolean check
    start,           // Start / resume countdown
    pause,           // Pause countdown
    toggle,          // Toggle play/pause
    reset,           // Reset countdown
  };
}