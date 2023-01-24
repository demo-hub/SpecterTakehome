import {
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
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
} from "@chakra-ui/react";
import formatNumber from "@utils/formatNumber";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Company } from "types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCompany: Company | null;
}

// miliseconds in a month
const MONTH = 1000 * 60 * 60 * 24 * 30;

const DeatilsMenu = ({ isOpen, onClose, selectedCompany }: Props) => {
  const employeeCountData = useMemo(
    () => [
      {
        month: new Date(new Date().getTime() - MONTH * 6).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": Math.round(
          (selectedCompany?.["Employee Count"] ?? 0) /
            (1 + (selectedCompany?.["Employees - 6 Months Growth"] ?? 0) / 100)
        ),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 5).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": Math.round(
          (selectedCompany?.["Employee Count"] ?? 0) /
            (1 + (selectedCompany?.["Employees - 5 Months Growth"] ?? 0) / 100)
        ),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 4).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": Math.round(
          (selectedCompany?.["Employee Count"] ?? 0) /
            (1 + (selectedCompany?.["Employees - 4 Months Growth"] ?? 0) / 100)
        ),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 3).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": Math.round(
          (selectedCompany?.["Employee Count"] ?? 0) /
            (1 + (selectedCompany?.["Employees - 3 Months Growth"] ?? 0) / 100)
        ),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 2).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": Math.round(
          (selectedCompany?.["Employee Count"] ?? 0) /
            (1 + (selectedCompany?.["Employees - 2 Months Growth"] ?? 0) / 100)
        ),
      },
      {
        month: new Date(new Date().getTime() - MONTH).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": Math.round(
          (selectedCompany?.["Employee Count"] ?? 0) /
            (1 + (selectedCompany?.["Employees - Monthly Growth"] ?? 0) / 100)
        ),
      },
      {
        month: new Date().toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        "Employee Count": selectedCompany?.["Employee Count"],
      },
    ],
    [selectedCompany]
  );

  const followersData = useMemo(
    () => [
      {
        month: new Date(new Date().getTime() - MONTH * 6).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn:
          (selectedCompany?.["LinkedIn - Followers"] ?? 0) -
          (selectedCompany?.["LinkedIn - 6 Months Followers Growth"] ?? 0),
        Twitter:
          (selectedCompany?.["Twitter - Followers"] ?? 0) -
          (selectedCompany?.["Twitter - 6 Months Followers Growth"] ?? 0),
        Instagram:
          (selectedCompany?.["Instagram - Followers"] ?? 0) -
          (selectedCompany?.["Instagram - 6 Months Followers Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 5).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn:
          (selectedCompany?.["LinkedIn - Followers"] ?? 0) -
          (selectedCompany?.["LinkedIn - 5 Months Followers Growth"] ?? 0),
        Twitter:
          (selectedCompany?.["Twitter - Followers"] ?? 0) -
          (selectedCompany?.["Twitter - 5 Months Followers Growth"] ?? 0),
        Instagram:
          (selectedCompany?.["Instagram - Followers"] ?? 0) -
          (selectedCompany?.["Instagram - 5 Months Followers Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 4).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn:
          (selectedCompany?.["LinkedIn - Followers"] ?? 0) -
          (selectedCompany?.["LinkedIn - 4 Months Followers Growth"] ?? 0),
        Twitter:
          (selectedCompany?.["Twitter - Followers"] ?? 0) -
          (selectedCompany?.["Twitter - 4 Months Followers Growth"] ?? 0),
        Instagram:
          (selectedCompany?.["Instagram - Followers"] ?? 0) -
          (selectedCompany?.["Instagram - 4 Months Followers Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 3).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn:
          (selectedCompany?.["LinkedIn - Followers"] ?? 0) -
          (selectedCompany?.["LinkedIn - 3 Months Followers Growth"] ?? 0),
        Twitter:
          (selectedCompany?.["Twitter - Followers"] ?? 0) -
          (selectedCompany?.["Twitter - 3 Months Followers Growth"] ?? 0),
        Instagram:
          (selectedCompany?.["Instagram - Followers"] ?? 0) -
          (selectedCompany?.["Instagram - 3 Months Followers Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 2).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn:
          (selectedCompany?.["LinkedIn - Followers"] ?? 0) -
          (selectedCompany?.["LinkedIn - 2 Months Followers Growth"] ?? 0),
        Twitter:
          (selectedCompany?.["Twitter - Followers"] ?? 0) -
          (selectedCompany?.["Twitter - 2 Months Followers Growth"] ?? 0),
        Instagram:
          (selectedCompany?.["Instagram - Followers"] ?? 0) -
          (selectedCompany?.["Instagram - 2 Months Followers Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn:
          (selectedCompany?.["LinkedIn - Followers"] ?? 0) -
          (selectedCompany?.["LinkedIn - Monthly Followers Growth"] ?? 0),
        Twitter:
          (selectedCompany?.["Twitter - Followers"] ?? 0) -
          (selectedCompany?.["Twitter - Monthly Followers Growth"] ?? 0),
        Instagram:
          (selectedCompany?.["Instagram - Followers"] ?? 0) -
          (selectedCompany?.["Instagram - Monthly Followers Growth"] ?? 0),
      },
      {
        month: new Date().toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        LinkedIn: selectedCompany?.["LinkedIn - Followers"],
        Twitter: selectedCompany?.["Twitter - Followers"],
        Instagram: selectedCompany?.["Instagram - Followers"],
      },
    ],
    [selectedCompany]
  );

  const reviewsData = useMemo(
    () => [
      {
        month: new Date(new Date().getTime() - MONTH * 6).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes:
          (selectedCompany?.["iTunes - Reviews"] ?? 0) -
          (selectedCompany?.["iTunes - 6 Months Reviews Growth"] ?? 0),
        "Google Play":
          (selectedCompany?.["Google Play - Reviews"] ?? 0) -
          (selectedCompany?.["Google Play - 6 Months Reviews Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 5).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes:
          (selectedCompany?.["iTunes - Reviews"] ?? 0) -
          (selectedCompany?.["iTunes - 5 Months Reviews Growth"] ?? 0),
        "Google Play":
          (selectedCompany?.["Google Play - Reviews"] ?? 0) -
          (selectedCompany?.["Google Play - 5 Months Reviews Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 4).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes:
          (selectedCompany?.["iTunes - Reviews"] ?? 0) -
          (selectedCompany?.["iTunes - 4 Months Reviews Growth"] ?? 0),
        "Google Play":
          (selectedCompany?.["Google Play - Reviews"] ?? 0) -
          (selectedCompany?.["Google Play - 4 Months Reviews Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 3).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes:
          (selectedCompany?.["iTunes - Reviews"] ?? 0) -
          (selectedCompany?.["iTunes - 3 Months Reviews Growth"] ?? 0),
        "Google Play":
          (selectedCompany?.["Google Play - Reviews"] ?? 0) -
          (selectedCompany?.["Google Play - 3 Months Reviews Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH * 2).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes:
          (selectedCompany?.["iTunes - Reviews"] ?? 0) -
          (selectedCompany?.["iTunes - 2 Months Reviews Growth"] ?? 0),
        "Google Play":
          (selectedCompany?.["Google Play - Reviews"] ?? 0) -
          (selectedCompany?.["Google Play - 2 Months Reviews Growth"] ?? 0),
      },
      {
        month: new Date(new Date().getTime() - MONTH).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes:
          (selectedCompany?.["iTunes - Reviews"] ?? 0) -
          (selectedCompany?.["iTunes - Monthly Reviews Growth"] ?? 0),
        "Google Play":
          (selectedCompany?.["Google Play - Reviews"] ?? 0) -
          (selectedCompany?.["Google Play - Monthly Reviews Growth"] ?? 0),
      },
      {
        month: new Date().toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        iTunes: selectedCompany?.["iTunes - Reviews"],
        "Google Play": selectedCompany?.["Google Play - Reviews"],
      },
    ],
    [selectedCompany]
  );

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          #{selectedCompany?.Rank} {selectedCompany?.["Company Name"]}
          <Tag ml="1" fontSize="0.8em" colorScheme="purple">
            {selectedCompany?.Industry}
          </Tag>
          <Text fontSize="xs" fontWeight="light">
            {selectedCompany?.["HQ Location"]}
          </Text>
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
                    Founded by {selectedCompany?.Founders} in {selectedCompany?.["Founded Date"]}
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
                          <StatHelpText>{selectedCompany?.["Last Funding Type"]}</StatHelpText>
                        </Stat>
                      </CardBody>
                    </Card>
                    <Card ml="4">
                      <CardBody>
                        <Stat>
                          <StatLabel>Last Funding</StatLabel>
                          <StatNumber>
                            {formatNumber(selectedCompany?.["Last Funding Amount (in USD)"] ?? 0) ??
                              "-"}
                            $
                          </StatNumber>
                          <StatHelpText>{selectedCompany?.["Last Funding Date"]}</StatHelpText>
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
                <Text fontSize="lg" as="b">
                  Employee Count
                </Text>
                <LineChart
                  width={700}
                  height={300}
                  data={employeeCountData}
                  margin={{
                    top: 30,
                    right: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Employee Count" stroke="#8884d8" />
                </LineChart>
                <Text fontSize="lg" as="b" mt="8">
                  Followers
                </Text>
                <BarChart
                  width={700}
                  height={300}
                  data={followersData}
                  margin={{
                    top: 30,
                    right: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="LinkedIn" fill="#0A66C2" />
                  <Bar dataKey="Twitter" fill="#1D9BF0" />
                  <Bar dataKey="Instagram" fill="#F56040" />
                </BarChart>
                <Text fontSize="lg" as="b" mt="8">
                  Reviews
                </Text>
                <BarChart
                  width={700}
                  height={300}
                  data={reviewsData}
                  margin={{
                    top: 30,
                    right: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="iTunes" fill="#F56040" />
                  <Bar dataKey="Google Play" fill="#4285F4" />
                </BarChart>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DeatilsMenu;
