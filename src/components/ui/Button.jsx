const variants = {
  primary: "bg-primary hover:bg-primary-dark text-black font-semibold",
  secondary: "bg-dark-lighter hover:bg-dark-border text-white border border-dark-border",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-black",
  danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30",
  ghost: "text-gray-400 hover:text-white hover:bg-dark-lighter",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
  xl: "px-10 py-4 text-lg",
};

export default function Button({
  children, variant = "primary", size = "md",
  className = "", loading = false, disabled = false, ...props
}) {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]}
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 cursor-pointer ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}