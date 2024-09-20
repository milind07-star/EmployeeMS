const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

/*----------------email send-------------------*/

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mailto:milindpaunikar763@gmail.com", // your Gmail account
    pass: "rkgzdveihqeyrecj", // your Gmail app password
  },
});

/*----------------email send-------------------*/

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join("uploads")));
app.use(bodyParser.json()); // Add this middleware
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeems",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Adjust the destination folder as needed
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp to the filename to ensure uniqueness
  },
});

const upload = multer({ storage: storage });

// app.post("/register_employee", (req, res) => {
//   const sql =
//     "INSERT INTO register_employee(`username`, `email`,`phone`, `password`) VALUES (?,?,?,?)";
//   const values = [
//     req.body.username,
//     req.body.email,
//     req.body.phone,
//     req.body.password,
//   ];
//   console.log(values);
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     return res.json(data);
//   });
// });

app.post("/register_employee", (req, res) => {
  const { username, email, phone, password } = req.body;

  // First, check if the email already exists
  const checkEmailSql = "SELECT * FROM register_employee WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json("Error checking email");
    }

    if (results.length > 0) {
      // Email already exists
      return res.status(400).json("This user is already registered");
    }

    // Email does not exist, proceed with insertion
    const insertSql =
      "INSERT INTO register_employee (`username`, `email`, `phone`, `password`) VALUES (?, ?, ?, ?)";
    const values = [username, email, phone, password];

    db.query(insertSql, values, (err, data) => {
      if (err) {
        return res.status(500).json("Error inserting data");
      }
      return res.status(200).json(data);
    });
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Query to find the user by email
  const sql = "SELECT * FROM register_employee WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Check if the provided password matches the stored password
    if (password === user.password) {
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// app.post("/add_category", (req, res) => {
//   const sql =
//     "INSERT INTO category(`name`,`category`,`technology`) VALUES (?,?,?)";
//   const values = [req.body.name, req.body.category, req.body.technology];
//   console.log(values);
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     return res.json(data);
//   });
// });

app.post("/add_category", (req, res) => {
  const name = req.body.name;

  // Step 1: Check if the name exists in the register_employee table
  const checkEmployeeSql = "SELECT * FROM employee WHERE name = ?";

  db.query(checkEmployeeSql, [name], (err, employeeResults) => {
    if (err) {
      console.error("Error checking employee name:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error." });
    }

    // Step 2: If name does not exist in the employee table, return an error
    if (employeeResults.length === 0) {
      return res.status(404).json({
        Status: false,
        Error: "user is not registered in employees",
      });
    }

    // Step 3: Check if the name already exists in the category table
    const checkCategorySql = "SELECT * FROM category WHERE name = ?";

    db.query(checkCategorySql, [name], (err, categoryResults) => {
      if (err) {
        console.error("Error checking category name:", err);
        return res
          .status(500)
          .json({ Status: false, Error: "Internal server error." });
      }

      // Step 4: If name already exists in the category table, return an error
      if (categoryResults.length > 0) {
        return res.status(400).json({
          Status: false,
          Error: "Category with this  already exists",
        });
      }

      // Step 5: Proceed with the insertion if name does not exist in the category table
      const insertCategorySql =
        "INSERT INTO `category` (`name`, `category`,`technology`) VALUES (?, ?, ?)";

      const values = [req.body.name, req.body.category, req.body.technology];

      db.query(insertCategorySql, values, (err, data) => {
        if (err) {
          console.error("Error inserting category:", err);
          return res
            .status(500)
            .json({ Status: false, Error: "Internal server error." });
        }
        return res.status(200).json({ Status: true, Data: data });
      });
    });
  });
});

app.get("/category", (req, res) => {
  const sql = "SELECT * FROM `category`";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }
    return res.json({ Status: true, result: data });
  });
});

app.delete("/category/:id", (req, res) => {
  const { id } = req.params; // Extract the category ID from the request parameters
  const sql = "DELETE FROM category WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      // No rows were deleted, meaning the category ID was not found
      return res
        .status(404)
        .json({ Status: false, Message: "Category not found" });
    }

    // Successfully deleted the category
    return res.json({ Status: true, Message: "Category deleted successfully" });
  });
});

// app.post("/add_employee", (req, res) => {
//   const sql =
//     "INSERT INTO employee (`name`, `email`, `contact`, `salary`, `address`) VALUES (?, ?, ?, ?, ?)";

//   const values = [
//     req.body.name,
//     req.body.email,
//     req.body.contact,
//     req.body.salary,
//     req.body.address,
//   ];

