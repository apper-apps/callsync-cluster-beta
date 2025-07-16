import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, differenceInMinutes } from "date-fns";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { prospectCallService } from "@/services/api/prospectCallService";
import { toast } from "react-toastify";

const CallDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCall = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await prospectCallService.getById(parseInt(id));
      setCall(data);
    } catch (err) {
      setError("Failed to load call details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCall();
  }, [id]);

  const handleJoinCall = () => {
    if (call?.meetingLink) {
      window.open(call.meetingLink, "_blank");
      toast.success("Opening meeting link...");
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCall} />;
  if (!call) return <Error message="Call not found" onRetry={handleBackClick} />;

  const startTime = new Date(call.startTime);
  const endTime = new Date(call.endTime);
  const minutesUntil = differenceInMinutes(startTime, new Date());

  const getUrgencyBadge = () => {
    if (minutesUntil < 0) return { variant: "default", label: "Past" };
    if (minutesUntil < 15) return { variant: "urgent", label: "Starting Soon" };
    if (minutesUntil < 60) return { variant: "soon", label: "Starting Soon" };
    return { variant: "normal", label: "Upcoming" };
  };

  const urgency = getUrgencyBadge();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBackClick}>
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={urgency.variant}>{urgency.label}</Badge>
          {call.meetingLink && (
            <Button onClick={handleJoinCall}>
              <ApperIcon name="Video" className="h-4 w-4 mr-2" />
              Join Call
            </Button>
          )}
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{call.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="User" className="h-4 w-4" />
                <span>{call.prospectName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" className="h-4 w-4" />
                <span>{format(startTime, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Clock" className="h-4 w-4" />
                <span>{format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}</span>
              </div>
            </div>
          </div>

          {call.description && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{call.description}</p>
            </div>
          )}

          {call.attendees && call.attendees.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Attendees</h3>
              <div className="space-y-2">
                {call.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ApperIcon name="User" className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{attendee}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Meeting Details</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Duration: {call.duration} minutes</div>
                <div>Calendar: {call.calendarId}</div>
                {call.meetingLink && (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Video" className="h-4 w-4" />
                    <span>Video call available</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Time Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  {minutesUntil > 0 
                    ? `Starts in ${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m`
                    : "Meeting has passed"
                  }
                </div>
                <div>Status: {urgency.label}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CallDetails;