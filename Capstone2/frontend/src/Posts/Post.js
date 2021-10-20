import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../UserContext'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import Comment from '../Comments/Comment'
import { v4 as uuid } from 'uuid'
import CreateCommentForm from '../Comments/CreateComment'
import { Card, Button } from 'react-bootstrap'

const Post = ({ id, username, title, body, picture, deletePost }) => {
    const currentUser = useContext(UserContext)
    let token = currentUser.token

    const [comments, setComments] = useState([])
    const [writingComment, setWritingComment] = useState(false)

    useEffect(() => {
        async function getCommentsForPost() {
            const response = await api.request(`posts/${id}/comments`, {}, 'get', token)

            setComments(response)
        }
        getCommentsForPost()
    }, [id, token, writingComment])

    async function addComment(body) {
        await api.request(`comments/new`, { postId: id, body }, 'post', token)

        setWritingComment(false)
    }

    async function deleteComment(id) {
        await api.request(`comments/${id}`, {}, 'delete', token)
        setComments(comments.filter((comment) => comment.id !== id))
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
                    {(currentUser.username === username) &&
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