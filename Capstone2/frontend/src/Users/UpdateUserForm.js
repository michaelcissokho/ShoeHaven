import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import { ShoeHavenApi as api } from '../ShoeHavenApi'

const UpdateUserForm = ({ updateUser }) => {
    let {username} = useParams()

    const INITIAL_VALUES = {
        password: '',
        firstname: '',
        lastname: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_VALUES)

    useEffect(() => {
        async function getUserData() {
            let res = await api.request(`users/${username}`)
            setFormData({ password: '', firstname: res.firstname, lastname: res.lastname, email: res.email })
        }
        getUserData()
    }, [username])

    let history = useHistory()

    function handleChange(e) {
        e.preventDefault()

        setFormData((formData) => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const { password, firstname, lastname, email } = formData

        updateUser(password, firstname, lastname, email)

        setFormData(INITIAL_VALUES)

        history.push('/listings')
    }

    return (
        <Container>
            <h4>Welcome {username} !
                <br></br>
                <br></br>
                Update Your Profile Below:
            </h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='firstname'
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='lastname'
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control
                            type="text"
                            name='email'
                            placeholder="E-Mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Update
            </Button>
            </Form>
        </Container>
    )
}

export default UpdateUserForm