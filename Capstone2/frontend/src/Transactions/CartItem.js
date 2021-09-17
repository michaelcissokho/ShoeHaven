import React from 'react'

const CartItem = ({id, username, title, picture, price, removeFromCart}) => {
    return(
        <div>
            <h3>{title}</h3>
            <img src={picture} alt="Cart Item"/>
            <p><b>{price}</b></p>
            <h6>Seller:{username}</h6>
            <button onClick={() => removeFromCart(id)}> Remove From Cart </button>
        </div>
    )
}

export default CartItem