import clsx from "clsx";
import React from "react";

import styles from "./Textarea.module.css";

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required = false,
  className,
  disabled = false,
  rows = 3,
}: TextareaProps) {
  return (
    <div
      className={clsx(
        styles.textareaContainer,
        { [styles.required]: required },
        className
      )}
    >
      <label className={styles.label}>{label}</label>
      <div className={styles.textareaWrapper}>
        <div className={styles.textareaField}>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={styles.textarea}
          />
        </div>
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
    </div>
  );
}
