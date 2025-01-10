import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      // Show all pages if total pages <= 3
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 2) {
      // Show first 3 pages with ellipsis
      pages.push(1, 2, 3, "...");
    } else if (currentPage >= totalPages - 1) {
      // Show last 3 pages with ellipsis
      pages.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Show current page and neighbors with ellipsis
      pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    }
    return pages;
  };

  return (
    <Pagination className="flex justify-end mt-4 space-x-2">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => handlePagination(currentPage - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {renderPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              variant={currentPage === page ? "solid" : "outline"}
              onClick={() => handlePagination(page)}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            disabled={currentPage === totalPages}
            onClick={() => handlePagination(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
