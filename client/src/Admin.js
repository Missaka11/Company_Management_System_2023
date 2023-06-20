import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();
  // const [selectedSystem, setSelectedSystem] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/managerlogin", {
        email: email,
        password: password,
      });
      console.log(response.data);

      // Check if login was successful
      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        const userType = response.data.userType; // Retrieve the userType from the response

        // Navigate to the selected system route based on userType
        navigate(userType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="img2">
      <div className="header"></div>

      <div style={{ width: "99%", margin: "auto auto", textAlign: "center" }}>
        <br></br> <h1 style={{ color: "black" }}>Admin Pannel </h1>
        <Form className="forms">
          <Form.Group>
            <Form.Control
              name="Name"
              type="text"
              placeholder="Email"
              style={{ marginBottom: "1rem" }}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Form.Control
              name="Password"
              type="password"
              placeholder="Password"
              style={{ marginBottom: "1rem" }}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
        </Form>
        <Button
          style={{
            width: "35%",
            marginBottom: "1rem",
            backgroundColor: "rgb(44, 150, 255)",
            color: "black",
          }}
          varian="outline-success"
          onClick={handleSubmit}
        >
          SignIn
        </Button>
        <br></br>
        <Button
          style={{ width: "35%", backgroundColor: "orange" }}
          variant="outline-dark"
          onClick={() => navigate(-1)}
        >
          BACK
        </Button>
      </div>
    </div>
  );
}

export default Admin;
