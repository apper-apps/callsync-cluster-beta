import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title, description, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="Calendar" className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/setup">
              <ApperIcon name="Settings" className="h-4 w-4 mr-2" />
              Setup Calendar
            </Link>
          </Button>
          <Button variant="outline">
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Empty;