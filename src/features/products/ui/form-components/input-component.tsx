
import React from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

export const InputComponent = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", id, ...rest }, ref) => {

    return <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={`w-full px-4 py-2 border border-gray-200 rounded-xl 
        focus:outline-none focus:border-indigo-500 text-sm 
            ${error ? "border-red-500 bg-red-50/50"
            : "border-gray-200 focus:border-indigo-500"}`}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">
          {error.message}
        </p>
      )}
    </div>
  })