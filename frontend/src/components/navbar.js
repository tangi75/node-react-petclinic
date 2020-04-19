import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

const navBar = () => (
  <div>
    <Navbar className="navbar navbar-dark bg-primary">
      <NavbarBrand href="/">Pet Clinic</NavbarBrand>
        <Nav className="ml-auto" pills>
          <NavItem>
            <NavLink href="#">Today's Schedule</NavLink>
          </NavItem>
          <NavItem> 
            {/* <NavLink href="#">Past Visits</NavLink> */}
          </NavItem>
        </Nav>
    </Navbar>
  </div>
);

export default navBar;