"use client";

import React, { useEffect, useState } from "react";
import { APIStatusResponse } from "@/type/Status/status";
import { ApiError } from "@/components/PlanError";
import { fetchSportsStatus } from "@/utils/Status/fetchStatus";
import SubscriptionDetails from "@/components/SubscriptionDetails";

const Home = () => {
  const [subscription, setSubscription] = useState<{
    plan: string;
    end: string;
    active: boolean;
  } | null>(null);

  const [requestUsage, setRequestUsage] = useState<{
    current: number;
    limit: number;
  } | null>(null);
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

        setRequestUsage({ current: req.current, limit: req.limit_day });
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
      {subscription && requestUsage ? (
        <SubscriptionDetails
          subscription={subscription}
          requestUsage={requestUsage}
        />
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Home;
