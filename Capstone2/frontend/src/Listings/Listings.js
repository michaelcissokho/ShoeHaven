import React, {useEffect, useState} from 'react'
import Listing from './Listing'
import {ShoeHavenApi as api} from '../ShoeHavenApi'
import {Link} from 'react-router-dom'
import {v4 as uuid} from 'uuid'

const Listings = ({addToCart, deleteListing}) => {
    const [listings, setListings] = useState([])
    useEffect(() => {
        async function pullListings(){
            let res = await api.request(`listings`)
            setListings(res)
        }
        pullListings()
    },[])

    return(
        <div>
            <h1>Listings:</h1>
            <h3><Link to='listings/new'>Create A New Listing </Link></h3>
            {listings.map((listing) => 
            <Listing 
            key={uuid()}
            id={listing.id}
            details={listing.details} 
            picture={listing.picture} 
            price={listing.price} 
            title={listing.title}
            username={listing.username}
            addToCart={addToCart}
            deleteListing={deleteListing}
            />)}
        </div>
    )
}

export default Listings