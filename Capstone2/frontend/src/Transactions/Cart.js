import React from 'react'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import {Button} from 'react-bootstrap'

const Cart = ({items, removeFromCart}) => {
    return(
        <div>
            <h1>Cart:</h1>
            {items.map((item) => (
                          <CartItem 
                          key={uuid()} 
                          id={item.id}
                          username={item.username} 
                          title={item.title} 
                          picture={item.picture} 
                          price={item.price} 
                          removeFromCart={removeFromCart}
                          />
            ))}
            <br></br><br></br>
            <Button as={Link} to='/checkout' variant='success'>
                Checkout
            </Button>
        </div>
    )

}

export default Cart