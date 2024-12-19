import { useEffect, useRef } from 'react';

const useAutoResizeTextarea = (value) => {
  const textareaRefs = useRef([]);

  useEffect(() => {
    const resizeTextarea = (textarea) => {
      if (textarea) {
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
      }
    };

    if (Array.isArray(value)) {
      textareaRefs.current.forEach((textarea, index) => {
        resizeTextarea(textarea);
      });
    } else {
      resizeTextarea(textareaRefs.current[0]);
    }
  }, [value]);

  return textareaRefs;
};

export default useAutoResizeTextarea;
