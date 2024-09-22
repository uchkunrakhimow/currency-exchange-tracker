import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Converter: React.FC<ConverterProps> = ({
  usdValue,
  setUsdValue,
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("UZS");

  const handleConversion = () => {
    switch (currency) {
      case "UZS":
        return usdValue * exchangeRates.uzs;
      case "EUR":
        return usdValue * exchangeRates.eur;
      case "RUB":
        return usdValue * exchangeRates.rub;
      default:
        return 0;
    }
  };

  const convertedAmount = handleConversion();

  return (
    <div className="space-y-3">
      <Select
        value={currency}
        onValueChange={(value: string) => setCurrency(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {usdValue} USD = {convertedAmount.toFixed(2)} {currency}
            </SelectLabel>
            <SelectItem value="UZS">Convert to UZS</SelectItem>
            <SelectItem value="EUR">Convert to EUR</SelectItem>
            <SelectItem value="RUB">Convert to RUB</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="number"
        className="p-2 text-black rounded-lg focus:outline-none"
        value={usdValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsdValue(parseFloat(e.target.value) || 0)
        }
        placeholder="Enter USD amount"
      />

      <p className="font-bold p-1">
        {usdValue} USD = {convertedAmount.toFixed(2)} {currency}
      </p>
    </div>
  );
};

export default Converter;
