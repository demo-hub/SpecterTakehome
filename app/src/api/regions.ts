import { useQuery } from "@tanstack/react-query";

import { Company } from "../types";

import data from "./companies.json";

export function useRegions() {
  return useQuery(["regions"], () => {
    return Promise.resolve(
      Array.from(
        new Set(
          (data as Company[])
            .filter((c) => c["HQ Region"])
            .map((company) => company["HQ Region"])
            .sort((a, b) => a.localeCompare(b))
        )
      )
    );
  });
}
