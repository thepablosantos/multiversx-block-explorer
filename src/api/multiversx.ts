const BASE_URL = "https://api.multiversx.com";

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
  try {
    const res = await fetch(`${BASE_URL}/blocks?size=${size}`);
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
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return { blocks: [] };
  }
}

export async function getBlockHeight() {
  try {
    const res = await fetch(`${BASE_URL}/stats`);
    if (!res.ok) throw new Error("Failed to fetch block height");
    const data = await res.json();
    console.log('Block height data:', data);
    return { nonce: data.blocks };
  } catch (error) {
    console.error('Error fetching block height:', error);
    return { nonce: 0 };
  }
}

export async function getTotalTransactions() {
  try {
    const res = await fetch(`${BASE_URL}/stats`);
    if (!res.ok) throw new Error("Failed to fetch transactions count");
    const data = await res.json();
    console.log('Transactions count data:', data);
    return {
      totalProcessed: data.transactions,
      last24h: data.transactions24h || 0
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { totalProcessed: 0, last24h: 0 };
  }
}

export async function getTotalAccounts() {
  try {
    const res = await fetch(`${BASE_URL}/stats`);
    if (!res.ok) throw new Error("Failed to fetch accounts count");
    const data = await res.json();
    console.log('Accounts count data:', data);
    return {
      totalAccounts: data.accounts,
      activeAccounts: data.activeAccounts || 0
    };
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return { totalAccounts: 0, activeAccounts: 0 };
  }
}

export async function getValidators() {
  try {
    const res = await fetch(`${BASE_URL}/stats`);
    if (!res.ok) throw new Error("Failed to fetch validators");
    const data = await res.json();
    console.log('Validators data:', data);
    return {
      totalValidators: data.validators?.totalValidators || 0,
      activeValidators: data.validators?.activeValidators || 0,
      queueSize: data.validators?.queueSize || 0
    };
  } catch (error) {
    console.error('Error fetching validators:', error);
    return { totalValidators: 0, activeValidators: 0, queueSize: 0 };
  }
}

export async function getLatestTransactions(size = 4) {
  try {
    const res = await fetch(`${BASE_URL}/transactions?size=${size}&withScResults=true`);
    if (!res.ok) throw new Error("Failed to fetch transactions");
    const data = await res.json();
    console.log('Latest transactions data:', data);
    return data.map((tx: any) => ({
      hash: tx.txHash || tx.hash,
      from: tx.sender || tx.from,
      to: tx.receiver || tx.to,
      value: tx.value,
      timestamp: tx.timestamp,
      status: tx.status || 'success'
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
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