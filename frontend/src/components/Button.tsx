import React from "react";

/**
 * Type alias for button component, type & className optional. 
 */
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};


/** 
 * Reusable button component. Type of button by default "button".
 */ 
function Button({
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 px-4 bg-slate-900 rounded-full hover:bg-slate-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