//   console.log(values);

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("Error:", err);
//       return res.json({ Status: false, Error: err.message }); // Return error message
//     }
//     return res.json({ Status: true, Data: data }); // Return success status and data
//   });
// });

app.post("/add_employee", upload.single("image"), (req, res) => {
  const { name, email, contact, salary, address } = req.body;
  const image = req.file;

  // Check if the image was uploaded successfully
  if (!image) {
    return res
      .status(400)
      .json({ success: false, error: "No image file provided" });
  }

  // Construct the image URL or filename to store in the database
  const imageUrl = `/uploads/${image.filename}`;

  // Check if the email exists in the registered_employee table
  const checkRegisteredEmailSql =
    "SELECT * FROM register_employee WHERE email = ?";
  db.query(checkRegisteredEmailSql, [email], (err, registeredResults) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res
        .status(500)
        .json({ success: false, error: "Database error: " + err.message });
    }

    // If the email is not found in the registered_employee table, return an error
    if (registeredResults.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "User is not registered." });
    }

    // Check if the email already exists in the employee table
    const checkEmailSql = "SELECT * FROM employee WHERE email = ?";
    db.query(checkEmailSql, [email], (err, employeeResults) => {
      if (err) {
        console.error("Database query error:", err.message);
        return res
          .status(500)
          .json({ success: false, error: "Database error: " + err.message });
      }

      // If the email exists in the employee table, return an error response
      if (employeeResults.length > 0) {
        return res.status(400).json({
          success: false,
          error: "User already exists in the employee table.",
        });
      }

      // If the email does not exist in the employee table, insert the new employee data
      const insertEmployeeSql =
        "INSERT INTO employee (name, email, contact, salary, address, image) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [name, email, contact, salary, address, imageUrl];

      db.query(insertEmployeeSql, values, (err, result) => {
        if (err) {
          console.error("Database insertion error:", err.message);
          return res
            .status(500)
            .json({ success: false, error: "Database error: " + err.message });
        }

        // Return a success response with the inserted employee data
        res.json({
          success: true,
          message: "Employee added successfully!",
          name,
          email,
          contact,
          salary,
          address,
          imageUrl,
        });
      });
    });
  });
});

app.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }
    return res.json({ Status: true, Result: data });
  });
});

app.get("/employee/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM employee WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }
    if (data.length === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Employee not found" });
    }
    return res.json({ Status: true, Result: data });
  });
});

// app.put("/employee/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, email, contact, salary, address } = req.body;
//   console.log(req.body)

//   // SQL query to update employee record
//   const sql = `
//     UPDATE employee
//     SET name = ?, email = ?, contact = ?, salary = ?, address = ?
//     WHERE id = ?
//   `;

//   const values = [name, email, contact, salary, address, id];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res
//         .status(500)
//         .json({ Status: false, Error: "Internal server error" });
//     }

//     // Check if any rows were affected
//     if (result.affectedRows === 0) {
//       return res
//         .status(404)
//         .json({ Status: false, Error: "Employee not found" });
//     }

//     return res.json({ Status: true, Message: "Employee updated successfully" });
//   });
// });

