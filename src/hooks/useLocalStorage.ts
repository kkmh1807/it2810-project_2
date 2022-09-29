import { useState } from 'react';

export default function useLocalStorage(key: string, defaultValue = '') {
  const initalValue = localStorage.getItem(key) || defaultValue;

  const [value, setValue] = useState(initalValue);

  const updateValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  const array: [string, (val: string) => void] = [value, updateValue];
  return array;
}
