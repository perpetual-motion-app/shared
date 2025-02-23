import { IPoolBase, IToken, IPoolMetrics, TimeWindow, Platform } from '../interfaces/pool';

/**
 * Base Pool class that implements the normalized pool interface
 * This class provides common functionality for working with pool data
 * across different platforms
 */
export class Pool implements IPoolBase {
  public id: string;
  public address: string;
  public name: string;
  public platform: string;
  public chainId: string | number;
  public createdAt: string;
  public token0: IToken;
  public token1: IToken;
  public metrics: IPoolMetrics;
  public platformData?: Record<string, unknown>;

  constructor(data: IPoolBase) {
    this.id = data.id;
    this.address = data.address;
    this.name = data.name;
    this.platform = data.platform;
    this.chainId = data.chainId;
    this.createdAt = data.createdAt;
    this.token0 = data.token0;
    this.token1 = data.token1;
    this.metrics = data.metrics;
    this.platformData = data.platformData;
  }

  /**
   * Get price change over a specific time window
   */
  public getPriceChange(timeWindow: TimeWindow): number | undefined {
    return this.metrics.priceChange[timeWindow];
  }

  /**
   * Get volume over a specific time window
   */
  public getVolume(timeWindow: TimeWindow): number | undefined {
    return this.metrics.volume[timeWindow];
  }

  /**
   * Calculate total value locked (TVL) in USD
   */
  public getTVL(): number {
    return this.metrics.liquidity.total;
  }

  /**
   * Get transaction metrics for the last 24 hours
   */
  public get24hTransactionMetrics() {
    return this.metrics.transactions['24h'];
  }

  /**
   * Check if the pool has been audited
   */
  public isAudited(): boolean {
    return !!(this.token0.metadata?.isAudited && this.token1.metadata?.isAudited);
  }

  /**
   * Get combined organic score (average of both tokens if available)
   */
  public getOrganicScore(): number | undefined {
    const score0 = this.token0.metadata?.organicScore;
    const score1 = this.token1.metadata?.organicScore;

    if (score0 !== undefined && score1 !== undefined) {
      return (score0 + score1) / 2;
    }
    return score0 ?? score1;
  }

  /**
   * Check if this is a Solana pool
   */
  public isSolanaPool(): boolean {
    return this.platform === Platform.JUPITER || 
           (typeof this.chainId === 'string' && this.chainId.toLowerCase() === 'solana');
  }

  /**
   * Get pool age in days
   */
  public getAgeInDays(): number {
    const created = new Date(this.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Convert to JSON representation
   */
  public toJSON(): IPoolBase {
    return {
      id: this.id,
      address: this.address,
      name: this.name,
      platform: this.platform,
      chainId: this.chainId,
      createdAt: this.createdAt,
      token0: this.token0,
      token1: this.token1,
      metrics: this.metrics,
      platformData: this.platformData,
    };
  }
} 