import { useState, useEffect, useRef } from 'react';

// Type definition for the return value of the hook
interface UseOutsideClickReturn {
  ref: React.RefObject<HTMLAnchorElement>;
  isActive: boolean;
  handleClickInside: () => void;
}

function useOutsideClick(): UseOutsideClickReturn {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useRef<HTMLAnchorElement | null>(null);
  // To allow the on outside click event to work
  const activeRef = useRef(false);

  useEffect(() => {
    // The click event listens for action buttons within the component
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.closest('.trigger-clickaway')) {
          setIsActive(false);
      }
    };

    // The mousedown event listens for clicks outside of the component
    const handleMouseDownOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsActive(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('mousedown', handleMouseDownOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('mousedown', handleMouseDownOutside);
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