import styles from "./PDButton.module.css";
const PDButton = ({ classname, disabled, onClick, color, value, style }) => {
  return (
    <button
      disabled={disabled}
      style={style}
      className={`${styles["pd-button"]} ${classname} ${styles[`${color}`]}`}
      onClick={onClick}
      value={value}
    >
      {value}
    </button>
  );
};
export default PDButton;
