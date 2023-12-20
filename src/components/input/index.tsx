import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  label?: string;
}

export function Input({
  name,
  placeholder,
  type,
  register,
  rules,
  label,
  error
}: InputProps) {

  return (
    <section className={`${label && "mb-3"} w-full `}>
      <label htmlFor={name} className="mb-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
        className={`w-full border-2 rounded-md h-14 px-3 outline-none ${error && " border-red-600"} `} />
      {error && <p className="text-red-500">{error}</p>}
    </section>
  )
}