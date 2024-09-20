import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovalStatus = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/status_update/${localStorage.getItem('email')}`)
      .then((result) => {
        console.log("object", result.data);
        setStatus(result.data?.data ?? []);
      })
      .catch((err) => console.error('Error fetching status:', err));
  }, []);

  console.log("object", status);

  return (
    <div
      className="status-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        padding: "20px",
        justifyContent: "center"

      }}
    >
      {status.length === 0 ? (
        <div
          style={{
            gridColumn: "span 1",
            padding: "20px",
            textAlign: "center",
            fontSize: "18px",
            color: "#555"
          }}
        >
          No Record Found
        </div>
      ) : (
        status.map((item) => (
          <div
            key={item.email}
            className="status-card"
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              position: "relative"
            }}
          >
            <div
              className="card-header"
              style={{
                backgroundColor: "#a2b8dd",
                color: "black",
                padding: "15px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                borderBottom: "2px solid #fff"
              }}
            >
              Approval Status
            </div>
            <div
              className="card-body"
              style={{
                padding: "15px",
                color: "#333",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              <p style={{ margin: "10px 0" }}>
                <strong>Status:</strong> {item.status}
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Name:</strong> {item.name}
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Type:</strong> {item.typeleave}
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Start Date:</strong> {item.sdate}
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>End Date:</strong> {item.edate}
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Reason:</strong> {item.reason}
              </p>
              <p style={{ margin: "10px 0" }}>
                <strong>Email:</strong> {item.email}
              </p>
            </div>
            <div
              className="card-footer"
              style={{
                backgroundColor: "#a2b8dd",
                borderTop: "1px solid #ddd",
                padding: "10px",
                textAlign: "center",
                fontSize: "12px",
                color: "#777",
                position: "absolute",
                bottom: "0",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Optional footer content */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovalStatus;
