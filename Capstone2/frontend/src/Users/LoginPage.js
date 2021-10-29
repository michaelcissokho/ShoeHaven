import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

const LoginPage = ({ login }) => {
    const INITIAL_STATE = {
        username: '',
        password: ''
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

    const handleSubmit = (e) => {
        e.preventDefault()

        const { username, password } = formData

        login(username, password).then(() => {
            if (localStorage.getItem('username')) {
                setFormData(INITIAL_STATE)
                history.push('/listings')
            }else{
                history.push('/login')
            }
        })
    }

    return (
        <div>
            <h5>
                Enter Details Below To Login:
            </h5>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name='username'
                            placeholder="Enter Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}


export default LoginPage