import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { NotebookPen, Trash2, ChevronsRight, ChevronsLeft } from "lucide-react";
import Swal from "sweetalert2";

const Manages = () => {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/employee")
      .then((result) => {
        console.log("API Response:", result.data); // Log API response
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
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
        axios
          .delete(`http://localhost:8081/employee/${id}`)
          .then((result) => {
            if (result.data.Status) {
              setEmployee((prevEmployee) => {
                const updatedEmployees = prevEmployee.filter(
                  (employee) => employee.id !== id
                );

                // Calculate the new index of the first item on the current page
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const updatedItems = updatedEmployees.slice(
                  indexOfFirstItem,
                  indexOfLastItem
                );

                // Adjust the page if the current page is empty
                if (updatedItems.length === 0 && currentPage > 1) {
                  setCurrentPage(currentPage - 1); // Go to the previous page
                }

                return updatedEmployees;
              });

              Swal.fire(
                "Deleted!",
                "The employee has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Error!", result.data.Error, "error");
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error!",
              "An error occurred while deleting the employee.",
              "error"
            );
          });
      }
    });
  };

  const filteredEmployees = employee.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (imageUrl) => {
    Swal.fire({
      imageUrl: imageUrl,
      imageAlt: "Employee Image",
      imageWidth: 450, // Set the desired width here
      imageHeight: 500,
    });
  };
  return (
    <div className="px-3 mt-3">
      <div className="d-flex justify-content-center">
        <h5>Employee List</h5>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success mt-3">
        Add Employee
      </Link>
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search..."
          className="search-input rounded-2"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "40%", // Width set to 40%
            height: "40px", // Height set to 40px
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
              <th>Image</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((c, index) => (
                <tr key={c.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>{c.name}</td>
                  <td>
                    <img
                      src={
                        c.image.includes("uploads")
                          ? `http://localhost:8081${c.image}` // If c.image already includes 'uploads'
                          : `http://localhost:8081/uploads/${c.image}`
                      }
                      alt="img"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                      onClick={() =>
                        handleImageClick(
                          c.image.includes("uploads")
                          ? `http://localhost:8081${c.image}` // If c.image already includes 'uploads'
                          : `http://localhost:8081/uploads/${c.image}`
                        )
                      }
                    />
                  </td>
                  <td>{c.email}</td>
                  <td>{c.contact}</td>
                  <td>{c.salary}</td>
                  <td style={{ textTransform: "capitalize" }}>{c.address}</td>
                  <td className="action">
                    <Link
                      to={`/dashboard/update_employee/${c.id}`}
                      className="action-button1"
                    >
                      <NotebookPen size={16} strokeWidth={2} className="icon" />
                    </Link>
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
                <td colSpan="1">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {filteredEmployees.length > itemsPerPage && (
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
                    <ChevronsLeft />
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
                    <ChevronsRight />
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

export default Manages;
