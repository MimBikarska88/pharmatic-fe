import PDHeadCell from "./PDHeadCell";
import PDRow from "./PDRow";
import PDTableFooter from "./PDTableFooter";
import PDTableHeader from "./PDTableHeader";
import PDCell from "./PDCell";
import PDTableBody from "./PDTableBody";

const PDTable = (props) => {
  const { children } = props;
  return <table {...props}>{children}</table>;
};
PDTable.Header = PDTableHeader;
PDTable.Footer = PDTableFooter;
PDTable.Row = PDRow;
PDTable.Cell = PDCell;
PDTable.HeaderCell = PDHeadCell;
PDTable.Body = PDTableBody;
export default PDTable;
