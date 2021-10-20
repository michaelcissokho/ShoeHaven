import React, { useEffect, useState, useContext } from 'react'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import UserContext from '../UserContext'

const User = () => {
    const currentUser = useContext(UserContext)
    let username = currentUser.username
    let token = currentUser.token

    const [profile, setProfile] = useState([])

    useEffect(() => {
        async function profile() {
            let res = await api.request(`users/${username}`,{}, 'get', token)
            setProfile(res)
        }
        profile()
    }, [username,token])

    return (
        <div>
            <Container>
                <Row xs={3}>
                    <Card as={Col} style={{ width: '500px' }}>
                        <h1>Welcome {username} !</h1>
                        <Card.Title> Your Profile:</Card.Title>
                        <Card.Body>
                            <h6>Name: {profile.firstname} {profile.lastname}</h6>
                            <h6>Email: {profile.email}</h6>
                            <br></br><br></br>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant='primary' as={Link} to={`/${username}/update`}>Update Your Profile </Button>
                        </Card.Footer>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default User