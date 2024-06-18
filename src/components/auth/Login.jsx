import "./Auth.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const Login = () => {
  const [email, set] = useState("gagehickle@email.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "reap_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div className="center-container">
      <div className="auth-decoration">
        <h1 className="center pb-3">
          <div className="sign">reap / sow</div>
        </h1>
        <h2 className="center">Please sign in to view your garden!</h2>
        <Form onSubmit={handleLogin}>
          <FormGroup floating>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              required
              className="center wide"
            />
            <Label for="email">Email</Label>
          </FormGroup>
          <div className="center">
            <Button color="success" type="submit">
              Sign in
            </Button>
          </div>
        </Form>
        <Link className="center mt-2" to="/register">
          Not a member yet?
        </Link>
      </div>
    </div>
  );
};
