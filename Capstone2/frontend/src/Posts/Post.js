import React, { useState, useEffect } from 'react'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import Comment from '../Comments/Comment'
import { v4 as uuid } from 'uuid'
import CreateCommentForm from '../Comments/CreateComment'
import { Card, Button } from 'react-bootstrap'

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

    async function deleteComment(commentId) {
        await api.request(`comments/${commentId}`, {}, 'delete')
        setComments(comments.filter((comment) => comment.id !== commentId))
    }

    return (
        <div>
            <Card style={{ width: '500px' }}>
                <Card.Header> {username} </Card.Header>
                <Card.Img variant="top" src={picture} alt='Cool Listing' />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{body}</Card.Text>
                    <Card.Title>Comments:</Card.Title>
                    
                    {comments.map((comment) =>
                        <Comment
                            key={uuid()}
                            id={comment.id}
                            username={comment.username}
                            body={comment.body}
                            timecommented={comment.timecommented}
                            deleteComment={deleteComment}
                        />)}

                    {writingComment&&<CreateCommentForm addComment={addComment} />}

                    {!writingComment && <Button variant='warning' onClick={() => setWritingComment(true)}> Add A Comment </Button>}

                    <br></br>
                    {(localStorage.getItem('username') === username) &&
                        <Button onClick={() => deletePost(id)} variant='danger'>
                            Delete Post
                            </Button>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default Post