import PasswordInput from "./password-input";

export default function Input({
  type,
  name,
  placeholder,
  required,
  onChange,
  id,
  invalid,
  tabIndex,
}) {
  return (
    <>
      {type === "password" ? (
        <PasswordInput placeholder={placeholder} />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          tabIndex={tabIndex}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`text-sm text-slate-700 w-full rounded-lg outline-1 ${
            !invalid
              ? "outline-slate-200 bg-slate-100"
              : "outline-none outline-0 border-2 border-red-400 bg-red-50"
          } px-3 py-1.5 transition-all`}
        />
      )}
    </>
  );
}
