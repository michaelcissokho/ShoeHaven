import React, { useEffect, useState } from 'react'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import { useParams, Link } from 'react-router-dom'

const User = () => {
    const [profile, setProfile] = useState([])

    const {username} = useParams()

    useEffect(() => {
        async function profile() {
            let res = await api.request(`users/${username}`)

            setProfile(res)
        }
        profile()
    }, [username])

    return (
        <div>
            <div>
                <h3>Welcome {username} !</h3>
                <h6> Your Profile:</h6>
                <h6>Name: {profile.firstname} {profile.lastname}</h6>
                <h6>Email: {profile.email}</h6>
                <br></br><br></br>
                <Link to={`/${username}/update`}>Update Your Profile </Link>
            </div>
        </div>
    )
}

export default User