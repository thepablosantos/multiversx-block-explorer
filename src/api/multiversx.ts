const BASE_URL = import.meta.env.VITE_API_URL || "https://testnet-api.multiversx.com";

export async function getLatestBlocks(size = 5) {
  const res = await fetch(`${BASE_URL}/blocks?from=0&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch blocks");
  return res.json();
}

export async function getBlockHeight() {
  const res = await fetch(`${BASE_URL}/blocks/latest`);
  if (!res.ok) throw new Error("Failed to fetch block height");
  return res.json();
}

export async function getTotalTransactions() {
  const res = await fetch(`${BASE_URL}/transactions/count`);
  if (!res.ok) throw new Error("Failed to fetch transactions count");
  return res.json();
}

export async function getTotalAccounts() {
  const res = await fetch(`${BASE_URL}/accounts/count`);
  if (!res.ok) throw new Error("Failed to fetch accounts count");
  return res.json();
}

export async function getValidators() {
  const res = await fetch(`${BASE_URL}/validators`);
  if (!res.ok) throw new Error("Failed to fetch validators");
  return res.json();
}

export async function getBlockByHash(hash: string) {
  const res = await fetch(`${BASE_URL}/blocks/${hash}`);
  if (!res.ok) throw new Error("Failed to fetch block details");
  return res.json();
}

export async function getTransactionByHash(hash: string) {
  const res = await fetch(`${BASE_URL}/transactions/${hash}`);
  if (!res.ok) throw new Error("Failed to fetch transaction details");
  return res.json();
}

export async function getAccountByAddress(address: string) {
  const res = await fetch(`${BASE_URL}/accounts/${address}`);
  if (!res.ok) throw new Error("Failed to fetch account details");
  return res.json();
}

export async function getTokenById(id: string) {
  const res = await fetch(`${BASE_URL}/tokens/${id}`);
  if (!res.ok) throw new Error("Failed to fetch token details");
  return res.json();
}