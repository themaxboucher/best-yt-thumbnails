export default function Textarea({
  required,
  onChange,
  id,
  name,
  placeholder,
  invalid,
  rows,
}) {
  return (
    <textarea
      className={`text-sm text-slate-700 w-full rounded-lg outline-1 ${
        !invalid
          ? "outline-slate-200 bg-slate-100"
          : "outline-none outline-0 border-2 border-red-400 bg-red-50"
      } px-3 py-2 transition-all`}
      required={required}
      onChange={onChange}
      id={id}
      name={name}
      placeholder={placeholder}
      rows={rows}
    />
  );
}
