import styles from "./PDInput.module.css";
const PDInput = ({
  type,
  label,
  inputContent,
  maxLength,
  className,
  onChangeFunc,
  errorMessage,
  isDisabled = false,
  isValid = true,
  isReadOnly = false,
  required = false,
}) => {
  return (
    <>
      <div className={`${className}`} style={styles}>
        <label for={label}>
          <span className="text"></span>
          {label}
          {required && <span>*</span>}
        </label>
        <input
          readOnly={isReadOnly}
          onChange={onChangeFunc}
          id={label}
          type={type ? type : "text"}
          maxLength={maxLength}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          required={required}
          value={inputContent}
          className={isValid ? styles["valid"] : styles["invalid"]}
        ></input>
        <span className="py-2">
          <small>{errorMessage}</small>
        </span>
      </div>
    </>
  );
};
export default PDInput;
