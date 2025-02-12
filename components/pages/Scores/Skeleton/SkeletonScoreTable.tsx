import type { FC } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui";

interface SkeletonScoreTableProps {
  rowCount?: number;
}

const SkeletonScoreTable: FC<SkeletonScoreTableProps> = ({ rowCount }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full">
        <Table className="w-full border border-gray-300 min-w-[800px]">
          {/* Table Header */}
          <TableHeader className="bg-gray-100 border-b border-gray-300">
            <TableRow>
              <TableHead className="border border-gray-300">
                Home Team
              </TableHead>
              <TableHead className="border border-gray-300">
                Away Team
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Score
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q1
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q2
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q3
              </TableHead>
              <TableHead className="border border-gray-300 sm:table-cell text-center w-16">
                Q4
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {[...Array(rowCount)].map((_, index) => (
              <TableRow key={index} className="border-b border-gray-300">
                {/* Home Team */}
                <TableCell className="border border-gray-300 p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  </div>
                </TableCell>

                {/* Away Team */}
                <TableCell className="border border-gray-300 p-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </TableCell>

                {/* Total Score */}
                <TableCell className="border border-gray-300 text-center">
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse" />
                </TableCell>

                {/* Quarters */}
                {[...Array(4)].map((_, qIndex) => (
                  <TableCell key={qIndex} className="border border-gray-300">
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkeletonScoreTable;
