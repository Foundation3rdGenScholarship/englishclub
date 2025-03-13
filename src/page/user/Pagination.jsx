import ReactPaginate from "react-paginate";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <ReactPaginate
      previousLabel={<AiOutlineLeft />}
      nextLabel={<AiOutlineRight />}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(data) => paginate(data.selected + 1)}
      containerClassName="flex items-center justify-center gap-2 my-6"
      pageClassName="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-primary-600 dark:hover:text-white transition"
      activeClassName="bg-primary-500 text-white hover:bg-primary-600 dark:hover:bg-primary-600 dark:bg-primary-500"
      previousClassName="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      nextClassName="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white transition"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};

export default Pagination;
