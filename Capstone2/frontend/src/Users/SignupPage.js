import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'

const SignupPage = ({ signup }) => {
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    let history = useHistory()

    const handleChange = (e) => {
        e.preventDefault()

        setFormData((formData) => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { username, password, firstname, lastname, email } = formData

        signup(username, password, firstname, lastname, email)

        setFormData(INITIAL_STATE)

        history.push('/home')
    }

    return (
        <Container>
            <h1>Enter Details To Signup:</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name='username'
                            placeholder="Username"
                            value={formData.username}
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


                <Form.Group className="mb-3">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                        type="text"
                        name='email'
                        placeholder="E-Mail"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Signup
                </Button>
            </Form>
        </Container>
    )
}

export default SignupPage