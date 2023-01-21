import { InfoOutlineIcon } from "@chakra-ui/icons";
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

import googlePlayLogo from "../assets/google-play.png";
import instagramLogo from "../assets/instagram.png";
import itunesLogo from "../assets/itunes.png";
import linkedinLogo from "../assets/linkedin.png";
import twitterLogo from "../assets/twitter.png";
import worldWideWebLogo from "../assets/world-wide-web.png";

type Props = {
  rank: number;
  companyName: string;
  industry: string;
  description: string;
  employeeCount: number;
  employeeMonthlyGrowth: number;
  linkedInFollowers: number;
  linkedInMonthlyGrowth: number;
  webVisits: number;
  webVisitsMonthlyGrowth: number;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  iTunesUrl: string;
  googlePlayUrl: string;
  websiteUrl: string;
  onDetailsClick: () => void;
};

const CompanyCard = ({
  rank,
  companyName,
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
  websiteUrl,
  onDetailsClick,
}: Props) => {
  return (
    <Card maxW="md" maxH="md">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">
            #{rank} {companyName}{" "}
            <Badge ml="1" fontSize="0.8em" colorScheme="purple">
              {industry}
            </Badge>
          </Heading>
          <Box height={170}>
            <Text noOfLines={[4, 5, 6]}>{description}</Text>
          </Box>
          <StatGroup>
            <Stat>
              <StatLabel>Employee Count</StatLabel>
              <StatNumber>{formatNumber(employeeCount)}</StatNumber>
              <Tooltip label="Monthly Growth">
                <StatHelpText>
                  <StatArrow type={employeeMonthlyGrowth > 0 ? "increase" : "decrease"} />
                  {employeeMonthlyGrowth.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </StatHelpText>
              </Tooltip>
            </Stat>

            <Stat>
              <StatLabel>LinkedIn Followers</StatLabel>
              <StatNumber>{formatNumber(linkedInFollowers)}</StatNumber>
              <Tooltip label="Monthly Growth">
                <StatHelpText>
                  <StatArrow type={linkedInMonthlyGrowth > 0 ? "increase" : "decrease"} />
                  {linkedInMonthlyGrowth.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </StatHelpText>
              </Tooltip>
            </Stat>

            <Stat>
              <StatLabel>Web Visits</StatLabel>
              <StatNumber>{formatNumber(webVisits)}</StatNumber>
              <Tooltip label="Monthly Growth">
                <StatHelpText>
                  <StatArrow type={webVisitsMonthlyGrowth > 0 ? "increase" : "decrease"} />
                  {webVisitsMonthlyGrowth.toLocaleString(undefined, {
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
          {websiteUrl ? (
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="Website"
              icon={<img src={worldWideWebLogo} alt="Website" width={15} height={15} />}
              borderRadius="50"
              onClick={() => window.open(websiteUrl, "_blank")}
              size="sm"
            />
          ) : undefined}
        </ButtonGroup>
        <Tooltip label="Details">
          <IconButton
            variant="ghost"
            colorScheme="purple"
            aria-label="Website"
            icon={<InfoOutlineIcon />}
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
