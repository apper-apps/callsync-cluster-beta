import React from "react";
import { format, differenceInMinutes } from "date-fns";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CallCard = ({ call, onClick, className }) => {
  const startTime = new Date(call.startTime);
  const minutesUntil = differenceInMinutes(startTime, new Date());

  const getUrgencyBadge = () => {
    if (minutesUntil < 0) return { variant: "default", label: "Past" };
    if (minutesUntil < 15) return { variant: "urgent", label: "Starting Soon" };
    if (minutesUntil < 60) return { variant: "soon", label: "Starting Soon" };
    return { variant: "normal", label: "Upcoming" };
  };

  const urgency = getUrgencyBadge();

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer border-l-4 border-l-primary-500 hover:border-l-primary-600",
        "hover:shadow-lg transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-medium text-gray-900 truncate">{call.title}</h3>
            <Badge variant={urgency.variant}>{urgency.label}</Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <ApperIcon name="User" className="h-4 w-4" />
              <span>{call.prospectName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" className="h-4 w-4" />
              <span>{format(startTime, "h:mm a")}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="h-4 w-4" />
              <span>{format(startTime, "MMM d")}</span>
            </div>
          </div>
          {call.description && (
            <p className="text-sm text-gray-500 line-clamp-2">{call.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {call.meetingLink && (
            <ApperIcon name="Video" className="h-4 w-4 text-primary-600" />
          )}
          <ApperIcon name="ChevronRight" className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </Card>
  );
};

export default CallCard;