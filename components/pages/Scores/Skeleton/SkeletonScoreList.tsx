"use client";

import type { FC } from "react";
import { Skeleton } from "@/components/ui";
import { useDeviceType } from "@/lib/useDevicesType";

interface SkeletonScoreListProps {
  rowCount?: number;
}

const SkeletonScoreLists: FC<SkeletonScoreListProps> = ({ rowCount }) => {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <div className="flex flex-col gap-4">
      {[...Array(rowCount)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition hover:shadow-md w-72 mx-auto sm:w-auto sm:mx-0"
        >
          {/* Home & Away Teams */}
          <div className="flex flex-col sm:flex-row sm:items-center w-full">
            <div className="flex items-center justify-center sm:justify-start w-1/2 sm:w-auto gap-2">
              {/* Home Team */}
              <div className="flex items-center space-x-2 w-36 justify-end">
                <Skeleton className="w-8 h-8 rounded-full" />
                {!isMobile && <Skeleton className="h-4 w-24" />}
              </div>

              <span className="text-xs font-medium text-gray-600 w-10 text-center">
                VS
              </span>

              {/* Away Team */}
              <div className="flex items-center space-x-2 w-36 justify-start">
                {!isMobile && <Skeleton className="h-4 w-24" />}
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>

            {/* Score Section */}
            <div className="flex items-center space-x-2 my-2 sm:my-0 w-full sm:w-auto sm:mx-auto justify-center">
              <Skeleton className="h-6 w-8" />
              <span className="text-lg font-bold">-</span>
              <Skeleton className="h-6 w-8" />
            </div>
          </div>

          {/* Quarter Scores & Time (Desktop Only) */}
          {isDesktop && (
            <div className="flex items-center text-xs text-gray-700 space-x-5">
              {/* Left: Q1 & Q2 */}
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-2">
                  <span className="font-semibold">Q1:</span>
                  <Skeleton className="h-4 w-6" />
                  <span>-</span>
                  <Skeleton className="h-4 w-6" />
                </div>
                <div className="flex space-x-2">
                  <span className="font-semibold">Q2:</span>
                  <Skeleton className="h-4 w-6" />
                  <span>-</span>
                  <Skeleton className="h-4 w-6" />
                </div>
              </div>

              {/* Right: Q3 & Q4 */}
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-2">
                  <span className="font-semibold">Q3:</span>
                  <Skeleton className="h-4 w-6" />
                  <span>-</span>
                  <Skeleton className="h-4 w-6" />
                </div>
                <div className="flex space-x-2">
                  <span className="font-semibold">Q4:</span>
                  <Skeleton className="h-4 w-6" />
                  <span>-</span>
                  <Skeleton className="h-4 w-6" />
                </div>
              </div>
            </div>
          )}

          {/* Game Time (Desktop Only) */}
          {isDesktop && <Skeleton className="h-4 w-32" />}
        </div>
      ))}
    </div>
  );
};

export default SkeletonScoreLists;
