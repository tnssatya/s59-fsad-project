import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900",
  secondary:
    "bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-900",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 focus:ring-offset-slate-900",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 focus:ring-slate-500 focus:ring-offset-slate-900",
  accent:
    "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const iconSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

function Button({
  children,
  onClick,
  type = "button",
  disabled,
  className,
  variant = "primary",
  size = "md",
  iconLeft: IconLeft,
  iconRight: IconRight,
  ...props
}) {
  const iconClassName = cn("shrink-0", iconSizes[size] || iconSizes.md);

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {IconLeft && <IconLeft className={iconClassName} />}
      <span className="leading-none">{children}</span>
      {IconRight && <IconRight className={iconClassName} />}
    </button>
  );
}

export default Button;
