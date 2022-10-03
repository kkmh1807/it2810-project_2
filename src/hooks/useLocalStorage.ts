import { useState } from 'react';

export default function useLocalStorage(key: string, defaultValue = '') {
  // Get the inital value from localStorage if it exists, else use the provided value
  const initalValue = localStorage.getItem(key) || defaultValue;

  // Store the value in a state
  const [value, setValue] = useState(initalValue);

  // A custom stetter function that stores the value to both localStorage and state
  const updateValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  // We explicitly type the array to make it behave like useState
  const array: [string, (val: string) => void] = [value, updateValue];
  return array;
}
