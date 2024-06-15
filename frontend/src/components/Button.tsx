import React from "react";

type ButtonType = {
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode
    className?: string
}

function Button({type, onClick, children, className}: ButtonType) {
  return (
    <button type={type} onClick={onClick} className={`m-2 px-4 py-3 rounded-full text-white bg-slate-900 hover:bg-slate-800 font-manrope transition duration-300 ${className}`}>{children}</button>
  )
}

export default Button