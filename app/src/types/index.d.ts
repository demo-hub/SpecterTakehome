export interface Company {
  Rank: number;
  Domain: string; // this can be used a unique indentifier
  Month: string;
  "Company Name": string;
  Website: string;
  "Founded Date": number;
  Description: string;
  Industry: string;
  "Category Groups": string;
  Categories: string;
  Tags: string;
  "HQ Location": string;
  "HQ Region": string;
  "Total Funding Amount (in USD)": number;
  "Last Funding Amount (in USD)": number;
  "Last Funding Date": string;
  "Last Funding Type": string;
  "Number of Funding Rounds": number;
  "Number of Investors": number;
  Investors: string;
  "Acquired By": string;
  "Acquisition Date": string;
  "Company Size": string;
  Founders: string;
  "Number of Founders": number;
  "Web Visits": number;
  "Web Visits - Monthly Growth": number;
  "Web Visits - 2 Months Growth": number;
  "Web Visits - 3 Months Growth": number;
  "Web Visits - 4 Months Growth": number;
  "Web Visits - 5 Months Growth": number;
  "Web Visits - 6 Months Growth": number;
  "Top Country": string;
  "Country Breakdown": string;
  "Traffic Sources": string;
  "Social Traffic Breakdown": string;
  "Organic Search Percentage": number;
  "Paid Search Percentage": number;
  "Bounce Rate": number;
  "Bounce Rate - 3 Months Growth": number;
  "Session Duration (s)": number;
  "Session Duration (s) - 3 Months Growth": number;
  "Pages per Visit": number;
  "Pages per Visit - 3 Months Growth": number;
  "Similar Websites and Audience Overlap": string;
  "Alexa Rank": number;
  "Alexa Rank - Monthly Growth": number;
  "Alexa Rank - 2 Months Growth": number;
  "Alexa Rank - 3 Months Growth": number;
  "Alexa Rank - 4 Months Growth": number;
  "Alexa Rank - 5 Months Growth": number;
  "Alexa Rank - 6 Months Growth": number;
  "LinkedIn - URL": string;
  "Employee Count": number;
  "Employees - Monthly Growth": number;
  "Employees - 2 Months Growth": number;
  "Employees - 3 Months Growth": number;
  "Employees - 4 Months Growth": number;
  "Employees - 5 Months Growth": number;
  "Employees - 6 Months Growth": number;
  "Talent Inflow": number;
  "Talent Outflow": any;
  "Talent Score": number;
  "LinkedIn - Followers": number;
  "LinkedIn - Monthly Followers Growth": number;
  "LinkedIn - 2 Months Followers Growth": number;
  "LinkedIn - 3 Months Followers Growth": number;
  "LinkedIn - 4 Months Followers Growth": number;
  "LinkedIn - 5 Months Followers Growth": number;
  "LinkedIn - 6 Months Followers Growth": number;
  "Twitter - URL": string;
  "Twitter - Followers": number;
  "Twitter - Monthly Followers Growth": number;
  "Twitter - 2 Months Followers Growth": number;
  "Twitter - 3 Months Followers Growth": number;
  "Twitter - 4 Months Followers Growth": number;
  "Twitter - 5 Months Followers Growth": number;
  "Twitter - 6 Months Followers Growth": number;
  "Instagram - URL": string;
  "Instagram - Followers": any;
  "Instagram - Monthly Followers Growth": any;
  "Instagram - 2 Months Followers Growth": any;
  "Instagram - 3 Months Followers Growth": any;
  "Instagram - 4 Months Followers Growth": any;
  "Instagram - 5 Months Followers Growth": any;
  "Instagram - 6 Months Followers Growth": any;
  "Instagram - Following": any;
  "iTunes - URL": string;
  "iTunes App ID": number;
  "iTunes - Rating": number;
  "iTunes - Reviews": number;
  "iTunes - Monthly Reviews Growth": number;
  "iTunes - 2 Months Reviews Growth": number;
  "iTunes - 3 Months Reviews Growth": number;
  "iTunes - 4 Months Reviews Growth": number;
  "iTunes - 5 Months Reviews Growth": number;
  "iTunes - 6 Months Reviews Growth": number;
  "Google Play - URL": string;
  "Google Play App ID": string;
  "Google Play - Rating": number;
  "Google Play - Reviews": number;
  "Google Play - Monthly Reviews Growth": number;
  "Google Play - 2 Months Reviews Growth": number;
  "Google Play - 3 Months Reviews Growth": number;
  "Google Play - 4 Months Reviews Growth": number;
  "Google Play - 5 Months Reviews Growth": number;
  "Google Play - 6 Months Reviews Growth": number;
  "Google Play - Installs": string;
  "Contact Email": string;
  "Phone Number": string;
}

export interface Filters {
  industries: string[];
}
