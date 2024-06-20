import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "reap_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <>
      <div className="center-container">
        <div className="auth-decoration">
          <h1 className="center pb-3">
            <div className="sign2">reap / sow</div>
          </h1>
          <h2 className="center">Please Register</h2>
          <Form onSubmit={handleRegister}>
            <FormGroup floating>
              <Input
                id="username"
                name="username"
                type="username"
                className="center wide"
                onChange={updateUser}
                placeholder="Enter your desired username"
                required
              />
              <Label for="exampleEmail">Username</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Email address"
                type="email"
                className="center wide"
                onChange={updateUser}
                required
              />
              <Label for="email">Email</Label>
            </FormGroup>
            <div className="center">
              <Button color="success" type="submit">
                Register
              </Button>
            </div>
          </Form>
          <Link className="center mt-2" to="/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
};
