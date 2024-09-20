// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Eye, ChevronsRight, ChevronsLeft } from "lucide-react";
// import Swal from "sweetalert2";

// const Approval = () => {
//   const [approval, setApproval] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6); // Number of items per page
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query

//   const handleViewClick = (id) => {
//     // Find the selected user by ID
//     const selectedUser = approval.find((user) => user.id === id);

//     if (selectedUser) {
//       // Function to capitalize the first letter of each word
//       const capitalize = (str) =>
//         str
//           .toLowerCase()
//           .split(" ")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ");

//       // Capitalize name and leave type
//       const capitalizedName = capitalize(selectedUser.name);
//       const capitalizedLeaveType = capitalize(selectedUser.typeleave);
//       const capitalizedReason = capitalize(selectedUser.reason);

//       Swal.fire({
//         title: "User Details",
//         html: `
//           <p><strong>Name:</strong> ${capitalizedName}</p>
//           <p><strong>Leave Type:</strong> ${capitalizedLeaveType}</p>
//           <p><strong>Email:</strong> ${selectedUser.email}</p>
//           <p><strong>Start Date:</strong> ${selectedUser.sdate}</p>
//           <p><strong>End Date:</strong> ${selectedUser.edate}</p>
//           <p><strong>Reason:</strong> ${capitalizedReason}</p>
//         `,
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonText: "Accept",
//         cancelButtonText: "Reject",
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//       }).then((result) => {
//         const status = result.isConfirmed ? 'Accepted' : 'Rejected';
//         axios.post('http://localhost:8081/update_leave_status', {
//           id: selectedUser.id,
//           status: status
//         })
//         .then((response) => {
//           if (response.data.Status) {
//             Swal.fire(
//               result.isConfirmed ? "Accepted!" : "Rejected!",
//               `The leave request has been ${status.toLowerCase()}.`,
//               result.isConfirmed ? "success" : "error"
//             );
//             // Update local state or refetch data here if needed
//             console.log(status, selectedUser);
//           } else {
//             Swal.fire("Error!", response.data.Error, "error");
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           Swal.fire("Error!", "There was an issue updating the leave status.", "error");
//         });
//       });
//     } else {
//       Swal.fire("Error!", "User not found.", "error");
//     }
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/leave")
//       .then((result) => {
//         console.log("API response", result.data);
//         if (result.data.Status) {
//           setApproval(result.data.Data);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((error) => console.log(error));
//   }, [approval]);

//     // Filter the approval list based on search query
//     const filteredApproval = approval.filter((a) => {
//       const query = searchQuery.toLowerCase();
//       return (
//         a.name.toLowerCase().includes(query) ||
//         a.typeleave.toLowerCase().includes(query) ||
//         a.email.toLowerCase().includes(query)
//       );
//     });

//   // Pagination logic
//   const totalItems = filteredApproval.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredApproval.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       <div className="px-3 mt-3">
//         <div className="d-flex justify-content-center">
//           <h5>Approval List</h5>
//         </div>
//         <div className="d-flex justify-content-end">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="search-input rounded-2"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{
//               width: "40%", // Width set to 40%
//               height: "40px", // Height set to 40px
//               marginRight: "15px", // Right margin
//               padding: "5px 10px", // Padding
//               border: "1px solid #ced4da", // Border styling
//               boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
//             }}
//           />
//         </div>
//         <Outlet />

