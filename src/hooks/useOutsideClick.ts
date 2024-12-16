import { useState, useEffect, useRef } from 'react';

// Type definition for the return value of the hook
interface UseOutsideClickReturn {
  ref: React.RefObject<HTMLAnchorElement>;
  isActive: boolean;
  handleClickInside: () => void;
}

function useOutsideClick(onClose?: () => void): UseOutsideClickReturn {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useRef<HTMLAnchorElement | null>(null);
  // To allow the on outside click event to work
  const activeRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if ((ref.current && !ref.current.contains(event.target as Node))
        || (target && target.classList.contains('trigger-clickaway'))) {
        // Disable if click is outside
        if (activeRef.current && onClose) {
          activeRef.current = false;
          onClose();
        }
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
    activeRef.current = true;
  };

  return { ref, isActive, handleClickInside };
}

export default useOutsideClick;