/**
 * Function to format a number
 * Examples:
 * 1000 => 1K
 * 1000000 => 1M
 */
const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return number;
};

export default formatNumber;
