import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CallCard from "@/components/molecules/CallCard";
import FilterBar from "@/components/molecules/FilterBar";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { prospectCallService } from "@/services/api/prospectCallService";

const CallList = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("today");
  const navigate = useNavigate();

  const loadCalls = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await prospectCallService.getAll();
      setCalls(data);
    } catch (err) {
      setError("Failed to load prospect calls. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalls();
  }, []);

  const handleCallClick = (call) => {
    navigate(`/call/${call.Id}`);
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.prospectName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const callDate = new Date(call.startTime);
    
    let matchesFilter = true;
    switch (selectedFilter) {
      case "today":
        matchesFilter = callDate.toDateString() === now.toDateString();
        break;
      case "week":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        matchesFilter = callDate >= weekStart && callDate <= weekEnd;
        break;
      case "next_week":
        const nextWeekStart = new Date(now);
        nextWeekStart.setDate(now.getDate() + (7 - now.getDay()));
        const nextWeekEnd = new Date(nextWeekStart);
        nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
        matchesFilter = callDate >= nextWeekStart && callDate <= nextWeekEnd;
        break;
      case "all":
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCalls} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Prospect Calls</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <SearchBar
            placeholder="Search calls or prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <FilterBar
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>
      </div>

      {filteredCalls.length === 0 ? (
        <Empty 
          title="No prospect calls found" 
          description="Try adjusting your search or filter criteria"
        />
      ) : (
        <div className="space-y-4">
          {filteredCalls.map((call) => (
            <CallCard
              key={call.Id}
              call={call}
              onClick={() => handleCallClick(call)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CallList;