import { InfoIcon, PlusSquareIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  IconButton,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import formatNumber from "@utils/formatNumber";

import googlePlayLogo from "../assets/google-play.png";
import instagramLogo from "../assets/instagram.png";
import itunesLogo from "../assets/itunes.png";
import linkedinLogo from "../assets/linkedin.png";
import twitterLogo from "../assets/twitter.png";

type Props = {
  rank: number;
  companyName: string;
  companyDomain: string;
  hqLocation: string;
  industry: string;
  description: string;
  employeeCount: number;
  employeeMonthlyGrowth?: number;
  linkedInFollowers: number;
  linkedInMonthlyGrowth?: number;
  webVisits: number;
  webVisitsMonthlyGrowth?: number;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  iTunesUrl: string;
  googlePlayUrl: string;
  onDetailsClick: () => void;
  favorite: boolean;
  onCompanyFavorite: (companyDomain: string) => void;
  onIndustryClick: (industry: string) => void;
};

const CompanyCard = ({
  rank,
  companyName,
  companyDomain,
  hqLocation,
  industry,
  description,
  employeeCount,
  employeeMonthlyGrowth,
  linkedInFollowers,
  linkedInMonthlyGrowth,
  webVisits,
  webVisitsMonthlyGrowth,
  linkedinUrl,
  twitterUrl,
  instagramUrl,
  iTunesUrl,
  googlePlayUrl,
  onDetailsClick,
  favorite,
  onCompanyFavorite,
  onIndustryClick,
}: Props) => {
  return (
    <Card
      maxW="md"
      maxH="md"
      border={favorite ? "2px" : ""}
      borderColor={favorite ? "yellow.300" : "gray"}
    >
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md" display="flex">
            <Text isTruncated>
              #{rank} {companyName}
            </Text>
            <Tag
              ml="1"
              fontSize="0.8em"
              colorScheme="purple"
              onClick={() => onIndustryClick(industry)}
              cursor="pointer"
            >
              {industry}
            </Tag>
            <Tooltip label={favorite ? "Remove favorite" : "Mark as favorite"}>
              {favorite ? (
                <StarIcon
                  focusable
                  role="button"
                  marginRight={0}
                  marginLeft="auto"
                  color="yellow.300"
                  onClick={() => onCompanyFavorite(companyDomain)}
                />
              ) : (
                <PlusSquareIcon
                  focusable
                  role="button"
                  marginRight={0}
                  marginLeft="auto"
                  color="purple"
                  onClick={() => onCompanyFavorite(companyDomain)}
                />
              )}
            </Tooltip>
          </Heading>
          <Text fontSize="xs">{hqLocation}</Text>
          <Box height={170}>
            <Text noOfLines={[4, 5, 6]}>{description}</Text>
          </Box>
          <StatGroup>
            <Stat>
              <StatLabel>Employee Count</StatLabel>
              <StatNumber>{formatNumber(employeeCount) ?? "N/A"}</StatNumber>
              <Tooltip label="Monthly Growth">
                <StatHelpText>
                  <StatArrow
                    type={
                      employeeMonthlyGrowth && employeeMonthlyGrowth > 0 ? "increase" : "decrease"
                    }
                  />
                  {employeeMonthlyGrowth?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                  %
                </StatHelpText>
              </Tooltip>
            </Stat>

            <Stat>
              <StatLabel>LinkedIn Followers</StatLabel>
              <StatNumber>{formatNumber(linkedInFollowers) ?? "N/A"}</StatNumber>
              <Tooltip label="Monthly Growth">
                <StatHelpText>
                  <StatArrow
                    type={
                      linkedInMonthlyGrowth && linkedInMonthlyGrowth > 0 ? "increase" : "decrease"
                    }
                  />
                  {linkedInMonthlyGrowth?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                  %
                </StatHelpText>
              </Tooltip>
            </Stat>

            <Stat>
              <StatLabel>Web Visits</StatLabel>
              <StatNumber>{formatNumber(webVisits) ?? "N/A"}</StatNumber>
              <Tooltip label="Monthly Growth">
                <StatHelpText>
                  <StatArrow
                    type={
                      webVisitsMonthlyGrowth && webVisitsMonthlyGrowth > 0 ? "increase" : "decrease"
                    }
                  />
                  {webVisitsMonthlyGrowth?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                  %
                </StatHelpText>
              </Tooltip>
            </Stat>
          </StatGroup>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter padding={3}>
        <ButtonGroup spacing="0.3">
          {linkedinUrl ? (
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="LinkedIn"
              icon={<img src={linkedinLogo} alt="LinkedIn" width={15} height={15} />}
              borderRadius="50"
              onClick={() => window.open(linkedinUrl, "_blank")}
              size="sm"
            />
          ) : undefined}
          {twitterUrl ? (
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="Twitter"
              icon={<img src={twitterLogo} alt="Twitter" width={15} height={15} />}
              borderRadius="50"
              onClick={() => window.open(twitterUrl, "_blank")}
              size="sm"
            />
          ) : undefined}
          {instagramUrl ? (
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="Instagram"
              icon={<img src={instagramLogo} alt="Instagram" width={15} height={15} />}
              borderRadius="50"
              onClick={() => window.open(instagramUrl, "_blank")}
              size="sm"
            />
          ) : undefined}
          {googlePlayUrl ? (
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="Google Play"
              icon={<img src={googlePlayLogo} alt="Google Play" width={15} height={15} />}
              borderRadius="50"
              onClick={() => window.open(googlePlayUrl, "_blank")}
              size="sm"
            />
          ) : undefined}
          {iTunesUrl ? (
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="iTunes"
              icon={<img src={itunesLogo} alt="iTunes" width={15} height={15} />}
              borderRadius="50"
              onClick={() => window.open(iTunesUrl, "_blank")}
              size="sm"
            />
          ) : undefined}
        </ButtonGroup>
        <Tooltip label="Details">
          <IconButton
            variant="ghost"
            colorScheme="purple"
            aria-label="Website"
            icon={<InfoIcon />}
            borderRadius="50"
            onClick={onDetailsClick}
            size="sm"
            marginLeft="auto"
            marginRight={0}
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
