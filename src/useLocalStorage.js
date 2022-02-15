import { useState, useEffect } from "react";

const storage = {
  getItem(key, initialValue) {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const unparsedValue = window.localStorage[key];
      if (typeof unparsedValue === "undefined") {
        return initialValue;
      }
      return JSON.parse(unparsedValue);
    } catch (error) {
      return initialValue;
    }
  },

  setItem(key, value) {
    window.localStorage[key] = JSON.stringify(value);
  },
};

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(storage.getItem(key, initialValue));
  }, [key]);

  const setItem = (newValue) => {
    setValue(newValue);
    storage.setItem(key, newValue);
  };

  return [value, setItem];
}