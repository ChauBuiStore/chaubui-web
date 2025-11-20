import { useState } from "react";
import { useSearchParams } from "@/lib/hooks";

export function useSearchPage(initialSearch: string) {
  const { filters, setFilter } = useSearchParams();
  const [inputValue, setInputValue] = useState(
    (filters.search as string) || initialSearch || ""
  );

  const handleSearch = () => {
    if (!inputValue || !inputValue.trim()) {
      setFilter({ search: undefined, page: undefined, limit: undefined });
      return;
    }
    setFilter({ search: inputValue.trim() });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return {
    inputValue,
    handleSearch,
    handleInputChange,
    handleKeyDown,
  };
}

