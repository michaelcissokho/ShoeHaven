import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button} from 'react-bootstrap'

const CreateCommentForm = ({ addComment }) => {    
    const INITIAL_STATE = {
        body: ''
    }

    const history = useHistory()

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { body } = formData

        addComment(body)

        setFormData(INITIAL_STATE)

        history.push('/posts')

    }

    const handleChange = async (e) => {
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            name='body'
                            placeholder="Type Your Comment Here"
                            value={formData.body}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default CreateCommentForm