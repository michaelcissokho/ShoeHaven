import React, {useState } from 'react'
import {useHistory} from 'react-router-dom'
import '../Form.css'

const SignupPage = ({signup}) => {
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
                [e.target.name]:e.target.value
            }
        ))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {username,password,firstname,lastname,email} = formData

        signup(username,password,firstname,lastname,email)

        setFormData(INITIAL_STATE)

        history.push('/home')
    }

    return (
        <div>
            <h1> Please Enter Details To Signup Below:</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    onChange={handleChange}
                    value={formData.username}
                    className='formInput'
                />
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={handleChange}
                    value={formData.password}
                    className='formInput'
                />
                <input
                    type='text'
                    name='firstname'
                    placeholder='First Name'
                    onChange={handleChange}
                    value={formData.firstname}
                    className='formInput'
                />
                <input
                    type='text'
                    name='lastname'
                    placeholder='Last Name'
                    onChange={handleChange}
                    value={formData.lastname}
                    className='formInput'
                />
                <input
                    type='text'
                    name='email'
                    placeholder='E-Mail'
                    onChange={handleChange}
                    value={formData.email}
                    className='formInput'
                />
                <br></br>
                <br></br>
                <button>Signup!</button>
            </form>
        </div>
    )
}

export default SignupPage