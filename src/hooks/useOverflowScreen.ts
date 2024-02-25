import { useRef, useState, useEffect } from "react";

export const useOverflowScreen = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      setIsOverflow(bottom > window.innerHeight);
    }
  }, []);

  return { isOverflow, ref };
};
