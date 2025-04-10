import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Apr 10", uv: 400, pv: 240 },
  { name: "Apr 11", uv: 300, pv: 456 },
  { name: "Apr 12", uv: 300, pv: 139 },
  { name: "Apr 13", uv: 200, pv: 980 },
  { name: "Apr 14", uv: 278, pv: 390 },
  { name: "Apr 15", uv: 189, pv: 480 },
];

const pieData = [
  { name: "Direct", value: 400 },
  { name: "Referral", value: 300 },
  { name: "Organic", value: 300 },
];

const COLORS = ["#60a5fa", "#34d399", "#f87171"];

const ChartPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">User Visits</h2>
      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uv" stroke="#3b82f6" />
      </LineChart>
    </div>
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">Sales</h2>
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pv" fill="#10b981" />
      </BarChart>
    </div>
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">Traffic Sources</h2>
      <PieChart width={300} height={200}>
        <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} dataKey="value" label>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  </div>
);

export default ChartPanel;