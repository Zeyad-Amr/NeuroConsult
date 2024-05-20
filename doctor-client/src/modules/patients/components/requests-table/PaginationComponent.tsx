import React, { useState } from "react";
interface PaginationProps {
  items: any;
  itemsPerPage?: number;
}

const PaginationComponent = ({ items, itemsPerPage = 5 }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items?.length / itemsPerPage);

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const currentItems = items?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <ul>
        {currentItems.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleChangePage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;