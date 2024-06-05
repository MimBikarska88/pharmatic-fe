const PDCell = (props) => {
  const { children } = props;
  return <td {...props}>{children}</td>;
};
export default PDCell;
