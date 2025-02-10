import React, { useState } from "react";
import { List, Grid, Table } from "lucide-react";

const ViewSelector: React.FC<{ onViewChange: (view: string) => void }> = ({
  onViewChange,
}) => {
  const savedView = localStorage.getItem("viewPreference") || "list";
  const [view, setView] = useState(savedView);

  const handleViewChange = (newView: string) => {
    setView(newView);
    localStorage.setItem("viewPreference", newView);
    onViewChange(newView); // Notify parent component of the change
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
