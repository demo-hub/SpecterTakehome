import { useQuery } from "@tanstack/react-query";

import { Company } from "../types";

import data from "./companies.json";

export function useIndustries() {
  return useQuery(["industries"], () => {
    return Promise.resolve(
      Array.from(
        new Set((data as Company[]).filter((c) => c.Industry).map((company) => company.Industry))
      )
    );
  });
}
