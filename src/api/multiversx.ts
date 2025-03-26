export const API_URL = 'https://api.multiversx.com';
export const API_URL_V1 = 'https://api.multiversx.com/transactions';

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

export interface TransactionDetails {
  hash: string;
  status: string;
  timestamp: number;
  sender: string;
  senderShard: number;
  receiver: string;
  receiverShard: number;
  value: string;
  fee: string;
  gasPrice: string;
  gasLimit: number;
  gasUsed: number;
  miniBlockHash: string;
  nonce: number;
  round: number;
  function?: string;
  action?: string;
  data?: string;
  scResults?: any[];
  operations?: any[];
  logs?: {
    events: any[];
  };
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

export async function getTotalTransactions(): Promise<TransactionStats> {
  try {
    console.log('Fetching transaction statistics...');
    const res = await fetch(`${BASE_URL}/stats`);
    
    if (!res.ok) {
      console.error('Error fetching statistics:', res.status, res.statusText);
      throw new Error("Failed to fetch statistics");
    }

    const data = await res.json();
    console.log('Statistics data received:', data);

    return {
      totalTransactions: data.transactions || 0,
      averageBlockTime: data.blockTime || 6
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      totalTransactions: 0,
      averageBlockTime: 6
    };
  }
}

interface TransactionStats {
  totalTransactions: number;
  averageBlockTime: number;
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
    console.log('Fetching recent transactions...');
    const res = await fetch(`${BASE_URL}/transactions?size=${size}&withScResults=true`);
    
    if (!res.ok) {
      console.error('Error fetching transactions:', res.status, res.statusText);
      throw new Error("Failed to fetch transactions");
    }

    const data = await res.json();
    console.log('Transaction data received:', data);

    if (!Array.isArray(data)) {
      console.error('Received data is not an array:', data);
      return [];
    }

    return data.map((tx: any) => ({
      hash: tx.txHash || tx.hash,
      from: tx.sender || tx.from,
      to: tx.receiver || tx.to,
      value: tx.value || '0',
      timestamp: tx.timestamp || Date.now() / 1000,
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

export async function getTransactionByHash(hash: string): Promise<TransactionDetails> {
  try {
    console.log('Fetching transaction with hash:', hash);
    const res = await fetch(`${BASE_URL}/transactions/${hash}`);
    
    if (!res.ok) {
      console.error('Error fetching transaction:', res.status, res.statusText);
      throw new Error("Failed to fetch transaction");
    }

    const data = await res.json();
    console.log('Transaction data received:', data);

    return {
      hash: data.txHash || data.hash,
      status: data.status || 'pending',
      timestamp: data.timestamp || Date.now() / 1000,
      sender: data.sender,
      senderShard: data.senderShard || 1,
      receiver: data.receiver,
      receiverShard: data.receiverShard || 1,
      value: data.value || '0',
      fee: data.fee || '0',
      gasPrice: data.gasPrice || '0',
      gasLimit: data.gasLimit || 0,
      gasUsed: data.gasUsed || 0,
      miniBlockHash: data.miniBlockHash || '',
      nonce: data.nonce || 0,
      round: data.round || 0,
      function: data.function,
      action: data.action,
      data: data.data,
      scResults: data.scResults || [],
      operations: data.operations || [],
      logs: data.logs || { events: [] }
    };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
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