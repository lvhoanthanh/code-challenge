import { useState, useEffect } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

export const useWalletBalances = (): WalletBalance[] => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      // pretend to fetch from backend or blockchain
      await new Promise((res) => setTimeout(res, 500)); // delay
      setBalances([
        { currency: "ETH", amount: 1, blockchain: "Ethereum" },
        { currency: "BTC", amount: 2, blockchain: "Neo" },
        { currency: "ATOM", amount: 3, blockchain: "Osmosis" },
        { currency: "DOGE", amount: 4, blockchain: "Zilliqa" },
      ]);
    };

    fetchBalances();
  }, []);

  return balances;
};

export const usePrices = (): Record<string, number> => {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fake API call
    const fetchPrices = async () => {
      await new Promise((res) => setTimeout(res, 300)); // simulate delay
      setPrices({
        ETH: 100,
        BTC: 200,
        ATOM: 300,
        DOGE: 300,
      });
    };

    fetchPrices();
  }, []);

  return prices;
};