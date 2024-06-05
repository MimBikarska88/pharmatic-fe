const PDTableBody = (props) => {
  const { children, className } = props;

  return <tbody className={className}>{children}</tbody>;
};
export default PDTableBody;
