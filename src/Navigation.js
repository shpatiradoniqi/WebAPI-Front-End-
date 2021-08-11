import { Component } from "react";
import {NavLink} from "react-router-dom";
import {NavBar,Nav, Navbar} from "react-bootstrap";


export class Navigation extends Component{


    render(){
        return (
           <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aris-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    Home
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/category">
                   Category
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/car">
                    Car
                </NavLink>
                    </Nav>

                </Navbar.Collapse>
           
           </Navbar>
        )
    }
}