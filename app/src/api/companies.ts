import { useInfiniteQuery } from "@tanstack/react-query";

import { Company, Filters } from "../types";

import data from "./companies.json";

const ITEMS_PER_PAGE = 100;

export function useCompanies({ filters }: { filters: Filters }) {
  return useInfiniteQuery(
    ["companyData", filters],
    ({ pageParam = 1 }) => {
      const start = (pageParam - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      const filteredData = (data as Company[]).filter((company) => {
        if (filters.industries.length > 0 && !filters.industries.includes(company.Industry)) {
          return false;
        }

        if (filters.regions.length > 0 && !filters.regions.includes(company["HQ Region"])) {
          return false;
        }

        return true;
      });

      return Promise.resolve(filteredData.slice(start, end));
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length + 1;
      },
    }
  );
}
