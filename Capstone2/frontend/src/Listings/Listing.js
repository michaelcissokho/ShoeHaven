import React from 'react'

const Listing = ({id, username, title, picture, price, details, addToCart, deleteListing}) => {
    return(
        <div>
            <h6> {username} </h6>
            <h5> {title} </h5>
            <img src={picture} alt='Cool Listing Pic'/>
            <h3> {price} </h3>
            <p> {details} </p>
            <button onClick={() => addToCart({id, username, title, picture, price})}> Add To Cart </button>
            {(localStorage.getItem('username') === username) && <button onClick={() => deleteListing(id)}>Delete Listing</button> }
        </div>
    )
}


export default Listing