import { useEffect, useRef, useState } from "react";

export const useOutside = (initialIsVisible: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(initialIsVisible);
  const ref = useRef<any>(null);
  const ref2 = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !ref2.current?.contains(event.target)
    ) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  return { ref, ref2, isShow, setIsShow };
};
