import styles from "./PDFileInput.module.css";
const PDFileInput = ({
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
}) => {
  return (
    <>
      <div className={`${className}`} style={styles}>
        <label htmlFor={label}>
          <span className="text"></span>
          {label}
          {required && <span>*</span>}
        </label>
        <input
          readOnly={isReadOnly}
          onChange={onChangeFunc}
          id={id}
          type="file"
          accept={accept}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          required={required}
          value={value}
          multiple={multiple}
          className={isValid ? styles["valid"] : styles["invalid"]}
        ></input>
        <span>
          <small>{errorMessage}</small>
        </span>
      </div>
    </>
  );
};
export default PDFileInput;
