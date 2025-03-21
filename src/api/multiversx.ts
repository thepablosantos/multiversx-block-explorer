const BASE_URL = import.meta.env.VITE_API_URL || "https://testnet-api.multiversx.com";

export async function getLatestBlocks(size = 5) {
  const res = await fetch(`${BASE_URL}/blocks?from=0&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch blocks");
  return res.json();
}

export async function getBlockByHash(hash: string) {
  const res = await fetch(`${BASE_URL}/blocks/${hash}`);
  if (!res.ok) throw new Error("Failed to fetch block details");
  return res.json();
}