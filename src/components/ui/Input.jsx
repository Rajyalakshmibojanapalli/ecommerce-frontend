import { forwardRef } from "react";

const Input = forwardRef(({ label, error, icon: Icon, className = "", ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
      )}
      <input
        ref={ref}
        className={`w-full bg-dark-light border border-dark-border rounded-lg
          px-4 py-2.5 text-white placeholder-gray-500
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
          transition-all duration-200
          ${Icon ? "pl-11" : ""} 
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}
          ${className}`}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
));

Input.displayName = "Input";
export default Input;