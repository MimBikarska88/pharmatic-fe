const PDTableFooter = (props) => {
  const { children } = props;
  return <tfoot {...props}>{children}</tfoot>;
};
export default PDTableFooter;
