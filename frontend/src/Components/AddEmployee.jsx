// import React, { useState } from "react";
// import { TextField, Button, Container, Grid } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// const AddEmployee = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [salary, setSalary] = useState("");
//   const [address, setAddress] = useState("");
//   const [image, setImage] = useState("");

//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result.split(",")[1]); // Get the base64 string without metadata
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(name,image, email, contact, salary, address);

//     try {
//       const response = await axios.post("http://localhost:8081/add_employee", {
//         name,
//         email,
//         contact,
//         salary,
//         address,
//         image,
//       });
//       console.log(response);

//       if (response.status === 200) {
//         Swal.fire({
//           title: "Success",
//           text: "Employee added successfully!",
//           icon: "success",
//         });

//         navigate("/dashboard/manages");

//         setName("");
//         setEmail("");
//         setContact("");
//         setSalary("");
//         setAddress("");
//         setImage("");
//       } else {
//         Swal.fire({
//           title: "Failed",
//           text:
//             response.data.status || "Failed to add category. Please try again.",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       // Log the error for debugging
//       console.error(error);

//       Swal.fire({
//         title: "Error",
//         text:
//           error.response?.data?.message ||
//           "An error occurred. Please try again.",
//         icon: "error",
//       });
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       style={{
//         marginTop: "35px",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div style={{ padding: "16px", borderRadius: "8px" }}>
//         <form onSubmit={handleSubmit}>
//           <h4>ADD EMPLOYEE</h4>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="name"
//                 name="name"
//                 label="Name"
//                 variant="outlined"
//                 placeholder="Name"
//                 type="Name"
//                 value={name}
//                 required
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="image"
//                 name="image"
//                 type="file"
//                 onChange={handleImageChange} // Convert image to base64
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="email"
//                 name="email"
//                 label="Email"
//                 variant="outlined"
//                 placeholder="Email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="contact"
//                 name="contact"
//                 label="Contact"
//                 variant="outlined"
//                 placeholder="Contact"
//                 type="Contact"
//                 required
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="salary1"
//                 name="salary"
//                 label="Salary"
//                 variant="outlined"
//                 placeholder="Salary"
//                 type="Salary"
//                 required
//                 value={salary}
//                 onChange={(e) => setSalary(e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="address"
//                 name="address"
//                 label="Address"
//                 variant="outlined"
//                 placeholder="Address"
//                 type="address"
//                 required
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="success"
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </Container>
//   );
// };

// export default AddEmployee;

import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null); // Store the image file
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview to the base64 URL
        // Optionally, you can show the preview immediately here if needed
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleShowPreview = () => {
    setShowPreview(!showPreview); // Toggle the preview visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData and append all form fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("salary", salary);
    formData.append("address", address);
    formData.append("image", image);
  
    try {
      // Send POST request to the API
      const response = await axios.post("http://localhost:8081/add_employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });
  
      // Check if the response is successful
      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: "Employee added successfully!",
          icon: "success",
        });
  
        // Redirect to the dashboard
        navigate("/dashboard/manages");
  
        // Clear form fields
        setName("");
        setEmail("");
        setContact("");
        setSalary("");
        setAddress("");
        setImage(null);
        setImagePreview(null);
      } else {
        // Handle unsuccessful response
        Swal.fire({
          title: "Failed",
          text: response.data.error || "Failed to add employee. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error while adding employee:", error);
  
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };
  

  return (
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
          <h4>ADD EMPLOYEE</h4>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                placeholder="Name"
                type="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange} // Handle image file input
              />
            </Grid>
            {showPreview && imagePreview && (
              <Grid item xs={12}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleShowPreview} // Correctly call the function
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="contact"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="salary1"
                name="salary"
                label="Salary"
                variant="outlined"
                placeholder="Salary"
                type="salary"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default AddEmployee;