app.put("/employee/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, email, contact, salary, address } = req.body;
  const image = req.file ? req.file.filename : null; // Get the uploaded image filename
  console.log(req.body);
  // SQL query to update employee record
  let sql = `
    UPDATE employee
    SET name = ?, email = ?, contact = ?, salary = ?, address = ?
  `;

  const values = [name, email, contact, salary, address];

  // If an image is uploaded, include it in the SQL query
  if (image) {
    sql += `, image = ?`;
    values.push(image);
  }

  sql += ` WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Employee not found" });
    }

    return res.json({ Status: true, Message: "Employee updated successfully" });
  });
});

app.delete("/employee/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employee WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Employee not found" });
    }
    return res.json({ Status: true, Message: "Employee deleted successfully" });
  });
});

app.get("/employeeCount", (req, res) => {
  const sql = "SELECT COUNT(id) AS employee FROM employee";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }
    return res.json({ Status: true, EmployeeCount: result[0].employee });
  });
});

app.get("/adminCount", (req, res) => {
  // Since the admin table is not in the database and admin credentials are set on the frontend,
  // we can return a static count or a placeholder message.
  const adminCount = 1; // Assuming a single admin

  return res.json({ Status: true, AdminCount: adminCount });
});

app.get("/salary", (req, res) => {
  const sql = "SELECT SUM(salary) AS sumOfSalary FROM employee";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error" });
    }
    return res.json({ Status: true, SumOfSalary: result[0].sumOfSalary });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// app.post("/leave", (req, res) => {
//   const sql =
//     "INSERT INTO `leave` (`name`,`typeleave`, `email`, `sdate`, `edate`, `reason`) VALUES (?, ?, ?, ?, ?, ?)";

//   const values = [
//     req.body.name,
//     req.body.typeleave,
//     req.body.email,
//     req.body.sdate,
//     req.body.edate,
//     req.body.reason,
//   ];

//   console.log(values);

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error("Error:", err);
//       return res.json({ Status: false, Error: err.message });
//     }
//     return res.json({ Status: true, Data: data });
//   });
// });

app.post("/leave", (req, res) => {
  const email = req.body.email;

  // Step 1: Check if the email exists in the register_employee table
  const checkEmailSql = "SELECT * FROM register_employee WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Internal server error." });
    }

    // Step 2: If email does not exist, return an error
    if (results.length === 0) {
      return res.status(404).json({
        Status: false,
        Error: "You are not registered",
      });
    }

    // Step 3: Proceed with the insertion if email exists
    const sql =
      "INSERT INTO `leave` (`name`, `typeleave`, `email`, `sdate`, `edate`, `reason`) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.name,
      req.body.typeleave,
      req.body.email,
      req.body.sdate,
      req.body.edate,
      req.body.reason,
    ];

    console.log(values);

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error inserting leave:", err);
        return res
          .status(500)
          .json({ Status: false, Error: "Internal server error." });
      }
      return res.status(200).json({ Status: true, Data: data });
    });
  });
});

app.get("/leave", (req, res) => {
  const sql = "SELECT * FROM `leave`"; // Query to select all leave requests

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.json({ Status: false, Error: err.message });
    }
    return res.json({ Status: true, Data: data });
  });
});

app.post("/update_leave_status", (req, res) => {
  console.log("Received body:", req.body);

  // Ensure that the required fields are present
  const { id, status } = req.body;

  if (!id || !status) {
    return res.json({ Status: false, Error: "ID and status are required" });
  }

  const sql = "UPDATE `leave` SET `status` = ? WHERE `id` = ?";

  const values = [status, id];

  console.log("SQL values:", values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.json({ Status: false, Error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.json({
        Status: false,
        Error: "No record found with the given ID",
      });
    }

    return res.json({ Status: true, Message: "Record updated successfully" });
  });
});

app.get("/status_update/:email", (req, res) => {
  const email = req.params.email; // Get the id from the request parameters
  const sql = "SELECT * FROM `leave` WHERE email = ?"; // Query to select leave request by id

  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.json({ Status: false, Error: err.message });
    }
    if (data.length === 0) {
      return res.json({
        Status: false,
        Message: "No data found for the given ID",
      });
    }
    return res.json({ Status: true, data });
  });
});

app.get("/status_update", (req, res) => {
  const sql = "SELECT * FROM `leave`"; // Query to select all leave requests

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.json({ Status: false, Error: err.message });
    }
    if (data.length === 0) {
      return res.json({
        Status: false,
        Message: "No data found",
      });
    }
    return res.json({ Status: true, Data: data });
  });
});

app.get("/profile", (req, res) => {
  const email = req.query.email;
  const sql = "SELECT * FROM employee WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ Status: false, Error: "User not found" });
    }

    const user = results[0];
    return res.status(200).json({ Status: true, Result: user });
  });
});

app.get("/employee_logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

/*-------------------email sent start-------------------------------*/

app.post("/send_email", (req, res) => {
  console.log(req.body); // Log the request body to check the incoming data

  const { name, typeleave, email, status, sdate, edate, reason } = req.body;

  if (!name || !typeleave || !email || !status || !sdate || !edate || !reason) {
    return res
      .status(400)
      .json({ Status: false, Error: "Invalid request body" });
  }

  const mailOptions = {
    from: "StaffStream <milindpaunikar763@gmail.com>", // Your email (no "mailto:")
    to: email, // The user's email from the request body
    subject: `Your leave request has been ${status.toLowerCase()}`,
    html: `
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #007bff;">Hello ${name},</h2>
        <p style="font-size: 16px;">
          Your leave request for <strong>${typeleave}</strong> from <strong>${sdate}</strong> to <strong>${edate}</strong> with the reason <em>"${reason}"</em> has been <strong>${status.toLowerCase()}</strong>.
        </p>
        <p style="font-size: 16px;">If you have any questions, feel free to reach out to us.</p>
        <p style="font-size: 16px; color: #555;">Best regards,<br>HR Team</p>
      </div>
    </body>
    </html>
  `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ Status: false, Error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ Status: true, Message: "Email sent successfully" });
    }
  });
});

/*-------------------email sent end-------------------------------*/

app.listen(8081, () => {
  console.log("listening");
});
