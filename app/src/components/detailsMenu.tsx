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
import { Company } from "types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCompany: Company | null;
}

const DeatilsMenu = ({ isOpen, onClose, selectedCompany }: Props) => {
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
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DeatilsMenu;
