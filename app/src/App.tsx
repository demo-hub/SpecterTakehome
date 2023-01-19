import { useCompanies } from "@api/companies";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
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
import { useEffect } from "react";

function App() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } = useCompanies();

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
    <div>
      {!isLoading && isSuccess
        ? data?.pages.map((page) =>
            page.map((company) => (
              <Card maxW="md" key={company.Domain}>
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">
                      #{company.Rank} {company["Company Name"]}{" "}
                      <Badge ml="1" fontSize="0.8em" colorScheme="purple">
                        {company.Industry}
                      </Badge>
                    </Heading>
                    <Text>{company.Description}</Text>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Employee Count</StatLabel>
                        <StatNumber>{company["Employee Count"]}</StatNumber>
                        <Tooltip label="Monthly Growth">
                          <StatHelpText>
                            <StatArrow
                              type={
                                company["Employees - Monthly Growth"] > 0 ? "increase" : "decrease"
                              }
                            />
                            {company["Employees - Monthly Growth"]}%
                          </StatHelpText>
                        </Tooltip>
                      </Stat>

                      <Stat>
                        <StatLabel>LinkedIn Followers</StatLabel>
                        <StatNumber>{company["LinkedIn - Followers"]}</StatNumber>
                        <Tooltip label="Monthly Growth">
                          <StatHelpText>
                            <StatArrow
                              type={
                                company["LinkedIn - Monthly Followers Growth"] > 0
                                  ? "increase"
                                  : "decrease"
                              }
                            />
                            {company["LinkedIn - Monthly Followers Growth"]}%
                          </StatHelpText>
                        </Tooltip>
                      </Stat>

                      <Stat>
                        <StatLabel>Web Visits</StatLabel>
                        <StatNumber>{company["Web Visits"]}</StatNumber>
                        <Tooltip label="Monthly Growth">
                          <StatHelpText>
                            <StatArrow
                              type={
                                company["Web Visits - Monthly Growth"] > 0 ? "increase" : "decrease"
                              }
                            />
                            {company["Web Visits - Monthly Growth"]}%
                          </StatHelpText>
                        </Tooltip>
                      </Stat>
                    </StatGroup>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Buy now
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))
          )
        : undefined}
    </div>
  );
}

export default App;
