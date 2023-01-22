import { useCompanies } from "@api/companies";
import { useIndustries } from "@api/industries";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import CompanyCard from "@components/companyCard";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { Company } from "types";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [favoriteCompanies, setFavoriteCompanies] = useState<string[]>([]);
  const [filteredIndustries, setFilteredIndustries] = useState<string[]>([]);

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCompanies({ filters: { industries: filteredIndustries } });

  const { data: industries } = useIndustries();

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
      <Heading size="2xl" textAlign="center">
        Specter
      </Heading>
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
      />
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
                    websiteUrl={company.Website}
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
