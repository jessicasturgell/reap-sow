import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/plants">Plants</Link>
            </li>
            {localStorage.getItem("reap_user") ? (
            <li className="navbar-item navbar-logout">
                <Link 
                    className="navbar-link" 
                    to="" 
                    onClick={() => {
                        localStorage.removeItem("reap_user")
                        navigate("/", { replace: true })
                    }}
                >
                    Logout
                </Link>
            </li>
            ) : (
            ""
            )}
        </ul>
    )
}