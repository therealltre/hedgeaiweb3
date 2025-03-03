// import { ethers } from "ethers";

// // Strategy base class
// class TradingStrategy {
//   constructor(config = {}) {
//     this.config = {
//       stopLoss: config.stopLoss || 0.02, // 2% stop loss
//       takeProfit: config.takeProfit || 0.05, // 5% take profit
//       maxPositionSize: config.maxPositionSize || 0.1, // 10% of available balance
//       ...config
//     };
//     this.positions = new Map();
//     this.historicalPrices = [];
//   }

//   updatePrice(price, timestamp = Date.now()) {
//     this.historicalPrices.push({ price, timestamp });
//     // Keep last 100 price points for analysis
//     if (this.historicalPrices.length > 100) {
//       this.historicalPrices.shift();
//     }
//   }

//   calculateSMA(period) {
//     if (this.historicalPrices.length < period) return null;
//     const prices = this.historicalPrices.slice(-period);
//     const sum = prices.reduce((acc, curr) => acc + curr.price, 0);
//     return sum / period;
//   }

//   calculateEMA(period) {
//     if (this.historicalPrices.length < period) return null;
//     const k = 2 / (period + 1);
//     return this.historicalPrices.slice(-period).reduce((ema, price, i) => {
//       if (i === 0) return price.price;
//       return price.price * k + ema * (1 - k);
//     }, 0);
//   }

//   calculateRSI(period = 14) {
//     if (this.historicalPrices.length < period + 1) return null;

//     let gains = 0;
//     let losses = 0;

//     // Calculate initial gains/losses
//     for (let i = 1; i <= period; i++) {
//       const diff = this.historicalPrices[i].price - this.historicalPrices[i - 1].price;
//       if (diff >= 0) gains += diff;
//       else losses -= diff;
//     }

//     // Calculate initial averages
//     let avgGain = gains / period;
//     let avgLoss = losses / period;

//     // Calculate RSI
//     const rs = avgGain / avgLoss;
//     return 100 - (100 / (1 + rs));
//   }
// }

// // Moving Average Crossover Strategy
// export class MACrossoverStrategy extends TradingStrategy {
//   constructor(config = {}) {
//     super({
//       ...config,
//       fastPeriod: config.fastPeriod || 10,
//       slowPeriod: config.slowPeriod || 21
//     });
//   }

//   analyze() {
//     const fastMA = this.calculateEMA(this.config.fastPeriod);
//     const slowMA = this.calculateEMA(this.config.slowPeriod);
    
//     if (!fastMA || !slowMA) return { action: 'WAIT', reason: 'Insufficient data' };

//     const currentPrice = this.historicalPrices[this.historicalPrices.length - 1].price;
    
//     // Check for crossover
//     if (fastMA > slowMA) {
//       return {
//         action: 'BUY',
//         reason: 'Fast MA crossed above Slow MA',
//         price: currentPrice,
//         confidence: (fastMA - slowMA) / slowMA
//       };
//     } else if (fastMA < slowMA) {
//       return {
//         action: 'SELL',
//         reason: 'Fast MA crossed below Slow MA',
//         price: currentPrice,
//         confidence: (slowMA - fastMA) / slowMA
//       };
//     }

//     return { action: 'HOLD', reason: 'No significant cross detected' };
//   }
// }

// // RSI Strategy
// export class RSIStrategy extends TradingStrategy {
//   constructor(config = {}) {
//     super({
//       ...config,
//       oversold: config.oversold || 30,
//       overbought: config.overbought || 70,
//       period: config.period || 14
//     });
//   }

//   analyze() {
//     const rsi = this.calculateRSI(this.config.period);
//     if (!rsi) return { action: 'WAIT', reason: 'Insufficient data' };

//     const currentPrice = this.historicalPrices[this.historicalPrices.length - 1].price;

//     if (rsi < this.config.oversold) {
//       return {
//         action: 'BUY',
//         reason: 'RSI indicates oversold condition',
//         price: currentPrice,
//         confidence: (this.config.oversold - rsi) / this.config.oversold
//       };
//     } else if (rsi > this.config.overbought) {
//       return {
//         action: 'SELL',
//         reason: 'RSI indicates overbought condition',
//         price: currentPrice,
//         confidence: (rsi - this.config.overbought) / (100 - this.config.overbought)
//       };
//     }

//     return { action: 'HOLD', reason: 'RSI in neutral zone' };
//   }
// }

// // MACD Strategy
// export class MACDStrategy extends TradingStrategy {
//   constructor(config = {}) {
//     super({
//       ...config,
//       fastPeriod: config.fastPeriod || 12,
//       slowPeriod: config.slowPeriod || 26,
//       signalPeriod: config.signalPeriod || 9
//     });
//   }

//   calculateMACD() {
//     const fastEMA = this.calculateEMA(this.config.fastPeriod);
//     const slowEMA = this.calculateEMA(this.config.slowPeriod);
//     if (!fastEMA || !slowEMA) return null;

//     const macd = fastEMA - slowEMA;
//     return macd;
//   }

//   analyze() {
//     const macd = this.calculateMACD();
//     if (!macd) return { action: 'WAIT', reason: 'Insufficient data' };

//     const currentPrice = this.historicalPrices[this.historicalPrices.length - 1].price;
//     const signalLine = this.calculateEMA(this.config.signalPeriod);
    
//     if (!signalLine) return { action: 'WAIT', reason: 'Insufficient signal line data' };

//     if (macd > signalLine) {
//       return {
//         action: 'BUY',
//         reason: 'MACD crossed above signal line',
//         price: currentPrice,
//         confidence: (macd - signalLine) / Math.abs(signalLine)
//       };
//     } else if (macd < signalLine) {
//       return {
//         action: 'SELL',
//         reason: 'MACD crossed below signal line',
//         price: currentPrice,
//         confidence: (signalLine - macd) / Math.abs(signalLine)
//       };
//     }

//     return { action: 'HOLD', reason: 'No significant MACD cross' };
//   }
// }

// // Position sizing and risk management
// export const riskManager = {
//   calculatePositionSize(balance, price, stopLoss, riskPerTrade = 0.01) {
//     const riskAmount = balance * riskPerTrade;
//     const stopLossAmount = price * stopLoss;
//     return riskAmount / stopLossAmount;
//   },

//   calculateStopLoss(entryPrice, direction, stopLossPercentage = 0.02) {
//     return direction === 'BUY' 
//       ? entryPrice * (1 - stopLossPercentage)
//       : entryPrice * (1 + stopLossPercentage);
//   },

//   calculateTakeProfit(entryPrice, direction, takeProfitPercentage = 0.05) {
//     return direction === 'BUY'
//       ? entryPrice * (1 + takeProfitPercentage)
//       : entryPrice * (1 - takeProfitPercentage);
//   }
// };