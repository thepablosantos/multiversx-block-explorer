const BASE_URL = import.meta.env.VITE_API_URL || "https://testnet-api.multiversx.com";

export interface Block {
  hash: string;
  nonce: number;
  numTxs: number;
  shard: number;
  timestamp: number;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'success' | 'pending' | 'failed';
}

export interface BlockResponse {
  nonce: number;
  round: number;
  epoch: number;
}

export interface TransactionCount {
  totalProcessed: number;
  last24h: number;
}

export interface AccountCount {
  totalAccounts: number;
  activeAccounts: number;
}

export interface ValidatorResponse {
  totalValidators: number;
  activeValidators: number;
  queueSize: number;
}

export async function getLatestBlocks(size = 5) {
  const res = await fetch(`${BASE_URL}/blocks?from=0&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch blocks");
  const data = await res.json();
  console.log('Blocks data:', data);
  return {
    blocks: data.map((block: any) => ({
      hash: block.hash,
      nonce: block.nonce,
      numTxs: block.txCount,
      shard: block.shard,
      timestamp: block.timestamp
    }))
  };
}

export async function getBlockHeight() {
  const res = await fetch(`${BASE_URL}/blocks/count`);
  if (!res.ok) throw new Error("Failed to fetch block height");
  const data = await res.json();
  console.log('Block height data:', data);
  return { nonce: data.count };
}

export async function getTotalTransactions() {
  const res = await fetch(`${BASE_URL}/transactions/count`);
  if (!res.ok) throw new Error("Failed to fetch transactions count");
  const data = await res.json();
  console.log('Transactions count data:', data);
  return {
    totalProcessed: data.totalProcessed || data.count,
    last24h: data.last24h || 0
  };
}

export async function getTotalAccounts() {
  const res = await fetch(`${BASE_URL}/accounts/count`);
  if (!res.ok) throw new Error("Failed to fetch accounts count");
  const data = await res.json();
  console.log('Accounts count data:', data);
  return {
    totalAccounts: data.totalAccounts || data.count,
    activeAccounts: data.activeAccounts || 0
  };
}

export async function getValidators() {
  const res = await fetch(`${BASE_URL}/stats/validators`);
  if (!res.ok) throw new Error("Failed to fetch validators");
  const data = await res.json();
  console.log('Validators data:', data);
  return {
    totalValidators: data.totalValidators || 0,
    activeValidators: data.activeValidators || 0,
    queueSize: data.queueSize || 0
  };
}

export async function getLatestTransactions(size = 4) {
  const res = await fetch(`${BASE_URL}/transactions?from=0&size=${size}&withScResults=true`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  const data = await res.json();
  console.log('Latest transactions data:', data);
  return data.map((tx: any) => ({
    hash: tx.hash,
    from: tx.sender || tx.from,
    to: tx.receiver || tx.to,
    value: tx.value,
    timestamp: tx.timestamp,
    status: tx.status || 'success'
  }));
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