const BASE_URL = import.meta.env.VITE_API_URL || "https://testnet-api.multiversx.com";

// Últimos blocos
export async function getLatestBlocks(size = 5) {
  const res = await fetch(`${BASE_URL}/blocks?from=0&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch blocks");
  return res.json();
}

// Block Height
export async function getBlockHeight() {
  const res = await fetch(`${BASE_URL}/blocks/latest`);
  if (!res.ok) throw new Error("Failed to fetch block height");
  return res.json();
}

// Total Transactions
export async function getTotalTransactions() {
  const res = await fetch(`${BASE_URL}/transactions/count`);
  if (!res.ok) throw new Error("Failed to fetch transactions count");
  return res.json();
}

// Total Accounts
export async function getTotalAccounts() {
  const res = await fetch(`${BASE_URL}/accounts/count`);
  if (!res.ok) throw new Error("Failed to fetch accounts count");
  return res.json();
}

// Validators
export async function getValidators() {
  const res = await fetch(`${BASE_URL}/validators`);
  if (!res.ok) throw new Error("Failed to fetch validators");
  return res.json();
}

// Block Details by Hash
export async function getBlockByHash(hash: string) {
  const res = await fetch(`${BASE_URL}/blocks/${hash}`);
  if (!res.ok) throw new Error("Failed to fetch block details");
  return res.json();
}

// Transaction Details by Hash
export async function getTransactionByHash(hash: string) {
  const res = await fetch(`${BASE_URL}/transactions/${hash}`);
  if (!res.ok) throw new Error("Failed to fetch transaction details");
  return res.json();
}

// Account Details by Address
export async function getAccountByAddress(address: string) {
  const res = await fetch(`${BASE_URL}/accounts/${address}`);
  if (!res.ok) throw new Error("Failed to fetch account details");
  return res.json();
}