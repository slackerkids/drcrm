import React from "react";

/**
 * Type alias for Form component, className optional
 */
type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
};

/**
 * Reusable form component
 */
function Form({ onSubmit, children, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}

export default Form;
{
  /* <form onSubmit={(e)=>}></form> */
}
