import { useQuery } from "@tanstack/react-query";

import { Company } from "../types";

import data from "./companies.json";

export function useCompanies() {
  return useQuery(["companyData"], () => Promise.resolve(data as Company[]));
}
