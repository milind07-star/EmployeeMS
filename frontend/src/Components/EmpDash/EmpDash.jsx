import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./EmpDash.css";
import axios from "axios";
import Swal from "sweetalert2";

const EmpDash = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("http://localhost:8081/employee_logout")
          .then((response) => {
            if (response.data.Status === "Success") {
              localStorage.removeItem("valid");
              Swal.fire(
                "Logged out!",
                "You have been logged out successfully.",
                "success"
              ).then(() => {
                navigate("/"); // Redirect to home page or login page
              });
            } else {
              Swal.fire(
                "Error!",
                "Something went wrong. Please try again.",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "Something went wrong. Please try again.",
              "error"
            );
            console.error("Logout failed:", error);
          });
      }
    });
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-12 col-md-3 col-lg-2" id="content">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to=""
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 fw-bolder d-none d-sm-inline"></span>
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="w-100">
                  <Link to="" className="nav-link text-white px-0 align-middle">
                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/empdash/approval_status"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i class="fs-4 bi bi-person-fill-check ms-2 "></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Approval Status
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/empdash/get_leave"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i class="bi bi-calendar-check ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Get Leave</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/empdash/profile"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-person ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Profile</span>
                  </Link>
                </li>
                <li className="w-100" onClick={handleLogout}>
                  <Link className="nav-link px-0 align-middle text-white border-0 bg-transparent">
                    <i className="fs-4 bi-power ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 p-0 m-0 header">
            <div className="p-2 d-flex justify-content-center shadow">
              <h3>StaffStream</h3>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDash;
