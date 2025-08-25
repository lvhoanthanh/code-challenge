import React from "react";

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  formattedUsdValue?: string;
}

const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  formattedUsdValue,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
        borderBottom: "1px solid #ddd",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left side */}
      <div style={{ fontWeight: 500 }}>{formattedAmount}</div>

      {/* Right side */}
      <div style={{ color: "gray" }}>
        {formattedUsdValue ?? `$${usdValue.toFixed(2)}`}
      </div>
    </div>
  );
};

export default WalletRow;