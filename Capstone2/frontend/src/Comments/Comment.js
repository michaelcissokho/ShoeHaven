import React from 'react'

const Comment = ({ id, username, body, timecommented, deleteComment }) => {

    return (
        <div>
            <h5> {username} :</h5>
            <span>{body}</span>
            <h6>{timecommented}</h6>
            {localStorage.getItem('username')===username && <button onClick={()=>deleteComment(id)}> Delete Comment </button>}
        </div>
    )
}

export default Comment