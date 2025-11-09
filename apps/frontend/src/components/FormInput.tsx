import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  helperText?: string;
  type?: string;
  showPasswordToggle?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ label, error, helperText, className, showPasswordToggle, type = "text", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input ref={ref} type={inputType} className={`w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${error ? "border-red-500" : ""} ${className}`} {...props} />
        {showPasswordToggle && type === "password" && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
    </div>
  );
});

FormInput.displayName = "FormInput";
