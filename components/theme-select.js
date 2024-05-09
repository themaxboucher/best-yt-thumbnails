import ThemeOption from "./theme-option";

export default function ThemeSelect() {
  return (
    <div className="p-4 flex gap-4">
      <ThemeOption setting="Light" />
      <ThemeOption setting="Dark" />
      <ThemeOption setting="System" />
    </div>
  );
}
