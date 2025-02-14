"use client";

import { Card, CardContent, CardHeader, Skeleton } from "@/components/ui";
import React, { FC } from "react";

interface SkeletonScoreGridProps {
  rowCount?: number;
}

const SkeletonScoreGrid: FC<SkeletonScoreGridProps> = ({ rowCount }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(rowCount)].map((_, index) => (
        <Card key={index} className="p-4 shadow-lg">
          <CardHeader className="text-center">
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-rows-3 grid-cols-3 text-center gap-2 items-center">
              <Skeleton className="h-12 w-12 mx-auto" />
              <Skeleton className="h-4 w-1/4 mx-auto" />
              <Skeleton className="h-12 w-12 mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
            <Skeleton className="h-8 mt-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonScoreGrid;
