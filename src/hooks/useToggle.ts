import { useState, useCallback } from 'react';

/**
 * initialValue is false by default
 */
export const useToggle = (initialValue = false): [boolean, (nextValue?: boolean) => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((nextValue?: boolean) => {
    if (typeof nextValue !== 'undefined') {
      return setValue(nextValue);
    }
    return setValue(v => !v)
  }, []);

  return [value, toggle];
}



export default useToggle;
