const PDTableHeader = (props) => {
  const { className } = props;
  return <thead className={className}>{props.children}</thead>;
};
export default PDTableHeader;
