declare type Currency = {
  id: number;
  Code: string;
  Ccy: string;
  CcyNm_EN: string;
  Rate: string;
  Diff: string;
  Date: string;
};

declare type ConverterProps = {
  usdValue: number;
  setUsdValue: (value: number) => void;
  exchangeRates: any;
};

declare type CurrencyTableProps = {
  currencies: Currency[] | undefined;
  loading: boolean;
  error: boolean;
};

declare type ErrorMessageProps = {
  message: string;
};

declare type Currency = {
  Ccy: string;
  Rate: string;
};

declare type ExchangeRates = {
  uzs: number;
  eur: number;
  rub: number;
};

declare type ConverterProps = {
  usdValue: number;
  setUsdValue: React.Dispatch<React.SetStateAction<number>>;
  exchangeRates: {
    uzs: number;
    eur: number;
    rub: number;
  };
};
