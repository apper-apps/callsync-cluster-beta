import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatsCard = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("p-6 bg-gradient-to-br from-primary-50 to-secondary-50", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-gray-500 mt-1">{trend}</p>
          )}
        </div>
        <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <ApperIcon name={icon} className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;