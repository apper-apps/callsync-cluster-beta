import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const CalendarSetup = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCalendars, setSelectedCalendars] = useState([]);

  const mockCalendars = [
    { id: "primary", name: "Primary Calendar", selected: true },
    { id: "work", name: "Work Calendar", selected: false },
    { id: "sales", name: "Sales Calendar", selected: true }
  ];

  const handleConnectCalendar = async () => {
    toast.info("Connecting to Google Calendar...");
    
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setSelectedCalendars(mockCalendars.filter(cal => cal.selected));
      toast.success("Successfully connected to Google Calendar!");
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedCalendars([]);
    toast.info("Disconnected from Google Calendar");
  };

  const handleCalendarToggle = (calendarId) => {
    setSelectedCalendars(prev => 
      prev.map(cal => 
        cal.id === calendarId 
          ? { ...cal, selected: !cal.selected }
          : cal
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Calendar Setup</h1>
        <p className="text-gray-600 mt-2">
          Connect your Google Calendar to automatically detect prospect calls
        </p>
      </div>

      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
            <ApperIcon name="Calendar" className="h-8 w-8 text-primary-600" />
          </div>
          
          {!isConnected ? (
            <>
              <h3 className="text-lg font-medium text-gray-900">Connect Google Calendar</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Connect your Google Calendar to automatically identify and organize your prospect calls
              </p>
              <Button onClick={handleConnectCalendar} size="lg">
                <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                Connect Google Calendar
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900">Calendar Connected</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Your Google Calendar is connected and syncing prospect calls
              </p>
              <div className="flex justify-center space-x-3">
                <Button variant="accent">
                  <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
                <Button variant="outline" onClick={handleDisconnect}>
                  <ApperIcon name="Unlink" className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      {isConnected && (
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Calendar Selection</h3>
          <p className="text-gray-600 mb-6">
            Choose which calendars to monitor for prospect calls
          </p>
          
          <div className="space-y-3">
            {mockCalendars.map((calendar) => (
              <div key={calendar.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Calendar" className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{calendar.name}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calendar.selected}
                    onChange={() => handleCalendarToggle(calendar.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-sync frequency</h4>
              <p className="text-sm text-gray-600">How often to check for new calls</p>
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every hour</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Prospect keywords</h4>
              <p className="text-sm text-gray-600">Keywords to identify prospect calls</p>
            </div>
            <Button variant="outline" size="sm">
              <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalendarSetup;