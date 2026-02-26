import { FiCheck, FiX } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import { THEME_COLORS } from "../../utils/theme";
import Button from "../ui/Button";

const colorOrder = [
  "blue",
  "orange",
  "green",
  "purple",
  "gray",
  "pink",
  "teal",
];

function ThemeSettings({ isOpen, onClose }) {
  const { mode, setMode, primaryColor, setPrimaryColor, resetTheme } =
    useTheme();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/40" onClick={onClose} />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 border-l border-slate-200 bg-white p-5 shadow-panel transition-transform dark:border-slate-700 dark:bg-slate-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Theme Settings</h3>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={FiX}
            className="!p-1"
            onClick={onClose}
            aria-label="Close theme settings"
          />
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <p className="text-sm font-semibold">Mode</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={mode === "light" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setMode("light")}
              >
                Light
              </Button>
              <Button
                variant={mode === "dark" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setMode("dark")}
              >
                Dark
              </Button>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-sm font-semibold">Choose Theme Color</p>
            <div className="grid grid-cols-7 gap-2">
              {colorOrder.map((colorKey) => {
                const color = THEME_COLORS[colorKey];
                const isActive = primaryColor === colorKey;

                return (
                  <button
                    key={colorKey}
                    type="button"
                    onClick={() => setPrimaryColor(colorKey)}
                    className={`relative h-8 w-8 cursor-pointer rounded-md border-2 transition ${
                      isActive
                        ? "border-slate-900 dark:border-slate-100"
                        : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Set ${colorKey} theme color`}
                    title={colorKey}
                  >
                    {isActive ? (
                      <FiCheck className="mx-auto text-xs text-white drop-shadow" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={resetTheme}
            >
              Reset to default
            </Button>
          </section>
        </div>
      </aside>
    </>
  );
}

export default ThemeSettings;
