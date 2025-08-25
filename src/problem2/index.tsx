import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Form,
  InputNumber,
  Button,
  Typography,
  Card,
  Select,
  Row,
  Col,
  Spin,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

interface PriceData {
  [key: string]: {
    price: number;
  };
}

interface Token {
  currency: string;
  date: string;
  price: number;
}

const SwapForm: React.FC = () => {
  const [form] = Form.useForm();
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => {
        setPrices(data);

        const availableTokens = _.filter(data, (item) => !!item.price);
        const uniqueTokens = _.uniqBy(availableTokens, "currency");

        setTokens(uniqueTokens);
        setLoading(false);
      });
  }, []);

  const handleValuesChange = () => {
    const { fromPrice, toPrice, amount } = form.getFieldsValue();
    if (!fromPrice || !toPrice || !amount) return;

    const receiveAmount = (amount * fromPrice) / toPrice;
    form.setFieldsValue({ receive: Number(receiveAmount.toFixed(6)) });
  };

  const handleSubmit = (values: any) => {
    console.log("Swap Confirmed:", values);
  };

  const _renderFormSwap = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}
      >
        {/* From & To selectors on top */}
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="From"
              name="fromPrice"
              rules={[{ required: true, message: "Select token" }]}
            >
              <Select showSearch placeholder="Select token">
                {tokens.map((token) => (
                  <Option key={token.currency} value={token.price}>
                    <img
                      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                      alt={token.currency}
                      width={20}
                      style={{ marginRight: 8 }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    {token.currency}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="To"
              name="toPrice"
              rules={[{ required: true, message: "Select token" }]}
            >
              <Select showSearch placeholder="Select token">
                {tokens.map((token) => (
                  <Option key={token.currency} value={token.price}>
                    <img
                      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                      alt={token.currency}
                      width={20}
                      style={{ marginRight: 8 }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                    {token.currency}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Amount inputs below */}
        <Form.Item
          label="Amount to send"
          name="amount"
          rules={[{ required: true, message: "Enter amount to send" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder="0.0" />
        </Form.Item>

        <Form.Item label="Amount to receive" name="receive">
          <InputNumber disabled style={{ width: "100%" }} placeholder="0.0" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            CONFIRM SWAP
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Card className="max-w-lg mx-auto mt-8 shadow-md rounded-2xl">
      <Title level={4}>Swap</Title>
      {loading ? (
        <Row
          justify="center"
          align="middle"
          style={{ height: 200 }}
        >
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        _renderFormSwap()
      )}
    </Card>
  );
};

export default SwapForm;
