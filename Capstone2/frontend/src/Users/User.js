import React, { useEffect, useState } from 'react'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import { Link, useParams } from 'react-router-dom'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'

const User = () => {
   let {username} = useParams()

    const [profile, setProfile] = useState([])

    useEffect(() => {
        async function profile() {
            let res = await api.request(`users/${username}`)
            setProfile(res)
        }
        profile()
    }, [username])

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