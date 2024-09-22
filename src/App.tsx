import React, { useState, useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import CurrencyTable from "@/components/CurrencyTable";
import Converter from "@/components/Converter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Loader from "@/components/Loader";

const fetcher = (url: string) =>
  axios.get<Currency[]>(url).then((res) => res.data);

const App: React.FC = () => {
  const [usdValue, setUsdValue] = useState<number>(1);
  const { data: currencies, error } = useSWR<Currency[]>(
    import.meta.env.VITE_API_URI as string,
    fetcher
  );

  const exchangeRates = useMemo(() => {
    return {
      uzs: parseFloat(
        currencies?.find((currency) => currency.Ccy === "USD")?.Rate || "0"
      ),
      eur: parseFloat(
        currencies?.find((currency) => currency.Ccy === "EUR")?.Rate || "0"
      ),
      rub: parseFloat(
        currencies?.find((currency) => currency.Ccy === "RUB")?.Rate || "0"
      ),
    };
  }, [currencies]);

  if (error) return <div>Error loading currencies.</div>;
  if (!currencies)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <main className="antialiased text-slate-700 bg-white sm:h-screen h-full">
      <div className="container px-[15px]">
        <h1 className="text-4xl font-extrabold tracking-wide mb-10 text-center pt-[2rem]">
          Currency Exchange Rates
        </h1>
        <div className="flex flex-wrap justify-center xl:space-x-6 space-x-0">
          <Card className="w-full max-w-4xl mb-10 shadow-lg">
            <CardHeader>
              <CardTitle>Exchange Rates</CardTitle>
              <CardDescription>
                Live exchange rates of various currencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CurrencyTable
                currencies={currencies}
                loading={!currencies}
                error={error}
              />
            </CardContent>
          </Card>
          <Card className="w-full max-w-md shadow-lg mb-10">
            <CardHeader>
              <CardTitle>Real-Time Currency Converter</CardTitle>
              <CardDescription>
                Instantly convert USD to UZS and other currencies with live
                exchange rates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Converter
                usdValue={usdValue}
                setUsdValue={setUsdValue}
                exchangeRates={exchangeRates}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default App;
