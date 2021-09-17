import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import '../Form.css'

const UpdateUserForm = ({ username, updateUser }) => {
    const INITIAL_STATE = {
        password: '',
        firstname: '',
        lastname: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

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

    async function handleSubmit(e) {
        e.preventDefault()

        const { password, firstname, lastname, email } = formData

        updateUser(password, firstname, lastname, email)

        setFormData(INITIAL_STATE)

        history.push('/home')
    }

    return (
        <div>
            <h4>Welcome {username} ! Update Your Profile Below:</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    placeholder='password'
                    onChange={handleChange}
                    className='formInput'
                />
                <br></br>
                <input
                    type='text'
                    name='firstname'
                    value={formData.firstname}
                    placeholder='firstname'
                    onChange={handleChange}
                    className='formInput'
                />
                <br></br>
                <input
                    type='text'
                    name='lastname'
                    value={formData.lastname}
                    placeholder='lastname'
                    onChange={handleChange}
                    className='formInput'
                />
                <br></br>
                <input
                    type='text'
                    name='email'
                    value={formData.email}
                    placeholder='E-Mail'
                    onChange={handleChange}
                    className='formInput'
                />
                <br></br>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateUserForm