import styles from "./PDInput.module.css";
const PDInput = ({
  type,
  label,
  value,
  maxLength,
  className,
  onChangeFunc,
  errorMessage,
  id,
  placeholder,
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
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          required={required}
          value={value}
          className={isValid ? styles["valid"] : styles["invalid"]}
        ></input>
        <span>
          <small>{errorMessage}</small>
        </span>
      </div>
    </>
  );
};
export default PDInput;
