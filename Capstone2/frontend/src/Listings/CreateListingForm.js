import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Container, Button } from 'react-bootstrap'

const CreateListingForm = ({ createListing }) => {
    const INITIAL_STATE = {
        title: '',
        picture: '',
        price: '',
        details: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    let history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        const { title, picture, price, details } = formData

        createListing(title, picture, price, details)

        history.push('/listings')

        setFormData(INITIAL_STATE)

    }

    const handleChange = (e) => {
        e.preventDefault()

        setFormData(formData => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))
    }

    return (
        <div>
            <Container>
                <h1>New Listing:</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name='title'
                            placeholder="Item Name"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control
                            type="text"
                            name='picture'
                            placeholder="Link to Picture Of Item"
                            value={formData.picture}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name='price'
                            placeholder="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            style={{height: '500px'}}
                            name='details'
                            placeholder="Description"
                            value={formData.details}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add New Lisiting
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default CreateListingForm