import { useCompanies } from "@api/companies";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import CompanyCard from "@components/companyCard";
import { useEffect } from "react";

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
              <CompanyCard
                key={company.Domain}
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
              />
            ))
          )
        : undefined}
      {isFetchingNextPage ? <Spinner color="purple" /> : undefined}
    </SimpleGrid>
  );
}

export default App;
