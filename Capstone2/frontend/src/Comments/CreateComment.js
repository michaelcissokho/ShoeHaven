import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

const CreateCommentForm = ({ addComment }) => {
    const INITIAL_STATE = {
        body: ''
    }

    const history = useHistory()

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {body} = formData

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
            <h1>Type Your Comment Below:</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    onChange={handleChange}
                    name='body'
                    value={formData.body}
                    placeholder='Type Your Comment Here'
                    rows={2}
                /><br></br>
                <button> Submit </button>
            </form>
        </div>
    )
}

export default CreateCommentForm