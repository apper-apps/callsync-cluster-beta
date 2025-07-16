import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";

const FilterBar = ({ selectedFilter, onFilterChange, className }) => {
  const filters = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "next_week", label: "Next Week" },
    { id: "all", label: "All" }
  ];

  return (
    <div className={cn("flex space-x-2", className)}>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={selectedFilter === filter.id ? "primary" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterBar;