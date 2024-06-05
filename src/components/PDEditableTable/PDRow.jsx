const PDRow = (props) => {
  const { children } = props;

  return <tr {...props}>{children}</tr>;
};
export default PDRow;
