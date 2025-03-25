const API_URL = 'https://api.multiversx.com';
const GATEWAY_URL = 'https://gateway.multiversx.com';
const API_URL_V1 = 'https://api.multiversx.com/v1';

export interface ValidatorStats {
  totalValidators: number;
  activeValidators: number;
  queueSize: number;
  totalStake: string;
}

export interface Validator {
  provider: string;
  stake: string;
  topUp: string;
  locked: string;
  numNodes: number;
  numUsers: number;
  apy: number;
  featured: boolean;
  identity: string;
  score: number;
}

export interface NetworkStats {
  shards: number;
  blocks: number;
  accounts: number;
  transactions: number;
  refreshRate: number;
  epoch: number;
  roundsPassed: number;
  roundsPerEpoch: number;
}

export interface NetworkStake {
  totalValidators: number;
  activeValidators: number;
  queueSize: number;
  totalStaked: string;
}

export interface NetworkEconomics {
  totalSupply: string;
  circulatingSupply: string;
  staked: string;
  price: number;
  marketCap: number;
  apr: number;
  topUpApr: number;
  baseApr: number;
}

export const fetchValidatorStats = async (): Promise<ValidatorStats> => {
  const response = await fetch(`${API_URL}/validators/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch validator stats');
  }
  return response.json();
};

export const fetchValidators = async (): Promise<Validator[]> => {
  const response = await fetch(`${API_URL}/providers`);
  if (!response.ok) {
    throw new Error('Failed to fetch validators');
  }
  return response.json();
};

export const fetchNetworkStats = async (): Promise<NetworkStats> => {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch network stats');
  }
  return response.json();
};

export const fetchNetworkStake = async (): Promise<NetworkStake> => {
  const response = await fetch(`${API_URL}/stake`);
  if (!response.ok) {
    throw new Error('Failed to fetch network stake');
  }
  return response.json();
};

export const fetchNetworkEconomics = async (): Promise<NetworkEconomics> => {
  const response = await fetch(`${API_URL}/economics`);
  if (!response.ok) {
    throw new Error('Failed to fetch network economics');
  }
  return response.json();
};

export const fetchLatestBlocks = async (page: number = 1, limit: number = 25) => {
  const from = (page - 1) * limit;
  const response = await fetch(`${API_URL}/blocks?from=${from}&size=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch latest blocks');
  }
  const data = await response.json();
  return {
    blocks: data,
    totalPages: Math.ceil(data.totalCount / limit)
  };
};

export const fetchLatestTransactions = async (page: number = 1, limit: number = 25) => {
  const from = (page - 1) * limit;
  const response = await fetch(`${API_URL}/transactions?from=${from}&size=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch latest transactions');
  }
  const data = await response.json();
  return {
    transactions: data,
    totalPages: Math.ceil(data.totalCount / limit)
  };
};

export const fetchAccounts = async (page: number = 1, limit: number = 25) => {
  const from = (page - 1) * limit;
  const response = await fetch(`${API_URL}/accounts?from=${from}&size=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }
  const data = await response.json();
  return {
    accounts: data,
    totalPages: Math.ceil(data.totalCount / limit)
  };
};

export const fetchAccountStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch account stats');
  }
  const data = await response.json();
  
  return {
    totalAccounts: data.accounts,
    activeAccounts: data.accounts, // A API não fornece este dado específico
    stakingAccounts: data.accounts // A API não fornece este dado específico
  };
}; 