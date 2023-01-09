import axios from "axios";
//import { z } from "zod";
import { ParsedZodDateRange } from "../../types/typing";
const BASE_URLS = {
  tickers: "https://api.polygon.io/v2/aggs/",
};

export const getSingleTickerData = async (props: typeof ParsedZodDateRange) => {
  const url = `https://api.polygon.io/v2/aggs/ticker/${props.ticker}/range/${props.dateRange.resulution.amount}/${props.dateRange.resulution.type}/${props.dateRange.startDate}/${props.dateRange.endDate}?adjusted=${props.adjust}&sort=${props.sort}&limit=${props.limit}&apiKey=${props.token}`;

  console.log({ url });
  return await axios.get(url).then((res) => {
    console.log("getSingleTickerData", res.data.results);
    return res.data.results;
  });
};
