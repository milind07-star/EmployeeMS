// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [adminTotal, setAdminTotal] = useState("");
//   const [employeeTotal, setEmployeeTotal] = useState("");
//   const [salaryTotal, setSalaryTotal] = useState("");
//   const [category, setCategory] = useState([]);
//   const [technologyTotal, setTechnologyTotal] = useState("");

//   useEffect(() => {
//     adminCount();
//     employeeCount();
//     salaryCount();
//   }, []);

//   const adminCount = () => {
//     axios
//       .get("http://localhost:8081/adminCount")
//       .then((result) => {
//         if (result.data.Status) {
//           setAdminTotal(result.data.AdminCount);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching admin count:", err);
//       });
//   };

//   const employeeCount = () => {
//     axios
//       .get("http://localhost:8081/employeeCount")
//       .then((result) => {
//         if (result.data.Status) {
//           setEmployeeTotal(result.data.EmployeeCount);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching employee count:", err);
//       });
//   };

//   const salaryCount = () => {
//     axios
//       .get("http://localhost:8081/salary")
//       .then((result) => {
//         if (result.data.Status) {
//           setSalaryTotal(result.data.SumOfSalary);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching employee count:", err);
//       });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/category");
//         setCategory(response?.data?.Result ?? []); // Log the entire response data to the console
//         console.log(response?.data?.Result); // This will log the entire data to the console for debugging
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData(); // Call the function to execute it
//   }, []);

//   useEffect(() => {
//     const technologyCounts = {
//       reactNode: category.filter(
//         ({ technology }) => technology === "React & Node Developer"
//       ).length,
//       flutter: category.filter(
//         ({ technology }) => technology === "Flutter Developer"
//       ).length,
//       dotNet: category.filter(
//         ({ technology }) => technology === "Dot Net Developer"
//       ).length,
//       wordpress: category.filter(
//         ({ technology }) => technology === "Wordpress Developer"
//       ).length,
//     };

//     console.log("Technology Counts:", technologyCounts);
//     setTechnologyTotal(technologyCounts);
//     // You can set these counts in state variables if you need to display them in the UI
//   }, [category]);

//   return (
//     <div>
//       {/* <!-- First Row of Cards --> */}
//       <div className="p-3 d-flex justify-content-around mt-3">
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25  rounded-2"
//           id="admin"
//           style={{ height: "150px" }}
//         >
//           <div className="text-center pb-1">
//             <h3>ADMIN</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total:</h5>
//             <h5>{adminTotal}</h5>
//           </div>
//         </div>
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25  rounded-2"
//           id="employee"
//         >
//           <div className="text-center pb-1">
//             <h3>EMPLOYEE</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total :</h5>
//             <h5>{employeeTotal}</h5>
//           </div>
//         </div>
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25  rounded-2"
//           id="salary"
//         >
//           <div className="text-center pb-1">
//             <h3>SALARY</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total:</h5>
//             <h5>$ {salaryTotal}</h5>
//           </div>
//         </div>
//       </div>

//       {/* <!-- Second Row of Cards --> */}
//       <div className="p-3 d-flex justify-content-around mt-3">
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25 rounded-2"
//           id="admin"
//           style={{ height: "150px" }}
//         >
//           <div className="text-center">
//             <h3>React & Node</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total:</h5>
//             <h5>{technologyTotal.reactNode}</h5>
//           </div>
//         </div>
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25  rounded-2"
//           id="employee"
//         >
//           <div className="text-center">
//             <h3>Flutter</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total :</h5>
//             <h5>{technologyTotal.flutter}</h5>
//           </div>
//         </div>
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25  rounded-2"
//           id="salary"
//         >
//           <div className="text-center">
//             <h3>Dot Net</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total:</h5>
//             <h5>{technologyTotal.dotNet}</h5>
//           </div>
//         </div>
//       </div>

