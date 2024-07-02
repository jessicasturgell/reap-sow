import "./NavBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";

export const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="reap-sow-nav">
        <NavbarBrand className="navsign" href="/">
          reap / sow
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/garden">My Garden</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Plant Care
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/history">History</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/calendar">Calendar</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/harvest">Harvest Reports</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/plants">Common Plants Database</NavLink>
            </NavItem>
            {localStorage.getItem("reap_user") ? (
              <NavItem>
                <NavLink
                  href=""
                  onClick={() => {
                    localStorage.removeItem("reap_user");
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              ""
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
