// import { useEffect, useState } from 'react';
// import { Book } from './types/Book';

// function BookList({ selectedCategories }: { selectedCategories: string[] }) {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [pageSize, setPageSize] = useState<number>(10);
//   const [pageNum, setPageNum] = useState<number>(1);
//   const [totalItems, setTotalItems] = useState<number>(0);
//   const [totalPages, setTotalPages] = useState<number>(0);
//   const [sortOrder, setSortOrder] = useState<string>('asc');

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const categoryParams = selectedCategories
//         .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
//         .join('&');
//       const response = await fetch(
//         `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
//       );
//       const data = await response.json();
//       setBooks(data.books);
//       setTotalItems(data.totalNumBooks);
//       setTotalPages(Math.ceil(totalItems / pageSize));
//     };
//     fetchBooks();
//   }, [pageSize, pageNum, sortOrder, selectedCategories]);

//   return (
//     <div className="container mt-4">
// {/* Sort and Results per Page */}
// <div className="row mb-3">
//   <div className="col-md-6">
//     <label className="form-label">
//       Sort by Name:
//       <select
//         className="form-select"
//         value={sortOrder}
//         onChange={(e) => setSortOrder(e.target.value)}
//       >
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//       </select>
//     </label>
//   </div>
// <div className="col-md-6 text-end">
//   <label className="form-label">
//     Results per page:
//     <select
//       className="form-select"
//       value={pageSize}
//       onChange={(b) => {
//         setPageSize(Number(b.target.value));
//         setPageNum(1);
//       }}
//     >
//       <option value="5">5</option>
//       <option value="10">10</option>
//       <option value="20">20</option>
//     </select>
//   </label>
// </div>
//       </div>

//       {/* Book Cards */}
//       {books.map((b) => (
//         <div id="bookCard" className="card" key={b.bookID}>
//           <h3 className="card-title">{b.title}</h3>
//           <div className="card-body">
//             <ul className="list-unstyled ">
//               <li>
//                 <strong>Book Author: </strong>
//                 {b.author}
//               </li>
//               <li>
//                 <strong>Publisher: </strong>
//                 {b.publisher}
//               </li>
//               <li>
//                 <strong>ISBN: </strong>
//                 {b.isbn}
//               </li>
//               <li>
//                 <strong>Classification: </strong>
//                 {b.classification}
//               </li>
//               <li>
//                 <strong>Category: </strong>
//                 {b.category}
//               </li>
//               <li>
//                 <strong>Page Count: </strong>
//                 {b.pageCount}
//               </li>
//               <li>
//                 <strong>Price: </strong>
//                 {b.price}
//               </li>
//             </ul>
//           </div>
//         </div>
//       ))}

//       {/* Pagination */}
//       <div className="row mt-3">
//         <div className="col text-center">
//           <button
//             className="btn btn-primary me-2"
//             disabled={pageNum === 1}
//             onClick={() => setPageNum(pageNum - 1)}
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index + 1}
//               className={`btn ${
//                 pageNum === index + 1 ? 'btn-secondary' : 'btn-outline-primary'
//               } me-1`}
//               onClick={() => setPageNum(index + 1)}
//               disabled={pageNum === index + 1}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="btn btn-primary ms-2"
//             disabled={pageNum === totalPages}
//             onClick={() => setPageNum(pageNum + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookList;

import { useEffect, useState } from 'react';
import { Book } from './types/Book';
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <>
      <label className="form-label">
        Sort by Name:
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <div className="col-md-6 text-end">
        <label className="form-label">
          Results per page:
          <select
            className="form-select"
            value={pageSize}
            onChange={(b) => {
              setPageSize(Number(b.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      {books.map((b) => (
        <div
          id="bookCard"
          className="card shadow-sm hover-scale"
          key={b.bookID}
        >
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Book Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                <span className="badge bg-info">${b.price}</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="row mt-3">
        <div className="col text-center">
          <button
            className="btn btn-primary me-2"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${
                pageNum === index + 1 ? 'btn-secondary' : 'btn-outline-primary'
              } me-1`}
              onClick={() => setPageNum(index + 1)}
              disabled={pageNum === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-primary ms-2"
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(b) => {
            setPageSize(Number(b.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
