import clsx from "clsx";
import React from "react";

import styles from "./Input.module.css";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "date" | "password";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  required = false,
  className,
  disabled = false,
}: InputProps) {
  return (
    <div
      className={clsx(
        styles.inputContainer,
        { [styles.required]: required },
        className
      )}
    >
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <div className={styles.inputField}>
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={styles.input}
          />
        </div>
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
    </div>
  );
}
