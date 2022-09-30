import React from 'react';
import '../styles/InputField.css';

interface InputFieldProps {
  placeholder: string;
  regexPattern: string;
  setter: (val: string) => void;
}

const InputField = ({ placeholder, regexPattern, setter }: InputFieldProps) => {
  return (
    <input
      className="input-field"
      type="text"
      placeholder={placeholder}
      pattern={regexPattern}
      onChange={(e) => setter(e.target.value)}
      required
    />
  );
};

export default InputField;
