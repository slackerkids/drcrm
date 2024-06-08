
type InputType = {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

function Input({type, value, onChange, placeholder}: InputType) {
  return (
    <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-md font-manrope p-2 m-2 shadow-sm border border-slate-200 outline-none focus:border-slate-600"
    />
  )
}

export default Input