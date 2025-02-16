"use client";

import React, { useEffect, useState } from "react";
import { APIStatusResponse } from "@/type/Status/status";
import { ApiError } from "@/components/PlanError";
import { fetchSportsStatus } from "@/utils/Status/fetchStatus";

const Home = () => {
  const [subscription, setSubscription] = useState<{
    plan: string;
    end: string;
    active: boolean;
  } | null>(null);

  const [limitDay, setLimitDay] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: APIStatusResponse = await fetchSportsStatus("NFL");

        if (
          !data.response ||
          !data.response.subscription ||
          !data.response.requests
        ) {
          throw new Error("Invalid API response or request limit reached.");
        }

        const sub = data.response.subscription;
        const req = data.response.requests;

        setSubscription({
          plan: sub.plan,
          end: new Date(sub.end).toLocaleDateString("en-GB"),
          active: sub.active,
        });

        setLimitDay(req.limit_day);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ApiError message={error} />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          API Subscription Details
        </h1>
        {subscription && limitDay !== null ? (
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
              <span className="font-medium text-gray-600">Daily Limit: </span>
              {limitDay}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
