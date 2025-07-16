import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="inline-flex items-center">
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;