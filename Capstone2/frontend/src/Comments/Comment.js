import React, {useContext} from 'react'
import { Card, Button } from 'react-bootstrap'
import UserContext from '../UserContext'

const Comment = ({ id, username, body, timecommented, deleteComment }) => {
    const currentUser = useContext(UserContext)

    return (
        <div>
            <Card style={{ width: '400px' }}>
                <Card.Body>
                    <Card.Text> {username} @ {timecommented} </Card.Text>
                    <Card.Text>{body}</Card.Text>
                    {(currentUser.username === username) &&
                        <Button variant='danger' onClick={() => deleteComment(id)}>
                            Delete Comment
                    </Button>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Comment