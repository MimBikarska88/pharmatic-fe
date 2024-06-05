const PDHeadCell = (props) => {
  const { children } = props;
  return <th {...props}>{children}</th>;
};
export default PDHeadCell;
