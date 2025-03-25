export const truncateHash = (hash?: string) => {
  if (!hash) return '';
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
}; 