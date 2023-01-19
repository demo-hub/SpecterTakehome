import { useCompanies } from "@api/companies";
import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import formatNumber from "@utils/formatNumber";
import { useEffect } from "react";

import googlePlayLogo from "./assets/google-play.png";
import instagramLogo from "./assets/instagram.png";
import itunesLogo from "./assets/itunes.png";
import linkedinLogo from "./assets/linkedin.png";
import twitterLogo from "./assets/twitter.png";
import worldWideWebLogo from "./assets/world-wide-web.png";

function App() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCompanies();

  // This is a custom hook that will fetch the next page of data when the user scrolls to the bottom of the page
  useEffect(() => {
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
    <SimpleGrid columns={{ base: 3, sm: 2, md: 3, lg: 4 }} gap={5}>
      {!isLoading && isSuccess
        ? data?.pages.map((page) =>
            page.map((company) => (
              <Card maxW="md" maxH="md" key={company.Domain}>
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">
                      #{company.Rank} {company["Company Name"]}{" "}
                      <Badge ml="1" fontSize="0.8em" colorScheme="purple">
                        {company.Industry}
                      </Badge>
                    </Heading>
                    <Box height={170}>
                      <Text noOfLines={[4, 5, 6]}>{company.Description}</Text>
                    </Box>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Employee Count</StatLabel>
                        <StatNumber>{formatNumber(company["Employee Count"])}</StatNumber>
                        <Tooltip label="Monthly Growth">
                          <StatHelpText>
                            <StatArrow
                              type={
                                company["Employees - Monthly Growth"] > 0 ? "increase" : "decrease"
                              }
                            />
                            {company["Employees - Monthly Growth"].toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                            %
                          </StatHelpText>
                        </Tooltip>
                      </Stat>

                      <Stat>
                        <StatLabel>LinkedIn Followers</StatLabel>
                        <StatNumber>{formatNumber(company["LinkedIn - Followers"])}</StatNumber>
                        <Tooltip label="Monthly Growth">
                          <StatHelpText>
                            <StatArrow
                              type={
                                company["LinkedIn - Monthly Followers Growth"] > 0
                                  ? "increase"
                                  : "decrease"
                              }
                            />
                            {company["LinkedIn - Monthly Followers Growth"].toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}
                            %
                          </StatHelpText>
                        </Tooltip>
                      </Stat>

                      <Stat>
                        <StatLabel>Web Visits</StatLabel>
                        <StatNumber>{formatNumber(company["Web Visits"])}</StatNumber>
                        <Tooltip label="Monthly Growth">
                          <StatHelpText>
                            <StatArrow
                              type={
                                company["Web Visits - Monthly Growth"] > 0 ? "increase" : "decrease"
                              }
                            />
                            {company["Web Visits - Monthly Growth"].toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                            %
                          </StatHelpText>
                        </Tooltip>
                      </Stat>
                    </StatGroup>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter maxHeight="fit-content">
                  <ButtonGroup spacing="0.3">
                    <IconButton
                      variant="ghost"
                      colorScheme="purple"
                      aria-label="LinkedIn"
                      icon={<img src={linkedinLogo} alt="LinkedIn" width={15} height={15} />}
                      borderRadius="50"
                      onClick={() => window.open(company["LinkedIn - URL"], "_blank")}
                      size="sm"
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="purple"
                      aria-label="Twitter"
                      icon={<img src={twitterLogo} alt="Twitter" width={15} height={15} />}
                      borderRadius="50"
                      onClick={() => window.open(company["Twitter - URL"], "_blank")}
                      size="sm"
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="purple"
                      aria-label="Instagram"
                      icon={<img src={instagramLogo} alt="Instagram" width={15} height={15} />}
                      borderRadius="50"
                      onClick={() => window.open(company["Instagram - URL"], "_blank")}
                      size="sm"
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="purple"
                      aria-label="Google Play"
                      icon={<img src={googlePlayLogo} alt="Google Play" width={15} height={15} />}
                      borderRadius="50"
                      onClick={() => window.open(company["Google Play - URL"], "_blank")}
                      size="sm"
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="purple"
                      aria-label="iTunes"
                      icon={<img src={itunesLogo} alt="iTunes" width={15} height={15} />}
                      borderRadius="50"
                      onClick={() => window.open(company["iTunes - URL"], "_blank")}
                      size="sm"
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="purple"
                      aria-label="Website"
                      icon={<img src={worldWideWebLogo} alt="Website" width={15} height={15} />}
                      borderRadius="50"
                      onClick={() => window.open(company.Website, "_blank")}
                      size="sm"
                    />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))
          )
        : undefined}
      {isFetchingNextPage && <p>Loading...</p>}
    </SimpleGrid>
  );
}

export default App;
