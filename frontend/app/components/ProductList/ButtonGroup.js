// components/ButtonGroup.js
import React from 'react';

const ButtonGroup = ({ currentPage, setCurrentPage, totalPages }) => {
  // Jika totalPages <= 1, kita akan tetap menampilkan tombol untuk halaman 1
  const buttons = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center my-4">
      <div className="btn-group" role="group" aria-label="Button group">
        {buttons.map((page) => (
          <button
            key={page}
            type="button"
            className={`btn ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} mx-2 px-4 py-2 rounded`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
