import React, {useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../Form.css'

const LoginPage = ({login}) => {
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

        login(username, password)

        if(localStorage.getItem('username')){
            setFormData(INITIAL_STATE)
            history.push('/home')
        }
    }

    return (
        <div>
            <h5>
                Enter Details Below To Login:
            </h5>
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
                    <br></br>
                <button>Login</button>
            </form>
        </div>
    )
}


export default LoginPage