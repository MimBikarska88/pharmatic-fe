import styles from "./PDTextArea.module.css";
const PDTextArea = ({
  type,
  label,
  value,
  maxLength,
  className,
  onChangeFunc,
  errorMessage,
  rows,
  cols,
  id,
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
        <textarea
          readOnly={isReadOnly}
          onChange={onChangeFunc}
          id={id}
          type={type}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          disabled={isDisabled}
          isReadOnly={isReadOnly}
          required={required}
          value={value}
          className={isValid ? styles["valid"] : styles["invalid"]}
        ></textarea>
        <span>
          <small>{errorMessage}</small>
        </span>
      </div>
    </>
  );
};
export default PDTextArea;
