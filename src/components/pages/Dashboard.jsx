import React from "react";
import DashboardStats from "@/components/organisms/DashboardStats";
import CallList from "@/components/organisms/CallList";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor your upcoming prospect calls and manage your schedule
        </p>
      </div>
      
      <DashboardStats />
      <CallList />
    </div>
  );
};

export default Dashboard;