//       <div className="p-3 d-flex justify-content-center mt-3">
//         <div
//           className="px-3 pt-2 pb-3 border shadow-lg w-25  rounded-2"
//           id="employee"
//         >
//           <div className="text-center pb-1">
//             <h3>WordPress</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-around">
//             <h5>Total :</h5>
//             <h5>{technologyTotal.wordpress}</h5>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaUsers,
  FaDollarSign,
  FaReact,
  FaMobileAlt,
  FaWordpress,
  FaCode,
} from "react-icons/fa";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState("");
  const [employeeTotal, setEmployeeTotal] = useState("");
  const [salaryTotal, setSalaryTotal] = useState("");
  const [category, setCategory] = useState([]);
  const [technologyTotal, setTechnologyTotal] = useState("");

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
  }, []);

  const adminCount = () => {
    axios
      .get("http://localhost:8081/adminCount")
      .then((result) => {
        if (result.data.Status) {
          setAdminTotal(result.data.AdminCount);
        }
      })
      .catch((err) => {
        console.error("Error fetching admin count:", err);
      });
  };

  const employeeCount = () => {
    axios
      .get("http://localhost:8081/employeeCount")
      .then((result) => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.EmployeeCount);
        }
      })
      .catch((err) => {
        console.error("Error fetching employee count:", err);
      });
  };

  const salaryCount = () => {
    axios
      .get("http://localhost:8081/salary")
      .then((result) => {
        if (result.data.Status) {
          setSalaryTotal(result.data.SumOfSalary);
        }
      })
      .catch((err) => {
        console.error("Error fetching salary total:", err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/category");
        setCategory(response?.data?.result ?? []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const technologyCounts = {
      reactNode: category.filter(
        ({ technology }) => technology === "React & Node Developer"
      ).length,
      flutter: category.filter(
        ({ technology }) => technology === "Flutter Developer"
      ).length,
      dotNet: category.filter(
        ({ technology }) => technology === "Dot Net Developer"
      ).length,
      wordpress: category.filter(
        ({ technology }) => technology === "Wordpress Developer"
      ).length,
    };

    setTechnologyTotal(technologyCounts);
  }, [category]);

  return (
    <div>
      <style>
        `
        {`
          .container {
            max-width: 1200px;
            margin: auto;
            padding: 2rem;
            background-color: #f0f0f5;
            border-radius: 12px;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: space-between;
          }
          .row.first-row {
            margin-bottom: 20px; /* Space between two rows */
            margin-right: 10px;
            margin-top: 15px;
          }
          .card {
            flex: 1 1 calc(33.333% - 15px);
            background-color: #e0f7fa;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            max-height: 170px;
            max-width: 250px;
            margin: 20px auto;
           
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
          .card-body {
            padding: 1rem;
            text-align: center;
          }
          .card-title {
            font-weight: 600;
            margin-top: 0.5rem;
            font-size: 1rem;
            color: #333;
          }
          .icon {
            font-size: 2.5rem;
            color: #007bff;
            margin-bottom: 0.5rem;
          }
          .card h6 {
            font-size: 1rem;
            font-weight: 500;
            margin-top: 0.5rem;
            color: #333;
          }
          hr {
            border: none;
            border-top: 1.5px solid #007bff;
            width: 60%;
            margin: 0.5rem auto;
          }

          /* Responsive Styling */
          @media (max-width: 992px) {
            .card {
              flex: 1 1 calc(50% - 15px);
            }
          }
          @media (max-width: 768px) {
            .card {
              flex: 1 1 100%;
            }
          }

          /* Remove scrollbars */
          body, html {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
        `}
      </style>

      <div className="container">
        {/* First Row: Admin, Employee, Salary */}
        <div className="row first-row">
          <div
            className="card"
            style={{ position: "relative", height: "100px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#1976D2 ",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                  
                }}
              >
                <FaUserTie className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">ADMIN</h5>
              <hr />
              <h6>Total: {adminTotal}</h6>
            </div>
          </div>

          <div
            className="card"
            style={{ position: "relative", height: "100px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#8BC34A",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FaUsers className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">EMPLOYEE</h5>
              <hr />
              <h6>Total: {employeeTotal}</h6>
            </div>
          </div>

          <div
            className="card"
            style={{ position: "relative", height: "100px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#FFA500 ",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FaDollarSign className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">SALARY</h5>
              <hr />
              <h6>Total: $ {salaryTotal}</h6>
            </div>
          </div>
        </div>

        {/* Second Row: React, WordPress, Flutter, Dot Net */}
        <div className="row first-row">
          <div
            className="card"
            style={{ position: "relative", height: "100px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#FF1493",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FaReact className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">React & Node</h5>
              <hr />
              <h6>Total: {technologyTotal.reactNode}</h6>
            </div>
          </div>

          <div
            className="card"
            style={{ position: "relative", height: "100px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#000000",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FaWordpress className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">WordPress</h5>
              <hr />
              <h6>Total: {technologyTotal.wordpress}</h6>
            </div>
          </div>

          <div
            className="card"
            style={{ position: "relative", height: "100px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#42A5F5",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FaMobileAlt className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">Flutter</h5>
              <hr />
              <h6>Total: {technologyTotal.flutter}</h6>
            </div>
          </div>

          <div
            className="card"
            style={{ position: "relative", height: "100px", width: "150px" }}
          >
            <div className="card-body">
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  backgroundColor: "#8661C5",
                  width: "50px",

                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  left: "-15px",
                  borderRadius: "7px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <FaCode className="icon" size={30} color="#ffff" />
              </div>
              <h5 className="card-title">Dot Net</h5>
              <hr />
              <h6>Total: {technologyTotal.dotNet}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
