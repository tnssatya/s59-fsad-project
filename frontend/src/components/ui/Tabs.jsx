import { cn } from "../../utils/cn";
import Button from "./Button";

export function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab}
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab(tab)}
          className={cn(
            "rounded-lg",
            activeTab === tab
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
          )}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
