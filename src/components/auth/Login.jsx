import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService.jsx";

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
    <main>
      <section>
        <form onSubmit={handleLogin}>
          <h1>reap / sow</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div>
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
