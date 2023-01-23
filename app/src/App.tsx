import { useCompanies } from "@api/companies";
import { useIndustries } from "@api/industries";
import { useRegions } from "@api/regions";
import {
  Box,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CompanyCard from "@components/companyCard";
import FilterBar from "@components/filterBar";
import formatNumber from "@utils/formatNumber";
import { useEffect, useState } from "react";
import { Company } from "types";

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
      <FilterBar
        industries={industries}
        regions={regions}
        filteredIndustries={filteredIndustries}
        filteredRegions={filteredRegions}
        onlyFavorites={onlyFavorites}
        onChangeFilteredEmployeeCount={(selected) => {
          if (selected) {
            setFilteredEmployeeCount(selected.value);
          } else {
            setFilteredEmployeeCount({
              minEmployeeCount: undefined,
              maxEmployeeCount: undefined,
            });
          }
        }}
        onChangeIndustries={(selected) => {
          if (selected) {
            setFilteredIndustries(selected.map((i) => i.value));
          } else {
            setFilteredIndustries([]);
          }
        }}
        onChangeRegions={(selected) => {
          if (selected) {
            setFilteredRegions(selected.map((i) => i.value));
          } else {
            setFilteredRegions([]);
          }
        }}
        onChangeOnlyFavorites={(value) => setOnlyFavorites(value)}
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
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                #{selectedCompany?.Rank} {selectedCompany?.["Company Name"]}
                <Tag ml="1" fontSize="0.8em" colorScheme="purple">
                  {selectedCompany?.Industry}
                </Tag>
              </DrawerHeader>

              <DrawerBody>
                <Tabs colorScheme="purple">
                  <TabList>
                    <Tab>General Info</Tab>
                    <Tab>Growth</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Stack spacing="2">
                        <Text fontSize="lg" as="b">
                          Summary
                        </Text>
                        <Text>{selectedCompany?.Description}</Text>
                        <Text>
                          Founded by {selectedCompany?.Founders} in{" "}
                          {selectedCompany?.["Founded Date"]}
                        </Text>
                      </Stack>
                      <Stack spacing="2" mt="8">
                        <Text fontSize="lg" as="b">
                          Funding
                        </Text>
                        <Flex>
                          <Card>
                            <CardBody>
                              <Stat>
                                <StatLabel>Total Funding</StatLabel>
                                <StatNumber>
                                  {formatNumber(
                                    selectedCompany?.["Total Funding Amount (in USD)"] ?? 0
                                  ) ?? "-"}
                                  $
                                </StatNumber>
                                <StatHelpText>
                                  {selectedCompany?.["Last Funding Type"]}
                                </StatHelpText>
                              </Stat>
                            </CardBody>
                          </Card>
                          <Card ml="4">
                            <CardBody>
                              <Stat>
                                <StatLabel>Last Funding</StatLabel>
                                <StatNumber>
                                  {formatNumber(
                                    selectedCompany?.["Last Funding Amount (in USD)"] ?? 0
                                  ) ?? "-"}
                                  $
                                </StatNumber>
                                <StatHelpText>
                                  {selectedCompany?.["Last Funding Date"]}
                                </StatHelpText>
                              </Stat>
                            </CardBody>
                          </Card>
                          <Card ml="4">
                            <CardBody>
                              <Stat>
                                <StatLabel>Investors</StatLabel>
                                <StatNumber>{selectedCompany?.["Number of Investors"]}</StatNumber>
                                <StatHelpText>
                                  On {selectedCompany?.["Number of Funding Rounds"]} rounds
                                </StatHelpText>
                              </Stat>
                            </CardBody>
                          </Card>
                        </Flex>
                      </Stack>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </SimpleGrid>
      )}
    </Box>
  );
}

export default App;
