"use client";
import { formatPhoneNumber } from "@/shared/lib";
import { forwardRef, useState } from "react";

interface PhoneInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = "", onChange, error, className = "", ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(formatPhoneNumber(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      setDisplayValue(formattedValue);
      onChange?.(formattedValue);
    };

    return (
      <div className="w-full">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            010-
          </span>
          <input
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleChange}
            placeholder="1234-5678"
            className={`w-full pl-16 pr-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-[#AF794B]/50 focus:border-[#AF794B] ${
              error
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
