import styles from "./PDSelect.module.css";
import Select from "react-select";

const PDSelect = (props) => {
  const {
    options = [],
    label,
    selectedOption,
    className,
    onChange,
    required,
    disabled,
    isValid = true,
    ...rest
  } = props;

  return (
    <div className={className}>
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      <Select
        {...rest}
        value={options.find((option) => option.value === selectedOption.value)}
        isDisabled={disabled}
        onChange={onChange}
        styles={{
          control: (baseStyles, state) => {
            const isFocused = state.isFocused;
            let borderColor = "#B0AFAFF1"; // Default border color
            let outlineColor = "transparent"; // Default outline color

            if (!isValid) {
              borderColor = "#ba2e2e";
              outlineColor = "#efa3a3";
            } else if (isFocused) {
              borderColor = "#74ab5d";
              outlineColor = "#b7f29e";
            }

            return {
              ...baseStyles,
              borderRadius: "7px",
              transition: "0.1s",
              border: `2px solid ${borderColor}`,
              outline: `7px solid ${outlineColor}`,
            };
          },
          option: (baseStyles, { isFocused, isSelected }) => ({
            ...baseStyles,
            backgroundColor: isSelected
              ? "#74ab5d"
              : isFocused
              ? "#b7f29e"
              : "#b7f29e",
            color: isSelected || isFocused ? "#fff" : "#000",
          }),
        }}
        options={options}
      />
    </div>
  );
};

export default PDSelect;
