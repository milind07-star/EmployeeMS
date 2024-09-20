import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Start from "./Components/Start/start";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home";
import Manages from "./Components/Manages";
import Category from "./Components/Category";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import UpdateEmployee from "./Components/UpdateEmployee";
import EmpDash from "./Components/EmpDash/EmpDash";
import GetLeave from "./Components/GetLeave";
import Approval from "./Components/Approval";
import ApprovalStatus from "./Components/ApprovalStatus";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/admin" element={<Login title="Admin" />} />
        <Route path="/employee" element={<Login title="Employee" register />} />
        <Route path="/register" element={<Register />} />

        {/* ---------------------admin routes---------------- */}

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="/dashboard/manages" element={<Manages />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/approval" element={<Approval />} />
          <Route path="/dashboard/add_category" element={<AddCategory />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />
          <Route
            path="/dashboard/update_employee/:id"
            element={<UpdateEmployee />}
          />
        </Route>

        {/* -------------------employee routes------------------------ */}

        <Route path="/empdash" element={<EmpDash />}>
          <Route path="/empdash/get_leave" element={<GetLeave />} />
          <Route path="/empdash/approval_status" element={<ApprovalStatus />} />
          <Route path="/empdash/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
