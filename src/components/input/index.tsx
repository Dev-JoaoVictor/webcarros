import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  name,
  placeholder,
  type,
  register,
  rules,
  error
}: InputProps) {

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
        className={`w-full border-2 rounded-md h-14 px-3 outline-none ${error && "border-red-600"} `} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}