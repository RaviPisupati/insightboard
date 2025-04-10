import React from "react";

const stats = [
  { label: "Users", value: "12,340", change: "+5.6%" },
  { label: "Revenue", value: "$85,900", change: "+12.3%" },
  { label: "Sessions", value: "7,825", change: "-4.7%" },
  { label: "Activity", value: "92", change: "+1.9%" }
];

const DashboardCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat, i) => (
      <div key={i} className="bg-white rounded-xl shadow p-4">
        <h4 className="text-sm text-gray-500">{stat.label}</h4>
        <p className="text-xl font-bold">{stat.value}</p>
        <p className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-red-500'}`}>
          {stat.change}
        </p>
      </div>
    ))}
  </div>
);

export default DashboardCards;