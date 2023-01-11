import React from "react";

interface stockChartProps {
  ticketData: any;
}

const StockChart = (props: stockChartProps) => {
  return (
    <div className="flex w-full justify-center border-2 border-blue-300 bg-yellow-600">
      <p>stock StockChart</p>
      <div>
        {props.ticketData?.data &&
          JSON.stringify(props.ticketData.data.stockData)}
      </div>
    </div>
  );
};

export default StockChart;
