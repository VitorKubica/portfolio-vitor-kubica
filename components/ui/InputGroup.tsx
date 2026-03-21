"use client";

import { useState } from "react";

type InputGroupProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  minLength?: number;
};

export default function InputGroup({
  id,
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  textarea = false,
  minLength,
}: InputGroupProps) {
  const [focused, setFocused] = useState(false);

  const inputCls = `w-full border-0 border-b border-current py-2 bg-transparent text-current text-base leading-normal font-light outline-none placeholder:transition-colors placeholder:duration-100 ${
    focused ? "placeholder:text-transparent" : "placeholder:text-deep-purple/40"
  }`;

  return (
    <div
      className={`input-group w-full flex flex-col relative transition-colors duration-200 ${
        focused ? "text-electric-blue" : "text-deep-purple/50"
      }`}
    >
      <label htmlFor={id} className="mb-1 text-sm font-light">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          minLength={minLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${inputCls} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={inputCls}
        />
      )}
    </div>
  );
}
