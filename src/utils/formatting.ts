export const truncateHash = (hash?: string) => {
  if (!hash) return '';
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}; 