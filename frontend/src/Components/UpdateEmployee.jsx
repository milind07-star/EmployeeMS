// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Container } from "react-bootstrap";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid"; // Correct import statement
// import TextField from "@mui/material/TextField";
// import Swal from "sweetalert2";
// const UpdateEmployee = () => {
//   const { id } = useParams();
//   const [employee, setEmployee] = useState({
//     name: "",
//     image: "",
//     email: "",
//     contact: "",
//     salary: "",
//     address: "",
//   });
//   const navigate = useNavigate();
//   useEffect(() => {
//     console.log(id);
//     axios
//       .get(`http://localhost:8081/employee/${id}`)
//       .then((result) => {
//         setEmployee({
//           ...employee,
//           name: result.data.Result[0].name,
//           email: result.data.Result[0].email,
//           contact: result.data.Result[0].contact,
//           salary: result.data.Result[0].salary,
//           address: result.data.Result[0].address,
//         });
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:8081/employee/${id}`, employee)
//       .then((result) => {
//         if (result.data.Status) {
//           Swal.fire({
//             title: "Success!",
//             text: "Employee details updated successfully!",
//             icon: "success",
//             confirmButtonText: "OK",
//           }).then(() => {
//             navigate("/dashboard/manages");
//           });
//         } else {
//           Swal.fire({
//             title: "Error!",
//             text: result.data.Error,
//             icon: "error",
//             confirmButtonText: "OK",
//           });
//         }
//       })
//       .catch((err) => {
//         Swal.fire({
//           title: "Error!",
//           text: "An error occurred while updating the employee details.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <Container
//         maxWidth="sm"
//         style={{
//           marginTop: "35px",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ padding: "16px", borderRadius: "8px" }}>
//           <form onSubmit={handleSubmit}>
//             <h4>UPDATE EMPLOYEE</h4>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="name"
//                   name="name"
//                   label="Name"
//                   variant="outlined"
//                   placeholder="Name"
//                   type="Name"
//                   value={employee.name}
//                   required
//                   onChange={(e) =>
//                     setEmployee({ ...employee, name: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <input
//                   id="file"
//                   name="image"
//                   type="file"
//                   onChange={(e) =>
//                     setEmployee({ ...employee, file: e.target.files[0] })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="email"
//                   name="email"
//                   label="Email"
//                   variant="outlined"
//                   placeholder="Email"
//                   type="email"
//                   required
//                   value={employee.email}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, email: e.target.value })
//                   }
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="contact"
//                   name="contact"
//                   label="Contact"
//                   variant="outlined"
//                   placeholder="Contact"
//                   type="Contact"
//                   required
//                   value={employee.contact}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, contact: e.target.value })
//                   }
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="salary1 "
//                   name="salary"
//                   label="Salary"
//                   variant="outlined"
//                   placeholder="Salary"
//                   type="Salary"
//                   required
//                   value={employee.salary}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, salary: e.target.value })
//                   }
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="address"
//                   name="address"
//                   label="Address"
//                   variant="outlined"
//                   placeholder="Address"
//                   type="address"
//                   required
//                   value={employee.address}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, address: e.target.value })
//                   }
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="success"
//                 >
//                   Update
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default UpdateEmployee;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"; // Correct import statement
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    image: "",
    email: "",
    contact: "",
    salary: "",
    address: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${id}`)
      .then((result) => {

        console.log("resulyt",result)

        console.log({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          contact: result.data.Result[0].contact,
          salary: result.data.Result[0].salary,
          address: result.data.Result[0].address,
          image: result.data.Result[0].image, // Include the image filename
        })
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          contact: result.data.Result[0].contact,
          salary: result.data.Result[0].salary,
          address: result.data.Result[0].address,
          image: result.data.Result[0].image, // Include the image filename
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee)

    // Use FormData to include both text fields and the image file
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("contact", employee.contact);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);

    // Append the image file only if it's selected
    if (employee.image) {
      formData.append("image", employee.image);
    }

    axios
      .put(`http://localhost:8081/employee/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.Status) {
          Swal.fire({
            title: "Success!",
            text: "Employee details updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/dashboard/manages");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: result.data.Error,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating the employee details.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(err);
      });
  };

  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          marginTop: "35px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "16px", borderRadius: "8px" }}>
          <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
            <h4>UPDATE EMPLOYEE</h4>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  placeholder="Name"
                  type="Name"
                  value={employee.name}
                  required
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setEmployee({ ...employee, image: e.target.files[0] })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Email"
                  type="email"
                  required
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contact"
                  name="contact"
                  label="Contact"
                  variant="outlined"
                  placeholder="Contact"
                  type="Contact"
                  required
                  value={employee.contact}
                  onChange={(e) =>
                    setEmployee({ ...employee, contact: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="salary1 "
                  name="salary"
                  label="Salary"
                  variant="outlined"
                  placeholder="Salary"
                  type="Salary"
                  required
                  value={employee.salary}
                  onChange={(e) =>
                    setEmployee({ ...employee, salary: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  variant="outlined"
                  placeholder="Address"
                  type="address"
                  required
                  value={employee.address}
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  style={{
                    background:
                      "linear-gradient(89deg, rgb(21, 74, 189) 0.1%, rgb(26, 138, 211) 51.5%, rgb(72, 177, 234) 100.2%)",
                  }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UpdateEmployee;
