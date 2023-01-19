import { useCompanies } from "@api/companies";
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
      <h1>Good luck!</h1>

      <p>Here is an example of data we hold on a company</p>
      {!isLoading && isSuccess
        ? data?.pages.map((page) => <pre key={page[0].Rank}>{JSON.stringify(page, null, 2)}</pre>)
        : undefined}
    </div>
  );
}

export default App;
