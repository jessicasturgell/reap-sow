import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../services/userService.jsx"

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "reap_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main>
      <form onSubmit={handleRegister}>
        <h1>reap / sow</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="username"
              placeholder="Enter your desired username"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <button type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}