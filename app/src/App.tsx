import { useCompanies } from "@api/companies";
import { useIndustries } from "@api/industries";
import { useRegions } from "@api/regions";
import {
  Box,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Input,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import CompanyCard from "@components/companyCard";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { Company } from "types";

const EMPLOYEES_FILTER_OPTIONS = [
  { value: { minEmployeeCount: 0, maxEmployeeCount: 10 }, label: "0-10" },
  { value: { minEmployeeCount: 11, maxEmployeeCount: 50 }, label: "11-50" },
  { value: { minEmployeeCount: 51, maxEmployeeCount: 100 }, label: "51-100" },
  { value: { minEmployeeCount: 101, maxEmployeeCount: 500 }, label: "101-500" },
  { value: { minEmployeeCount: 501, maxEmployeeCount: 1000 }, label: "501-1000" },
  { value: { minEmployeeCount: 1001, maxEmployeeCount: undefined }, label: "1001+" },
];

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [favoriteCompanies, setFavoriteCompanies] = useState<string[]>([]);
  const [filteredIndustries, setFilteredIndustries] = useState<string[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
  const [filteredEmployeeCount, setFilteredEmployeeCount] = useState<{
    minEmployeeCount: number | undefined;
    maxEmployeeCount: number | undefined;
  }>({ minEmployeeCount: undefined, maxEmployeeCount: undefined });
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCompanies({
      filters: {
        industries: filteredIndustries,
        regions: filteredRegions,
        minEmployeeCount: filteredEmployeeCount.minEmployeeCount,
        maxEmployeeCount: filteredEmployeeCount.maxEmployeeCount,
        favoriteCompanies: onlyFavorites ? favoriteCompanies : [],
      },
    });

  const { data: industries } = useIndustries();
  const { data: regions } = useRegions();

  // This is a custom hook that will fetch the next page of data when the user scrolls to the bottom of the page
  useEffect(() => {
    // Initialize favoriteCompanies from sessionStorage
    const favoriteCompanies = sessionStorage.getItem("favoriteCompanies");
    if (favoriteCompanies) {
      setFavoriteCompanies(JSON.parse(favoriteCompanies));
    }

    let fetching = false;

    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <Box paddingTop={4}>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} paddingLeft={4}>
        <Select
          options={industries?.map((i) => {
            return { value: i, label: i };
          })}
          isMulti
          placeholder="Filter by industry"
          onChange={(selected) => {
            if (selected) {
              setFilteredIndustries(selected.map((i) => i.value));
            } else {
              setFilteredIndustries([]);
            }
          }}
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
          onChange={(selected) => {
            if (selected) {
              setFilteredRegions(selected.map((i) => i.value));
            } else {
              setFilteredRegions([]);
            }
          }}
          value={filteredRegions.map((i) => {
            return { value: i, label: i };
          })}
          colorScheme="purple"
          focusBorderColor="purple.500"
        />
        <Select
          options={EMPLOYEES_FILTER_OPTIONS}
          placeholder="Filter by employee count"
          onChange={(selected) => {
            if (selected) {
              setFilteredEmployeeCount(selected.value);
            } else {
              setFilteredEmployeeCount({
                minEmployeeCount: undefined,
                maxEmployeeCount: undefined,
              });
            }
          }}
          colorScheme="purple"
          focusBorderColor="purple.500"
        />
        <Checkbox
          colorScheme="purple"
          isChecked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
        >
          Show only favorites
        </Checkbox>
      </Grid>
      {isLoading ? (
        <Spinner color="purple" />
      ) : (
        <SimpleGrid columns={{ base: 3, sm: 2, md: 3, lg: 4 }} gap={4} padding={4}>
          {!isLoading && isSuccess
            ? data?.pages.map((page) =>
                page.map((company) => (
                  <CompanyCard
                    key={company.Domain}
                    companyDomain={company.Domain}
                    hqLocation={company["HQ Location"]}
                    rank={company.Rank}
                    companyName={company["Company Name"]}
                    industry={company.Industry}
                    description={company.Description}
                    employeeCount={company["Employee Count"]}
                    employeeMonthlyGrowth={company["Employees - Monthly Growth"]}
                    linkedInFollowers={company["LinkedIn - Followers"]}
                    linkedInMonthlyGrowth={company["LinkedIn - Monthly Followers Growth"]}
                    webVisits={company["Web Visits"]}
                    webVisitsMonthlyGrowth={company["Web Visits - Monthly Growth"]}
                    linkedinUrl={company["LinkedIn - URL"]}
                    twitterUrl={company["Twitter - URL"]}
                    instagramUrl={company["Instagram - URL"]}
                    iTunesUrl={company["iTunes - URL"]}
                    googlePlayUrl={company["Google Play - URL"]}
                    onDetailsClick={() => {
                      onOpen();
                      setSelectedCompany(company);
                    }}
                    favorite={favoriteCompanies.includes(company.Domain)}
                    onCompanyFavorite={(companyDomain) => {
                      if (favoriteCompanies.includes(companyDomain)) {
                        setFavoriteCompanies(
                          favoriteCompanies.filter((domain) => domain !== companyDomain)
                        );
                        sessionStorage.setItem(
                          "favoriteCompanies",
                          JSON.stringify(
                            favoriteCompanies.filter((domain) => domain !== companyDomain)
                          )
                        );
                      } else {
                        setFavoriteCompanies([...favoriteCompanies, companyDomain]);
                        sessionStorage.setItem(
                          "favoriteCompanies",
                          JSON.stringify([...favoriteCompanies, companyDomain])
                        );
                      }
                    }}
                    onIndustryClick={(industry) => {
                      // Add the industry to the filter
                      setFilteredIndustries([...filteredIndustries, industry]);
                    }}
                  />
                ))
              )
            : undefined}
          {isFetchingNextPage ? <Spinner color="purple" /> : undefined}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{selectedCompany?.["Company Name"]}</DrawerHeader>

              <DrawerBody>
                <Input placeholder="Type here..." />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </SimpleGrid>
      )}
    </Box>
  );
}

export default App;
