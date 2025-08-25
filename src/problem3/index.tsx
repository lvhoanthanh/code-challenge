import { useMemo } from "react";
import _ from "lodash";
import { usePrices, useWalletBalances } from "./customHook";
import WalletRow from "./walletRow";
import { Card, Typography, Spin, Flex, Row, Col } from "antd";

const { Title } = Typography;

// WalletBalance interface didn’t define blockchain.
// Add blockchain to the interface.
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Remove BoxProps
interface Props {}

const WalletPage: React.FC<Props> = (props: Props) => {
  // Remove children
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
  const loading = !balances.length || !Object.keys(prices).length;

  // Define priority for each blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // The filter used lhsPriority, which was never defined.
  // Filter out balances with invalid priority or amount <= 0.
  // The sort comparator didn’t return 0 for equal values → unstable sort.
  // Then sort them by blockchain priority (descending order).
  // useMemo depended on both balances and prices, even though prices was not used.
  const sortedBalances = useMemo(() => {
    return _.orderBy(
      _.filter(balances, (balance: WalletBalance) => {
        return getPriority(balance.blockchain) > -99 && balance.amount > 0;
      }),
      [(balance: WalletBalance) => getPriority(balance.blockchain)],
      ["desc"]
    );
  }, [balances]);

  // Unused formattedBalances.
  // Format balances using Intl.NumberFormat
  // If currency is not ISO-4217 (like BTC, ETH), fallback to custom formatting
  const formattedBalances: FormattedWalletBalance[] = _.map(
    sortedBalances,
    (balance: WalletBalance) => {
      let formatted: string;

      try {
        // Try to format using currency style (works for USD, EUR, JPY, etc.)
        formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: balance.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }).format(balance.amount);
      } catch {
        // Fallback for crypto (BTC, ETH, etc.)
        formatted =
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          }).format(balance.amount) +
          " " +
          balance.currency;
      }

      return {
        ...balance,
        formatted,
      };
    }
  );

  // Render rows for each balance
  const rows = _.map(formattedBalances, (balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const usdFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(usdValue);

    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
        formattedUsdValue={usdFormatted}
      />
    );
  });
  console.log(loading, 'aaaaaaaaaa')
  return (
    <Card className="max-w-lg mx-auto mt-8 shadow-md rounded-2xl">
      <Title level={4}>Wallets</Title>
      {loading ? (
        <Row
          justify="center"
          align="middle"
          style={{ height: 200 }} // chiều cao để spinner ở giữa Card
        >
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <div {...rest}>{rows}</div>
      )}
    </Card>
  );
};

export default WalletPage;
