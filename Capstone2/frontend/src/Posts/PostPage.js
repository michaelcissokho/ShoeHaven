import React, {useState, useEffect} from 'react'
import {ShoeHavenApi as api} from '../ShoeHavenApi'
import {v4 as uuid} from 'uuid'
import Post from './Post'
import {Link} from 'react-router-dom'

const PostPage = ({deletePost}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function populatePage(){
            let res = await api.request(`posts`)
            setPosts(res)
        }
        populatePage()
    },[])

    return(
        <div>
            <br></br><br></br>
            <Link to='/posts/new'> Create A Post</Link>
            {posts.map(post => 
            <Post key={uuid()} 
            id={post.id} 
            username={post.username}
            title={post.title} 
            body={post.body} 
            picture={post.picture} 
            deletePost={deletePost}
            />)}
        </div>
    )
}

export default PostPage