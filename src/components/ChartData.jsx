import React from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartData = ({ data }) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-12 pb-24">
      <LineChart
        data={data
          .sort((a, b) => parseInt(a.data._id) - parseInt(b.data._id))
          .map((res) => res.data)}
        width={895}
        height={350}
      >
        <Line dataKey={"_biomassa"} stroke="#16A34A" type={"monotone"} />
        <XAxis dataKey={"_tanggal"} />
        <YAxis dataKey={"_biomassa"} />
        <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default ChartData;
