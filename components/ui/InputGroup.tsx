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

  const inputCls = `w-full border-0 border-b border-current py-3 bg-transparent text-accent text-base lg:text-lg leading-normal font-light outline-none rounded-none placeholder:transition-colors placeholder:duration-100 ${
    focused ? "placeholder:text-transparent" : "placeholder:text-accent/30"
  }`;

  return (
    <div
      className={`input-group w-full flex flex-col relative transition-colors duration-200 ${
        focused ? "text-primary" : "text-accent/40"
      }`}
    >
      <label htmlFor={id} className="mb-1 text-sm font-light text-accent/60">
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
