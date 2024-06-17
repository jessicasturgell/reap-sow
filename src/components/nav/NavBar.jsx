import "./NavBar.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarText, NavbarToggler } from "reactstrap"

export const NavBar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  
    return (
    <div>
        <Navbar className="reap-sow-nav">
        <NavbarBrand href="/">reap / sow</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/plants">Common Plants Database</NavLink>
            </NavItem>
            {localStorage.getItem("reap_user") ? (
            <NavItem>
                <NavLink  
                    to="" 
                    onClick={() => {
                        localStorage.removeItem("reap_user")
                        navigate("/", { replace: true })
                    }}
                >
                    Logout
                </NavLink>
            </NavItem>
            ) : (
            ""
            )}
            </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
        </Navbar>
    </div>
    )
}