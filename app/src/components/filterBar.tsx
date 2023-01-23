import { Checkbox, Grid } from "@chakra-ui/react";
import { MultiValue, Select, SingleValue } from "chakra-react-select";

const EMPLOYEES_FILTER_OPTIONS = [
  { value: { minEmployeeCount: 0, maxEmployeeCount: 10 }, label: "0-10" },
  { value: { minEmployeeCount: 11, maxEmployeeCount: 50 }, label: "11-50" },
  { value: { minEmployeeCount: 51, maxEmployeeCount: 100 }, label: "51-100" },
  { value: { minEmployeeCount: 101, maxEmployeeCount: 500 }, label: "101-500" },
  { value: { minEmployeeCount: 501, maxEmployeeCount: 1000 }, label: "501-1000" },
  { value: { minEmployeeCount: 1001, maxEmployeeCount: undefined }, label: "1001+" },
];

interface FilterBarProps {
  industries: string[] | undefined;
  filteredIndustries: string[];
  onChangeIndustries: (
    selected: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
  regions: string[] | undefined;
  filteredRegions: string[];
  onChangeRegions: (
    selected: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
  onChangeFilteredEmployeeCount: (
    selected: SingleValue<
      | {
          value: {
            minEmployeeCount: number;
            maxEmployeeCount: number;
          };
          label: string;
        }
      | {
          value: {
            minEmployeeCount: number;
            maxEmployeeCount: undefined;
          };
          label: string;
        }
    >
  ) => void;
  onlyFavorites: boolean;
  onChangeOnlyFavorites: (checked: boolean) => void;
}

const FilterBar = ({
  industries,
  regions,
  filteredIndustries,
  filteredRegions,
  onChangeIndustries,
  onChangeRegions,
  onChangeFilteredEmployeeCount,
  onlyFavorites,
  onChangeOnlyFavorites,
}: FilterBarProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4} paddingLeft={4}>
      <Select
        options={industries?.map((i) => {
          return { value: i, label: i };
        })}
        isMulti
        placeholder="Filter by industry"
        onChange={(selected) => onChangeIndustries(selected)}
        value={filteredIndustries.map((i) => {
          return { value: i, label: i };
        })}
        colorScheme="purple"
        focusBorderColor="purple.500"
      />
      <Select
        options={regions?.map((i) => {
          return { value: i, label: i };
        })}
        isMulti
        placeholder="Filter by region"
        onChange={(selected) => onChangeRegions(selected)}
        value={filteredRegions.map((i) => {
          return { value: i, label: i };
        })}
        colorScheme="purple"
        focusBorderColor="purple.500"
      />
      <Select
        options={EMPLOYEES_FILTER_OPTIONS}
        placeholder="Filter by employee count"
        onChange={(selected) => onChangeFilteredEmployeeCount(selected)}
        colorScheme="purple"
        focusBorderColor="purple.500"
      />
      <Checkbox
        colorScheme="purple"
        isChecked={onlyFavorites}
        onChange={(e) => onChangeOnlyFavorites(e.target.checked)}
      >
        Show only favorites
      </Checkbox>
    </Grid>
  );
};

export default FilterBar;
