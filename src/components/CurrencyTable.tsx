import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { Input } from "./ui/input";

const CurrencyTable: React.FC<CurrencyTableProps> = ({
  currencies,
  loading,
  error,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load data" />;

  // Filter for specific currencies
  const allowedCurrencies = ["US Dollar", "Euro", "Russian Ruble"];
  const filteredCurrencies = currencies?.filter(
    (currency) =>
      allowedCurrencies.includes(currency.CcyNm_EN) &&
      (currency.Ccy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.CcyNm_EN.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <Input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
        placeholder="Search name or code"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Currency Name</TableHead>
            <TableHead className="text-left">Currency Code</TableHead>
            <TableHead className="text-left">Exchange Rate (UZS)</TableHead>
            <TableHead className="text-left">Change (%)</TableHead>
            <TableHead className="text-left">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCurrencies?.map((currency) => (
            <TableRow key={currency.id}>
              <TableCell>{currency.CcyNm_EN}</TableCell>
              <TableCell>{currency.Ccy}</TableCell>
              <TableCell>{currency.Rate}</TableCell>
              <TableCell
                className={`${
                  parseFloat(currency.Diff) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {currency.Diff}%
              </TableCell>
              <TableCell>{currency.Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrencyTable;
