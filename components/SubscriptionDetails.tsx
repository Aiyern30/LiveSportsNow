import React from "react";

interface SubscriptionDetailsProps {
  subscription: {
    plan: string;
    end: string;
    active: boolean;
  };
  requestUsage: {
    current: number;
    limit: number;
  };
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscription,
  requestUsage,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        API Subscription Details
      </h1>
      <div className="space-y-4">
        <p className="text-lg">
          <span className="font-medium text-gray-600">Plan: </span>
          {subscription.plan}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-600">End Date: </span>
          {subscription.end}
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-600">Active: </span>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              subscription.active ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {subscription.active ? "Yes" : "No"}
          </span>
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-600">
            Daily Requests Used:{" "}
          </span>
          <span className="font-bold text-blue-600">
            {requestUsage.current} / {requestUsage.limit}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
