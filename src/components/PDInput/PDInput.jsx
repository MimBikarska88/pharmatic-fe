import styles from "./PDInput.module.css";
const PDInput = ({
  type,
  label,
  inputContent,
  maxLength,
  className,
  onChangeFunc,
  errorMessage,
  id,
  isDisabled = false,
  isValid = true,
  isReadOnly = false,
  required = false,
}) => {
  return (
    <>
      <div className={`${className} ${styles["input-field"]}`} style={styles}>
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
          maxLength={maxLength}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          required={required}
          value={inputContent}
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
