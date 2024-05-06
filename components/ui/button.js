import Link from "next/link";

export default function Button({
  children,
  path,
  onClick,
  secondary,
  fullWidth,
  label,
  type,
  disabled
}) {
  // Dynamic tailwind classes based on the components props
  const dynamicStyles = {
    secondary: !secondary
      ? "border-slate-950 bg-slate-950 hover:bg-slate-900 text-slate-100"
      : "border-slate-100 bg-white hover:border-slate-200 text-slate-900",
    width: fullWidth && "w-full",
    label: label ? "py-2 flex-col" : "py-[0.3rem] gap-2",
  };
  const classes = `${dynamicStyles.secondary} ${dynamicStyles.width} ${dynamicStyles.label} px-3 font-medium border text-sm rounded-md active:scale-[0.98] ease-out duration-300 flex justify-center items-center`;

  // <span> element with styling that can be reused
  const buttonLabel = label && (
    <span className="text-xs text-slate-500 font-normal">{label}</span>
  );

  return (
    <>
      {path ? (
        <Link href={path} className={classes}>
          {buttonLabel}
          {children}
        </Link>
      ) : (
        <button onClick={onClick} type={type} disabled={disabled} className={classes}>
          {buttonLabel}
          {children}
        </button>
      )}
    </>
  );
}
