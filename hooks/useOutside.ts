import { useEffect, useRef, useState } from "react";

export const useOutside = (initialIsVisible: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(initialIsVisible);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { ref, isShow, setIsShow };
};