//         <div className="mt-3">
//           <table className="table border shadow table-hover">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Name</th>
//                 <th>Leave Type</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map((a, index) => (
//                   <tr key={a.id}>
//                     {" "}
//                     {/* Use unique id for key */}
//                     <td>{startIndex + index + 1}</td>
//                     <td style={{ textTransform: "capitalize" }}>{a.name}</td>
//                     <td style={{ textTransform: "capitalize" }}>
//                       {a.typeleave}
//                     </td>
//                     <td>{a.email}</td>
//                     <td>{a.status}</td>
//                     <td>{a.sdate}</td>
//                     <td>{a.edate}</td>
//                     <td>
//                       <button
//                         className="action-button3"
//                         onClick={() => handleViewClick(a.id)}
//                       >
//                         <Eye size={16} strokeWidth={2} className="icon" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" style={{ textAlign: "center" }}>
//                     No approvals found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-center">
//               <nav>
//                 <ul className="pagination">
//                   <li
//                     className={`page-item ${
//                       currentPage === 1 ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage - 1)}
//                       disabled={currentPage === 1}
//                     >
//                       <ChevronsLeft />
//                     </button>
//                   </li>
//                   {[...Array(totalPages).keys()].map((number) => (
//                     <li
//                       key={number + 1}
//                       className={`page-item ${
//                         currentPage === number + 1 ? "active" : ""
//                       }`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => paginate(number + 1)}
//                       >
//                         {number + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item ${
//                       currentPage === totalPages ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                     >
//                       <ChevronsRight />
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Approval;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Eye } from "lucide-react";
import Swal from "sweetalert2";

