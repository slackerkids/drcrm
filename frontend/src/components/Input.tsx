import React from "react";

/**
 * Type alias for input, placeholder & className optional
 */
type InputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Reusable Input component
 */
function Input({ type, value, onChange, placeholder, className }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`py-2 px-4 border rounded-xl ${className}`}
    />
  );
}

export default Input;

// You can cover (event) to write a type for TS
{
  /* <input onChange={(e) =>}/> */
}
