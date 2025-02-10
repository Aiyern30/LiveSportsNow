import React, { useState, useEffect } from "react";
import { List, Grid, Table } from "lucide-react";

const ViewSelector: React.FC<{ onViewChange: (view: string) => void }> = ({
  onViewChange,
}) => {
  const [view, setView] = useState("list");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("viewPreference");
      if (savedView) {
        setView(savedView);
      }
    }
  }, []);

  const handleViewChange = (newView: string) => {
    setView(newView);
    if (typeof window !== "undefined") {
      localStorage.setItem("viewPreference", newView);
    }
    onViewChange(newView);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className={`p-2 rounded-lg ${
          view === "list" ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
        onClick={() => handleViewChange("list")}
      >
        <List className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg ${
          view === "grid" ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
        onClick={() => handleViewChange("grid")}
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg ${
          view === "table" ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
        onClick={() => handleViewChange("table")}
      >
        <Table className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ViewSelector;
