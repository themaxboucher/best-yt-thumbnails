export default function InputLabel({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-950">
      {children}
    </label>
  );
}
