import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = ({ logout, userLoggedIn }) => {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Shoe Haven </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                    <Nav>
                        {!userLoggedIn && <Nav.Link as={Link} to="/signup">Signup</Nav.Link>}
                        {!userLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        <Nav.Link as={Link} to={`/users/${userLoggedIn}`}>Profile</Nav.Link>
                        <Nav.Link as={Link} to='/listings'>Listings</Nav.Link>
                        <Nav.Link as={Link} to='/posts'>Community</Nav.Link>
                        <Nav.Link as={Link} to='/listings/new'>Create Listing</Nav.Link>
                        <Nav.Link as={Link} to='/cart'>Cart</Nav.Link>
                        <Nav.Link as={Link} to='/login' onClick={() => logout()}>Logout</Nav.Link>
                        <Nav.Link eventKey='disabled' disabled>Current User: <b>'{userLoggedIn}'</b></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation