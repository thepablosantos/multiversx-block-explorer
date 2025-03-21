const BASE_URL = import.meta.env.VITE_API_URL || "https://testnet-api.multiversx.com";

// Já tínhamos:
export async function getLatestBlocks(size = 5) {
  const res = await fetch(`${BASE_URL}/blocks?from=0&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch blocks");
  return res.json();
}

// ➕ Agora adicionamos:
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