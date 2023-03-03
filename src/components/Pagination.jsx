import React from 'react';

const Pagination = ({ paginationPage, setPaginationPage, pagCount }) => {
  const pgCount = Math.ceil(pagCount / 10); // todo active completed
  // const pgCount = 1;
  let pagsNumbers = [];

  const PaginSelectPlus = () => {
    if (paginationPage < pgCount) {
      setPaginationPage(paginationPage + 1);
    }
  };
  const PaginSelectMinus = () => {
    if (paginationPage > 1) {
      setPaginationPage(paginationPage - 1);
    }
  };

  const PaginSelectPage = (i) => {
    setPaginationPage(i);
  };

  const pagRender = () => {
    for (let i = 1; i <= pgCount; i++) {
      pagsNumbers.push(
        <div
          className={`pagination_numb ${paginationPage === i ? 'pagination_numb_added' : null}`}
          onClick={() => {
            PaginSelectPage(i);
          }}>
          {i}
        </div>,
      );
    }
    return pagsNumbers;
  };

  return (
    <div className="pagination">
      <div className="pagination_numb pagination_left" onClick={PaginSelectMinus}>
        {'<'}
      </div>
      {pagRender()}

      <div className="pagination_numb pagination_right" onClick={PaginSelectPlus}>
        {'>'}
      </div>
    </div>
  );
};

export default Pagination;
