// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { Trash2 } from "lucide-react";
// import Swal from "sweetalert2"; // Ensure Swal is imported

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(7); // Number of items per page

//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/category")
//       .then((result) => {
//         if (result.data.Status) {
//           setCategories(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleDelete = (id) => {
//     // Show a confirmation dialog
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // If confirmed, proceed with deletion
//         axios
//           .delete(`http://localhost:8081/category/${id}`) // Corrected URL
//           .then((result) => {
//             if (result.data.Status) {
//               // Reset to the first page
//               // window.location.reload();
//               setCategories((prevCategories) =>
//                 prevCategories.filter((category) => category.id !== id)
//               );

//               // Calculate the new index of the first item on the current page
//               const indexOfLastItem = currentPage * itemsPerPage;
//               const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//               const updatedItems = categories.slice(indexOfFirstItem, indexOfLastItem);

//               // Adjust the page if the current page is empty
//               if (updatedItems.length === 0 && currentPage > 1) {
//                 setCurrentPage(currentPage - 1); // Go to the previous page
//               }

//               Swal.fire("Deleted!", "The category has been deleted.", "success");
//             } else {
//               Swal.fire("Error!", result.data.Error, "error");
//             }
//           })
//           .catch((err) => {
//             Swal.fire(
//               "Error!",
//               "An error occurred while deleting the category.",
//               "error"
//             );
//           });
//       }
//     });
//   };

//   // Calculate the index of the first and last item on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

//   // Calculate total pages
//   const totalPages = Math.ceil(categories.length / itemsPerPage);

//   // Handler to go to a specific page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="px-3 mt-3">
//       <div className="d-flex justify-content-center">
//         <h5>Category List</h5>
//       </div>
//       <Link to="/dashboard/add_category" className="btn btn-primary">
//         Add Category
//       </Link>
//       <Outlet />

//       <div className="mt-3">
//         <table className="table border shadow table-hover">
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Technology</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.length > 0 ? (
//               currentItems.map((c, index) => (
//                 <tr key={index}>
//                   <td>{indexOfFirstItem + index + 1}</td>
//                   <td>{c.name}</td>
//                   <td>{c.category}</td>
//                   <td>{c.technology}</td>
//                   <td>
//                     <button
//                       className="action-button2"
//                       onClick={() => handleDelete(c.id)}
//                     >
//                       <Trash2 size={16} strokeWidth={2} className="icon" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No categories found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {categories.length > itemsPerPage && (
//           <div className="d-flex justify-content-center">
//             <nav>
//               <ul className="pagination">
//                 <li
//                   className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   >
//                     Previous
//                   </button>
//                 </li>
//                 {[...Array(totalPages).keys()].map((number) => (
//                   <li
//                     key={number + 1}
//                     className={`page-item ${
//                       currentPage === number + 1 ? "active" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(number + 1)}
//                     >
//                       {number + 1}
//                     </button>
//                   </li>
//                 ))}
//                 <li
//                   className={`page-item ${
//                     currentPage === totalPages ? "disabled" : ""
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   >
//                     Next
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Category;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2"; // Ensure Swal is imported

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    axios
      .get(`http://localhost:8081/category`)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.result);
          setCategories(result.data?.result ?? []);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Show a confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with deletion
        axios
          .delete(`http://localhost:8081/category/${id}`)
          .then((result) => {
            if (result.data.Status) {
              setCategories((prevCategories) => {
                const updatedCategories = prevCategories.filter(
                  (category) => category.id !== id
                );

                // Calculate the new index of the first item on the current page
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const updatedItems = updatedCategories.slice(
                  indexOfFirstItem,
                  indexOfLastItem
                );

                // Adjust the page if the current page is empty
                if (updatedItems.length === 0 && currentPage > 1) {
                  setCurrentPage(currentPage - 1); // Go to the previous page
                }

                return updatedCategories;
              });

              Swal.fire(
                "Deleted!",
                "The category has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Error!", result.data.Error, "error");
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error!",
              "An error occurred while deleting the category.",
              "error"
            );
          });
      }
    });
  };
  // Filter categories based on the search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.technology.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Handler to go to a specific page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-3 mt-3">
      <div className="d-flex justify-content-center">
        <h5>Category List</h5>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-primary">
        Add Category
      </Link>

      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search..."
          className="search-input rounded-2"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "40%", // Width set to 40%
            height: "40px", // Height set to 35px
            marginRight: "15px", // Right margin
            padding: "5px 10px", // Padding
            border: "1px solid #ced4da", // Border styling
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
          }}
        />
      </div>
      <Outlet />

      <div className="mt-3">
        <table className="table border shadow table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Technology</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((c, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>{c.name}</td>
                  <td>{c.category}</td>
                  <td>{c.technology}</td>
                  <td>
                    <button
                      className="action-button2"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash2 size={16} strokeWidth={2} className="icon" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {categories.length > itemsPerPage && (
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((number) => (
                  <li
                    key={number + 1}
                    className={`page-item ${
                      currentPage === number + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
