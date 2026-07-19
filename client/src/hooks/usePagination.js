import { useCallback, useMemo, useState } from "react";

export function usePagination(items, pageSize = 8) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const goToPage = useCallback((next) => {
    setPage(Math.min(Math.max(1, next), totalPages));
  }, [totalPages]);

  function resetPage() {
    setPage(1);
  }

  return {
    page: safePage,
    totalPages,
    paged,
    goToPage,
    resetPage,
    totalItems: items.length,
    pageSize,
    showingFrom: items.length === 0 ? 0 : (safePage - 1) * pageSize + 1,
    showingTo: Math.min(safePage * pageSize, items.length),
  };
}
