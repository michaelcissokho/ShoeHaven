import React, { useState, useEffect } from 'react'

import { ShoeHavenApi as api } from '../ShoeHavenApi'
import Comment from '../Comments/Comment'
import { v4 as uuid } from 'uuid'
import CreateCommentForm from '../Comments/CreateComment'

const Post = ({ id, username, title, body, picture, deletePost }) => {
    const [comments, setComments] = useState([])
    const [writingComment, setWritingComment] = useState(false)

    useEffect(() => {
        async function getCommentsForPost() {
            const response = await api.request(`posts/${id}/comments`)

            setComments(response)
        }
        getCommentsForPost()
    }, [id, writingComment])

    async function addComment(body) {
        await api.request(`comments/new`, { postId: id, body }, 'post')

        setWritingComment(false)
    }

    async function deleteComment(id){
        await api.request(`comments/${id}`,{}, 'delete')

        alert('Comment Deleted')
    }

    if (!writingComment) {
        return (
            <div>
                <h1>{title}</h1>
                <img src={picture} alt='Use Your Imagination' />
                <p>{body}</p>
                <h4>Comments:</h4>
                {comments.map((comment) =>
                    <Comment
                        key={uuid()}
                        id={comment.id}
                        username={comment.username}
                        body={comment.body}
                        timecommented={comment.timecommented}
                        deleteComment={deleteComment}
                    />)}

                <button onClick={() => setWritingComment(true)}>Add a Comment</button>
                {localStorage.getItem('username') === username && <button onClick={() => deletePost(id)}>Delete Post</button>}
            </div>
        )
    } else {
        return (
            <CreateCommentForm addComment={addComment} />
        )
    }
}

export default Post