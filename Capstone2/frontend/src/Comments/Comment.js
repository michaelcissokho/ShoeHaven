import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Comment = ({ id, username, body, timecommented, deleteComment }) => {

    return (
        <div>
            <Card style={{ width: '400px' }}>
                <Card.Body>
                    <Card.Text> {username} @ {timecommented} </Card.Text>
                    <Card.Text>{body}</Card.Text>
                    {(localStorage.getItem('username') === username) &&
                        <Button variant='danger' onClick={() => deleteComment(id)}>
                            Delete Comment
                    </Button>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Comment