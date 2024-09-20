import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const GetLeave = () => {
  const [name, setName] = useState("");
  const [typeleave, setTypeleave] = useState("");
  const [email, setEmail] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [reason, setReason] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the server
      const response = await axios.post("http://localhost:8081/leave", {
        name,
        typeleave,
        email,
        sdate,
        edate,
        reason,
      });

      console.log("response", response);
      // Check the status code from the response
      switch (response.status) {
        case 201: // Resource created successfully
          Swal.fire({
            title: "Success",
            text: "Leave request submitted successfully",
            icon: "success",
          });
          navigate("/empdash");
          break;

        case 200: // The request was successful but not necessarily a creation
          Swal.fire({
            title: "Success",
            text:
              response.data.message || "Leave request submitted successfully",
            icon: "success",
          });
          navigate("/empdash");
          break;

        default:
          Swal.fire({
            title: "Failed",
            text:
              response.data.Error ||
              "Failed to submit leave request. Please try again.",
            icon: "error",
          });
      }
    } catch (err) {
      console.error("Error:", err);

      // Handle network or other errors
      Swal.fire({
        title: "Error",
        text:
          err.response?.data?.Error ||
          "An error occurred while submitting the leave request. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div
        style={{
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ margin: "auto" }}>
          <h4>REQUEST FOR LEAVE</h4>
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
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="typeleave">Leave type</InputLabel>
                <Select
                  labelId="typeleave"
                  id="typeleave"
                  name="typeleave"
                  label="Leave type"
                  onChange={(e) => setTypeleave(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="personal leave">Personal Leave</MenuItem>
                  <MenuItem value="sick leave">Sick Leave</MenuItem>
                  <MenuItem value="first half">First Half</MenuItem>
                  <MenuItem value="second half">Second Half</MenuItem>
                </Select>
              </FormControl>
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="sdate"
                name="sdate"
                label="Select Start Date"
                variant="outlined"
                type="date"
                onChange={(e) => setSdate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="edate"
                name="edate"
                label="Select End Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                onChange={(e) => setEdate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="reason"
                name="reason"
                label="Reason"
                variant="outlined"
                placeholder="Reason"
                multiline
                rows={4}
                required
                onChange={(e) => setReason(e.target.value)}
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
    </div>
  );
};

export default GetLeave;
