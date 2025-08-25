import React from "react";
import { Row, Col, Typography, Divider } from "antd";

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  formattedUsdValue?: string;
}

const { Text } = Typography;

const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  formattedUsdValue,
}) => {
  return (
    <>
      <Row align="middle" justify="space-between" style={{ padding: "8px 0" }}>
        <Col>
          <Text strong>{formattedAmount}</Text>
        </Col>
        <Col>
          <Text type="secondary">
            {formattedUsdValue ?? `$${usdValue.toFixed(2)}`}
          </Text>
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default WalletRow;