interface toggleThemeInterface {
  updateTheme: (theme: string) => void;
  curTheme: string;
}
function ToggleTheme({ updateTheme, curTheme }: toggleThemeInterface) {
  return (
    <button
      className="theme-toggle"
      onClick={() => updateTheme(curTheme === "dark" ? "light" : "dark")}
    >
      {curTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default ToggleTheme;
