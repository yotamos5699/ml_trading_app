import React, { useEffect, useState } from "react";
import StockChart from "../components/dashboard/StockChart";
import { SideNav, TopNav } from "../components/navs/Navs";
import { ParsedZodDateRange } from "../types/typing";

import { api } from "../utils/api";

const polygone_KEY = "q6GvRSOQRLox9wZT35qjPp5G0aoZwnS3";
type vectorsType = typeof ParsedZodDateRange;
function DashBoard() {
  const [vectors, setVectors] = useState<vectorsType>({
    sort: "asc",
    adjust: false,
    limit: 120,
    ticker: "",
    token: "",
    dateRange: {
      startDate: "",
      endDate: "",
      resulution: {
        type: "",
        amount: 1,
      },
    },
  });
  const [requested, setRequested] = useState(false);
  const stocksData = useTickersData(vectors, requested, setRequested);

  const handleClick = (e: Event) => {
    setRequested(!requested);
    console.log({ e });
  };
  return (
    <div dir="rtl" className="flex  flex-col gap-2 border-2 border-blue-200">
      <TopNav
        token={polygone_KEY}
        handleClick={handleClick}
        vectors={vectors}
        setVectors={setVectors}
      />

      <div className="flex min-h-[90vh] gap-2">
        <SideNav />
        <StockChart ticketData={stocksData} />
      </div>
    </div>
  );
}

export default DashBoard;

export const useTickersData = (
  props: vectorsType,
  requested: boolean,
  setRequested: Function
) => {
  const [queryResuelt, setQueryResuelt] = useState<any>();
  if (requested) {
    useEffect(() => {
      const result = api.router.getTickerData.useQuery({ ...props });
      setQueryResuelt(result);
      setRequested(false);
    }, [props]);
  }
  return queryResuelt;
};

export const useLogger = (value: any) => {
  useEffect(() => {
    const varName = Object.keys(value);
    console.table({ varName, value });
  }, [value]);
};
