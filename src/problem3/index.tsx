import { useMemo } from "react";
import _ from "lodash";
import { usePrices, useWalletBalances } from "./customHook";
import WalletRow from "./walletRow";
import { Card, Typography, Spin, Flex, Row, Col } from "antd";

const { Title } = Typography;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
  const loading = !balances.length || !Object.keys(prices).length;

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

  const sortedBalances = useMemo(() => {
    return _.orderBy(
      _.filter(balances, (balance: WalletBalance) => {
        return getPriority(balance.blockchain) > -99 && balance.amount > 0;
      }),
      [(balance: WalletBalance) => getPriority(balance.blockchain)],
      ["desc"]
    );
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = _.map(
    sortedBalances,
    (balance: WalletBalance) => {
      let formatted: string;
      try {
        formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: balance.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }).format(balance.amount);
      } catch {
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

  const rows = _.map(formattedBalances, (balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const usdFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(usdValue);

    return (
      <div
        key={index}
        style={{
          background: index % 2 === 0 ? "#fafafa" : "#fff",
          borderRadius: 8,
          marginBottom: 12,
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          padding: "12px 20px",
        }}
      >
        <WalletRow
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
          formattedUsdValue={usdFormatted}
        />
      </div>
    );
  });

  return (
    <Card
      style={{
        maxWidth: 420,
        margin: "32px auto",
        padding: "24px 16px",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <Flex vertical align="center" style={{ width: "100%" }}>
        <Title level={4} style={{ marginBottom: 24, textAlign: "center" }}>
          Wallets
        </Title>
        {loading ? (
          <Row
            justify="center"
            align="middle"
            style={{ height: 200, width: "100%" }}
          >
            <Col>
              <Spin size="large" />
            </Col>
          </Row>
        ) : (
          <div style={{ width: "100%" }} {...rest}>
            {rows}
          </div>
        )}
      </Flex>
    </Card>
  );
};

export default WalletPage;