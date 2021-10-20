import React, { useState, useEffect, useContext } from 'react'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import { v4 as uuid } from 'uuid'
import Post from './Post'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'
import {Button} from 'react-bootstrap'

const PostPage = ({ deletePost }) => {
    const currentUser = useContext(UserContext)
    let token = currentUser.token

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function populatePage() {
            let res = await api.request(`posts`, {}, 'get', token)
            setPosts(res)
        }
        populatePage()
    }, [token])

    return (
        <div>
            <br></br><br></br>
            {posts.map(post =>
                <Post key={uuid()}
                    id={post.id}
                    username={post.username}
                    title={post.title}
                    body={post.body}
                    picture={post.picture}
                    deletePost={deletePost}
                />)}
            <Button variant='primary' as={Link} to='/posts/new'> Create A Post</Button>
        </div>
    )
}

export default PostPage