const Approval = () => {
  const [approval, setApproval] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  // const handleViewClick = (id) => {
  //   const selectedUser = approval.find((user) => user.id === id);

  //   if (selectedUser) {
  //     const capitalize = (str) =>
  //       str
  //         .toLowerCase()
  //         .split(" ")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ");

  //     const capitalizedName = capitalize(selectedUser.name);
  //     const capitalizedTypeleave = capitalize(selectedUser.typeleave);
  //     const capitalizedReason = capitalize(selectedUser.reason);

  //     Swal.fire({
  //       title: "User Details",
  //       html: `
  //         <p><strong>Name:</strong> ${capitalizedName}</p>
  //         <p><strong>Leave Type:</strong> ${capitalizedTypeleave}</p>
  //         <p><strong>Email:</strong> ${selectedUser.email}</p>
  //         <p><strong>Start Date:</strong> ${selectedUser.sdate}</p>
  //         <p><strong>End Date:</strong> ${selectedUser.edate}</p>
  //         <p><strong>Reason:</strong> ${capitalizedReason}</p>
  //       `,
  //       icon: "info",
  //       showCancelButton: true,
  //       confirmButtonText: "Accept",
  //       cancelButtonText: "Reject",
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //     }).then((result) => {
  //       const status = result.isConfirmed ? 'Accepted' : 'Rejected';

  //       // Update the leave status
  //       axios.post('http://localhost:8081/update_leave_status', {
  //         id: selectedUser.id,
  //         status: status
  //       })
  //       .then((response) => {
  //         if (response.data.Status) {
  //           Swal.fire(
  //             result.isConfirmed ? "Accepted!" : "Rejected!",
  //             `The leave request has been ${status.toLowerCase()}.`,
  //             result.isConfirmed ? "success" : "error"
  //           );

  //           // Send email after leave status is updated
  //           axios.post('http://localhost:8081/send_email', {
                     
  //             name: capitalizedName,
  //             typeleave: capitalizedTypeleave, // Leave type
  //             email: selectedUser.email,           // Capitalized name
  //             status: status,                  // Accepted/Rejected
  //             sdate: selectedUser.sdate,       // Start date
  //             edate: selectedUser.edate,       // End date
  //             reason: capitalizedReason        // Reason for the leave
  //           })
  //           .then((emailResponse) => {
  //             if (emailResponse.data.Status) {
  //               Swal.fire("Email Sent!", "An email has been sent to the user.", "success");
  //             } else {
  //               Swal.fire("Email Error!", "The email could not be sent.", "error");
  //             }
  //           })
  //           .catch((emailError) => {
  //             console.error(emailError);
  //             Swal.fire("Email Error!", "There was an issue sending the email.", "error");
  //           });

  //         } else {
  //           Swal.fire("Error!", response.data.Error, "error");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         Swal.fire("Error!", "There was an issue updating the leave status.", "error");
  //       });
  //     });
  //   } else {
  //     Swal.fire("Error!", "User not found.", "error");
  //   }
  // };
 
  const handleViewClick = (id) => {
    const selectedUser = approval.find((user) => user.id === id);
  
    if (selectedUser) {
      const capitalize = (str) =>
        str
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  
      const capitalizedName = capitalize(selectedUser.name);
      const capitalizedTypeleave = capitalize(selectedUser.typeleave);
      const capitalizedReason = capitalize(selectedUser.reason);
  
      Swal.fire({
        title: "User Details",
        html: `
          <p><strong>Name:</strong> ${capitalizedName}</p>
          <p><strong>Leave Type:</strong> ${capitalizedTypeleave}</p>
          <p><strong>Email:</strong> ${selectedUser.email}</p>
          <p><strong>Start Date:</strong> ${selectedUser.sdate}</p>
          <p><strong>End Date:</strong> ${selectedUser.edate}</p>
          <p><strong>Reason:</strong> ${capitalizedReason}</p>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Accept",
        cancelButtonText: "Reject",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        const status = result.isConfirmed ? 'Accepted' : 'Rejected';
  
        // Update the leave status
        axios.post('http://localhost:8081/update_leave_status', {
          id: selectedUser.id,
          status: status
        })
        .then((response) => {
          if (response.data.Status) {
            Swal.fire({
              title: result.isConfirmed ? "Accepted!" : "Rejected!",
              text: `The leave request has been ${status.toLowerCase()}.`,
              icon: result.isConfirmed ? "success" : "error",
              showCancelButton: true,
              confirmButtonText: "Send Email",
              cancelButtonText: "Cancel",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
            }).then((emailResult) => {
              if (emailResult.isConfirmed) {
                // Send email after leave status is updated
                axios.post('http://localhost:8081/send_email', {
                  name: capitalizedName,
                  typeleave: capitalizedTypeleave, // Leave type
                  email: selectedUser.email,       // Capitalized name
                  status: status,                  // Accepted/Rejected
                  sdate: selectedUser.sdate,       // Start date
                  edate: selectedUser.edate,       // End date
                  reason: capitalizedReason        // Reason for the leave
                })
                .then((emailResponse) => {
                  if (emailResponse.data.Status) {
                    Swal.fire("Email Sent!", "An email has been sent to the user.", "success");
                  } else {
                    Swal.fire("Email Error!", "The email could not be sent.", "error");
                  }
                })
                .catch((emailError) => {
                  console.error(emailError);
                  Swal.fire("Email Error!", "There was an issue sending the email.", "error");
                });
              }
            });
  
          } else {
            Swal.fire("Error!", response.data.Error, "error");
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("Error!", "There was an issue updating the leave status.", "error");
        });
      });
    } else {
      Swal.fire("Error!", "User not found.", "error");
    }
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:8081/leave")
      .then((result) => {
        console.log("API response", result.data);
        if (result.data.Status) {
          setApproval(result.data.Data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => console.log(error));
  }, [approval]);

  const filteredApproval = approval.filter((a) => {
    const query = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(query) ||
      a.typeleave.toLowerCase().includes(query) ||
      a.email.toLowerCase().includes(query)
    );
  });

  const totalItems = filteredApproval.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredApproval.slice(startIndex, startIndex + itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="px-3 mt-3">
        <div className="d-flex justify-content-center">
          <h5>Approval List</h5>
        </div>
        <div className="d-flex justify-content-end">
          <input
            type="text"
            placeholder="Search..."
            className="search-input rounded-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "40%",
              height: "40px",
              marginRight: "15px",
              padding: "5px 10px",
              border: "1px solid #ced4da",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
                <th>Leave Type</th>
                <th>Email</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((a, index) => (
                  <tr key={a.id}>
                    <td>{startIndex + index + 1}</td>
                    <td style={{ textTransform: "capitalize" }}>{a.name}</td>
                    <td style={{ textTransform: "capitalize" }}>{a.typeleave}</td>
                    <td>{a.email}</td>
                    <td>{a.status}</td>
                    <td>{a.sdate}</td>
                    <td>{a.edate}</td>
                    <td>
                      <button className="action-button3" onClick={() => handleViewClick(a.id)}>
                        <Eye size={16} strokeWidth={2} className="icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No approvals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                      &lt;
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                      &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Approval;
