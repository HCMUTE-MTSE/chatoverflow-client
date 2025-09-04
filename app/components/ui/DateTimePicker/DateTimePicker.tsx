import clsx from "clsx";
import React from "react";

import styles from "./DateTimePicker.module.css";

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "date" | "datetime-local" | "time";
}

export default function DateTimePicker({
  label,
  value,
  onChange,
  placeholder = "Chọn ngày",
  hint,
  required = false,
  className,
  disabled = false,
  type = "date",
}: DateTimePickerProps) {
  return (
    <div
      className={clsx(
        styles.dateTimeContainer,
        { [styles.required]: required },
        className
      )}
    >
      <label className={styles.label}>{label}</label>
      <div className={styles.dateTimeWrapper}>
        <div className={styles.dateTimeField}>
          {/* Calendar Icon */}
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>

          {/* Date Input */}
          <input
            type={type}
            value={value}
            onChange={(e) => {
              console.log(
                `DateTimePicker ${label} changed to:`,
                e.target.value
              );
              onChange(e.target.value);
            }}
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
