import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'

const Navigation = ({ logout }) => {
    const currentUser = useContext(UserContext)
    let username = currentUser.username

    return (
        <div>
            <Nav fill
                variant="pills"
                activeKey="/home"
            >
                <Nav.Item>
                    <Nav.Link href="/home">ShoeHaven</Nav.Link>
                </Nav.Item>

                {!currentUser && 
                <Nav.Item>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </Nav.Item>
                }

                {!currentUser &&
                    <Nav.Item>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav.Item>
                }
                <Nav.Item>
                    <Nav.Link as={Link} to={`/users/${username}`}>
                        Profile
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/posts'>
                        Community
                    </Nav.Link>
                </Nav.Item>

                {currentUser &&
                    <Nav.Item>
                        <Nav.Link as={Link} to='/listings/new'>
                            Create Listing
                    </Nav.Link>
                    </Nav.Item>}

                <Nav.Item>
                    <Nav.Link as={Link} to='/cart'>
                        Cart
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/login' onClick={() => logout()}>
                        Logout
                    </Nav.Link>
                </Nav.Item>
                {currentUser &&
                    <Nav.Item>
                        <Nav.Link eventKey='disabled' disabled>
                            Current User: <b>'{username}'</b>
                        </Nav.Link>
                    </Nav.Item>
                }
            </Nav>
        </div>
    )
}

export default Navigation