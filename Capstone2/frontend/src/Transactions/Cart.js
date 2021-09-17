import React from 'react'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {v4 as uuid} from 'uuid'

const Cart = ({items, removeFromCart}) => {

    return(
        <div>
            {items.map((item) => (
                          <CartItem 
                          key={uuid()} 
                          id={item.id} 
                          title={item.title} 
                          picture={item.picture} 
                          price={item.price} 
                          removeFromCart={removeFromCart}
                          />
            ))}
            <Link to='/checkout'>Checkout</Link>
        </div>
    )

}

export default Cart