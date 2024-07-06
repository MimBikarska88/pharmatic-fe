import React, { forwardRef } from "react";
import styles from "./PDFileInput.module.css";
const PDFileInput = forwardRef(
  (
    {
      label,
      value,
      className,
      onChangeFunc,
      errorMessage,
      id,
      accept,
      multiple = false,
      isDisabled = false,
      isValid = true,
      isReadOnly = false,
      required = false,
      styles,
    },
    fileRef
  ) => {
    return (
      <div className={`${className}`} style={styles}>
        <label htmlFor={label}>
          <span className="text" style={{ color: "black" }}>
            {label}
          </span>
          {required && <span>*</span>}
        </label>
        <input
          ref={fileRef} // Attach the forwarded ref here
          readOnly={isReadOnly}
          onChange={onChangeFunc}
          id={id}
          type="file"
          accept={accept}
          disabled={isDisabled}
          required={required}
          value={value}
          multiple={multiple}
          className={isValid ? styles["valid"] : styles["invalid"]}
        />
        <span>
          <small>{errorMessage}</small>
        </span>
      </div>
    );
  }
);
export default PDFileInput;
