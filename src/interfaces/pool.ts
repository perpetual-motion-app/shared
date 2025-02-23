/**
 * Base interfaces for normalized pool data across different platforms
 */

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: string | number;
  logoURI?: string;
  // Optional platform-specific metadata
  metadata?: {
    organicScore?: number;
    isAudited?: boolean;
    auditInfo?: {
      auditor: string;
      auditDate: string;
      reportUrl?: string;
    }[];
  };
}

export interface IPoolMetrics {
  price: number;
  priceChange: {
    '5m'?: number;
    '1h'?: number;
    '6h'?: number;
    '24h': number;
  };
  volume: {
    '5m'?: number;
    '1h'?: number;
    '6h'?: number;
    '24h': number;
  };
  liquidity: {
    total: number;
    token0: number;
    token1: number;
  };
  transactions: {
    '24h': {
      total: number;
      buys: number;
      sells: number;
      uniqueTraders: number;
    };
  };
}

export interface IPoolBase {
  id: string;
  address: string;
  name: string;
  platform: string;
  chainId: string | number;
  createdAt: string;
  token0: IToken;
  token1: IToken;
  metrics: IPoolMetrics;
  // Platform-specific data that doesn't fit in the normalized structure
  platformData?: Record<string, unknown>;
}

// Time windows for metrics
export enum TimeWindow {
  FIVE_MINUTES = '5m',
  ONE_HOUR = '1h',
  SIX_HOURS = '6h',
  TWENTY_FOUR_HOURS = '24h',
}

// Supported platforms
export enum Platform {
  JUPITER = 'jupiter',
  GECKO_TERMINAL = 'geckoterminal',
}

// Chain identifiers
export enum ChainId {
  SOLANA = 'solana',
  ETHEREUM = '1',
  BSC = '56',
  // Add more chains as needed
} 