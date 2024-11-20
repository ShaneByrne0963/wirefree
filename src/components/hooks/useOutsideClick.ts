import { useState, useEffect, useRef } from 'react';

// Type definition for the return value of the hook
interface UseOutsideClickReturn {
  ref: React.RefObject<HTMLDivElement>;
  isActive: boolean;
  handleClickInside: () => void;
}

function useOutsideClick(initialState: boolean = false): UseOutsideClickReturn {
  const [isActive, setIsActive] = useState<boolean>(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if ((ref.current && !ref.current.contains(event.target as Node))
        || (target && target.classList.contains('trigger-clickaway'))) {
        // Disable if click is outside
        setIsActive(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Enables the element if clicked inside
  const handleClickInside = () => {
    setIsActive(true);
  };

  return { ref, isActive, handleClickInside };
}

export default useOutsideClick;