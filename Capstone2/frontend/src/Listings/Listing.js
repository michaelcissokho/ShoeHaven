import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'

const Listing = ({ id, username, title, picture, price, details, addToCart, deleteListing }) => {

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header> Seller: {username} </Card.Header>
                <Card.Img variant="top" src={picture} alt='Cool Listing' />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{details}</Card.Text>
                    <Card.Text>Price: ${price}</Card.Text>
                    <Row>
                        <Button as={Col} onClick={() => addToCart({ id, username, title, picture, price })} variant="success">
                            Add To Cart
                    </Button>
                        {(localStorage.getItem('username') === username) &&
                            <Button as={Col} onClick={() => deleteListing(id)}
                                variant='danger'>
                                Delete Listing
                        </Button>}
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}


export default Listing