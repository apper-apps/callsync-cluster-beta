import React, { useState, useEffect } from "react";
import { format, isToday, isThisWeek, differenceInMinutes } from "date-fns";
import StatsCard from "@/components/molecules/StatsCard";
import { prospectCallService } from "@/services/api/prospectCallService";

const DashboardStats = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCalls = async () => {
      try {
        const data = await prospectCallService.getAll();
        setCalls(data);
      } catch (error) {
        console.error("Failed to load calls:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, []);

  const now = new Date();
  const todayCalls = calls.filter(call => isToday(new Date(call.startTime)));
  const weekCalls = calls.filter(call => isThisWeek(new Date(call.startTime)));
  const upcomingCalls = calls.filter(call => {
    const callTime = new Date(call.startTime);
    return callTime > now;
  });
  const urgentCalls = calls.filter(call => {
    const callTime = new Date(call.startTime);
    const minutesUntil = differenceInMinutes(callTime, now);
    return minutesUntil > 0 && minutesUntil < 60;
  });

  const stats = [
    {
      title: "Today's Calls",
      value: loading ? "--" : todayCalls.length,
      icon: "Calendar",
      trend: `${todayCalls.length} scheduled`
    },
    {
      title: "This Week",
      value: loading ? "--" : weekCalls.length,
      icon: "CalendarDays",
      trend: `${weekCalls.length} total meetings`
    },
    {
      title: "Upcoming",
      value: loading ? "--" : upcomingCalls.length,
      icon: "Clock",
      trend: `${upcomingCalls.length} future calls`
    },
    {
      title: "Starting Soon",
      value: loading ? "--" : urgentCalls.length,
      icon: "AlertCircle",
      trend: `Within next hour`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;