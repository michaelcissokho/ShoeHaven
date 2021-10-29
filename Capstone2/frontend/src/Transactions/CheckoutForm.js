import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

const CheckoutForm = ({ cart, checkoutItems }) => {
    let total = 0
    for (let item of cart) {
        total += item.price
    }

    const history = useHistory()

    const INITIAL_STATE = {
        firstname: '',
        lastname: '',
        address: '',
        card: '',
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    function handleChange(e) {
        setFormData((formData) => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleSubmit(e) {
        e.preventDefault()

        checkoutItems()

        setFormData(INITIAL_STATE)

        history.push('/listings')
    }

    return (
        <div>
            <h3>Cart Total: ${total}</h3>
            <Container>
                <h1>Enter Details To Checkout Your Items:</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='firstname'
                                placeholder="firstname"
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
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='address'
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            name='card'
                            placeholder="Card Number"
                            value={formData.card}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Checkout
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default CheckoutForm