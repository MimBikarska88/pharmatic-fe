import styles from "./PDButton.module.css";
const PDButton = ({ className, disabled, onClick, color, value, style }) => {
  return (
    <button
      disabled={disabled}
      style={style}
      className={`${styles["pd-button"]} ${className} ${styles[`${color}`]}`}
      onClick={onClick}
      value={value}
    >
      {value}
    </button>
  );
};
export default PDButton;
