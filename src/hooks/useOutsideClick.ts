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
    // Disable if click is outside
    function triggerOutsideClick() {
      if (activeRef.current && onClose) {
        activeRef.current = false;
        onClose();
      }
      setIsActive(false);
    }

    // The mouse click doesn't have to be released to close the component if clicked outside
    const handleMouseDownOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        triggerOutsideClick();
      }
    };

    // If a descendant os 
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if ((ref.current && !ref.current.contains(event.target as Node))
        || (target && target.classList.contains('trigger-clickaway'))) {
        triggerOutsideClick();
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleMouseDownOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside);
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