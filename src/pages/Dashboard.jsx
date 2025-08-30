import React from "react";
import Greeting from "../components/Greeting";
import DashboardCards from "../components/DashboardCards";
import ChartPanel from "../components/ChartPanel";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">InsightBoard – Real-Time Analytics Dashboard</h1>
      <Greeting />
      <DashboardCards />
      <ChartPanel />
    </div>
  );
};

export default Dashboard;