import { useState } from "react";

export const usePagination = (entries, entriesPerPage) => {
  const [page, setPage] = useState(1);

  const pages = Math.max(Math.ceil(entries.length / entriesPerPage), 1);
  const entriesToSkip = (page - 1) * entriesPerPage;
  const entriesIncluded = entriesToSkip + entriesPerPage;
  const displayEntries = entries.slice(entriesToSkip, entriesIncluded);

  return {
    page,
    setPage,
    displayEntries,
    pages,
  };
};
