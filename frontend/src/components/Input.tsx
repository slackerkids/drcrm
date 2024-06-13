type InputType = {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name?: string;
  className?: string;
  required?: boolean; 
};

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className = "", 
  required = false,
}: InputType) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-md font-manrope p-2 m-2 shadow-sm border border-slate-200 outline-none focus:border-slate-600 ${className}`}
      required={required}
    />
  );
}

export default Input;
