import React from 'react'
import {Card, Button} from 'react-bootstrap'

const CartItem = ({ id, username, title, picture, price, removeFromCart }) => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={picture} alt='Cool Listing' />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>${price}</Card.Text>
                    <Button variant='warning' onClick={() => removeFromCart(id)}> Remove From Cart </Button>
                </Card.Body>
                <Card.Footer>Seller: {username} </Card.Footer>
            </Card>
        </div>
    )
}

export default CartItem