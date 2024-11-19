/* eslint-disable react/prop-types */


// Pagination for TODO list
export function Pagination({ setCurrentPage, itemsPerPage, rows, currentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(rows / itemsPerPage); i++) {
    pages.push(i);
  }

  if (pages.length > 1) {
    return (
      <div className="flex space-x-2 mt-4">
        {pages.map((page) => {
          let isActive = page === currentPage;
          return (
            <button
              value={page}
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`px-4 py-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
}
