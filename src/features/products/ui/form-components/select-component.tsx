import React from "react";
import { FieldError } from "react-hook-form";


interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: FieldError,
}

export interface SelectOption {
  id: string;
  value: string;
}

export const SelectComponent = React.forwardRef<HTMLSelectElement, FormSelectProps>((
  { label, options, error, className = "", id, ...rest }, ref) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        {...rest}
        className={`w-full px-4 py-2 border
           border-gray-200 rounded-xl 
           focus:outline-none 
           focus:border-indigo-500 text-sm bg-white ${error ? "border-red-500 bg-red-50/50"
            : "border-gray-200 focus:border-indigo-500"}`}
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">
          {error.message}
        </p>
      )}
    </div>
  )
})