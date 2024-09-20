import React from "react";
import "./start.css";
import { Link } from "react-router-dom";
import { FaUserTie, FaUsers } from "react-icons/fa";

const Start = () => {
  return (
    <div className="start">
      <div className="start-content">
        <h2>StaffStream</h2>
        <div className="link">
          <Link
            to={"/admin"}
            className="admin"
            style={{ position: "relative" }}
          >
            <div className="icon-start">
              <FaUserTie color="#18a9d6" size={22} />
            </div>
            Admin
          </Link>
          <Link
            to={"/employee"}
            className="employee"
            style={{ position: "relative" }}
          >
            <div className="icon-start">
              <FaUsers color="#18a9d6" size={25} />
            </div>
            Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
