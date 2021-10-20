import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import UserContext from '../UserContext'

const NewPostForm = ({ createPost }) => {
    console.log(useContext(UserContext))
    
    const INITIAL_STATE = {
        title: '',
        body: '',
        picture: ''
    }

    const history = useHistory()

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        e.preventDefault()

        setFormData(formData => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { title, body, picture } = formData

        createPost(title, body, picture)

        history.push('/posts')

        setFormData(INITIAL_STATE)
    }

    return (
        <div>
            <Container>
                <h1>Enter Details To Create A Post:</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name='title'
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control
                            type="text"
                            name='picture'
                            placeholder="Link To Photo (optional)"
                            value={formData.picture}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            style={{height: '500px'}}
                            name='body'
                            placeholder="Post"
                            value={formData.body}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Post
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default NewPostForm