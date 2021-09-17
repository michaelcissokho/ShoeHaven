import  React, {useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../Form.css'

const NewPostForm = ({createPost}) => {
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
            <h5>Create A New Post</h5>
            <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={handleChange}
                        value={formData.title}
                        className='formInput'
                    />
                    <input
                        type='text'
                        name='picture'
                        placeholder='Link to Photo (optional)'
                        onChange={handleChange}
                        value={formData.picture}
                        className='formInput'
                    />
                    <textarea
                        as='textarea'
                        rows={10}
                        name='body'
                        placeholder='Type Post Here'
                        onChange={handleChange}
                        value={formData.body}
                        className='formInput'
                    />
                    <br></br>
                    <button>Create Post</button>
                </form>
        </div>
    )
}

export default NewPostForm