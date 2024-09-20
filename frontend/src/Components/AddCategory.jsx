// import axios from "axios";
// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddCategory = () => {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const navigate=useNavigate();
//     axios.post("http://localhost:8081/add_category", {
//       name,
//       category,
//       phone,
//       email,
//     });
//   //    .then(result=>console.log(result.data)
//   //     .catch(err=>console.log(err))
//   // )
//   if (result.data.Status)
//      navigate('/dashboard/category')
//   }
//   };

//   return (
//     <div className="d-flex justify-content-center align-item-center mt-5">
//       <div className="p-3 rounded w-35">
//         {/* <h2>Add Category</h2> */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="category">
//               <strong>Add Name</strong>
//             </label>
//             <input
//               type="text"
//               name="category"
//               placeholder="Enter name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="form-control rounded-1 w-100"
//             />
//             <label htmlFor="category">
//               <strong>Add Category</strong>
//             </label>
//             <input
//               type="text"
//               name="category"
//               placeholder="Enter category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="form-control rounded-1 w-100"
//             />
//             <label htmlFor="category">
//               <strong>Add Phone</strong>
//             </label>
//             <input
//               type="text"
//               name="category"
//               placeholder="Enter phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="form-control rounded-1 w-100"
//             />
//             <label htmlFor="category">
//               <strong>Add Email</strong>
//             </label>
//             <input
//               type="text"
//               name="category"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control rounded-1 w-100"
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-success w-100 rounded-1 mb-2"
//           >
//             Add
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [technology, setTechnology] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/add_category", {
        name,
        category,
        technology,
      });

      // Log the response for debugging
      console.log(response);

      // Ensure that response.data.Status and response.status are being checked correctly
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Category added successfully!",
          icon: "success",
        });
        localStorage.setItem("name", response.data.name); // corrected 'res' to 'response'
        navigate("/dashboard/category");
      } else {
        Swal.fire({
          title: "Failed",
          text:
            response.data.status || "Failed to add category. Please try again.",
          icon: "error",
        });
      }
    } catch (err) {
      // Log the error for debugging
      console.error("Error:", err);

      Swal.fire({
        title: "Error",
        text:
          err.response?.data?.Error || "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Box p={3} borderRadius={2} width={1 / 1} bgcolor="background.paper">
        <h3 style={{ textAlign: "center" }}>Category form</h3>
        <br />
        <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <TextField
              id="name"
              label="Add Name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              type="name"
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="category-label">Add Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Add Category"
              fullWidth
              required
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="technology-label">Add Technology</InputLabel>
            <Select
              labelId="technology-label"
              id="technology"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              label="Add Technology"
              fullWidth
              required
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="React & Node Developer">
                React & Node Developer
              </MenuItem>
              <MenuItem value="Flutter Developer">Flutter Developer</MenuItem>
              <MenuItem value="Dot Net Developer">Dot Net Developer</MenuItem>
              <MenuItem value="Wordpress Developer">
                Wordpress Developer
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2, borderRadius: 1 }}
            style={{
              background:
                "linear-gradient(89deg, rgb(21, 74, 189) 0.1%, rgb(26, 138, 211) 51.5%, rgb(72, 177, 234) 100.2%)",
            }}
          >
            Add
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddCategory;
