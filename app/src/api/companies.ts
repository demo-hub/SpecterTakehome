import { useInfiniteQuery } from "@tanstack/react-query";

import { Company } from "../types";

import data from "./companies.json";

const ITEMS_PER_PAGE = 12;

export function useCompanies() {
  return useInfiniteQuery(
    ["companyData"],
    ({ pageParam = 1 }) => {
      const start = (pageParam - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      return Promise.resolve((data as Company[]).slice(start, end));
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length + 1;
      },
    }
  );
}
