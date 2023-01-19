import { useInfiniteQuery } from "@tanstack/react-query";

import { Company } from "../types";

import data from "./companies.json";

export function useCompanies() {
  return useInfiniteQuery(
    ["companyData"],
    ({ pageParam = 1 }) => {
      // Fetch 10 per page
      const start = (pageParam - 1) * 10;
      const end = start + 10;

      return Promise.resolve((data as Company[]).slice(start, end));
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length + 1;
      },
    }
  );
}
