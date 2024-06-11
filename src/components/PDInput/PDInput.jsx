import styles from "./PDInput.module.css";
const PDInput = (props) => {
  const {
    label,
    value,
    className,
    onChangeFunc,
    errorMessage,
    placeholder,
    required,
    isValid = true,
    ...rest
  } = props;
  return (
    <>
      <div className={`${className}`} style={styles}>
        <label htmlFor={label}>
          <span className="text"></span>
          {label}
          {required && <span>*</span>}
        </label>
        <input
          onChange={onChangeFunc}
          placeholder={placeholder}
          value={value}
          {...rest}
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
