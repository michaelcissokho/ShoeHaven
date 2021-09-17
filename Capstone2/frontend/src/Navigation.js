import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = ({logout}) => {
    let username = localStorage.getItem('username')

    return (
            <div>
                <h1> Shoe Haven</h1>
                <Link to='/login'> Login </Link>
                <Link to='/home'>Home</Link>
                <Link to='/signup'> Signup </Link>
                <Link to='/posts'>Community</Link>
                <Link to='/login' onClick={()=>logout()}>Logout</Link>
                <Link to={`/users/${username}`}> Profile </Link><br></br>
                <Link to="/cart"> Cart </Link>
            </div>
    )
}

export default Navigation