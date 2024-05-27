const PDSelect = ({
  options,
  label,
  className,
  onChangeFunc,
  defaultValue,
  value,
  required = false,
  disabled = false,
}) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <select
        disabled={disabled}
        required={required}
        defaultValue={defaultValue}
        onChangeFunc={onChangeFunc}
        value={value}
      >
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
