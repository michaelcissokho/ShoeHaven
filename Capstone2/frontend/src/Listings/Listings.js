import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext'
import Listing from './Listing'
import { ShoeHavenApi as api } from '../ShoeHavenApi'
import { v4 as uuid } from 'uuid'
import { Container, Row } from 'react-bootstrap'

const Listings = ({ addToCart, deleteListing }) => {
    const currentUser = useContext(UserContext)
    let token = currentUser.token

    const [listings, setListings] = useState([])
    useEffect(() => {
        async function pullListings() {
            let res = await api.request(`listings`,{},'get',token)
            setListings(res.filter((item) => item.sold === false))
        }
        pullListings()
    }, [token])

    return (
        <div>
            <h1>
                Listings:
            </h1>
            <Container>
                <Row xs={4}>
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
                </Row>
            </Container>
        </div>
    )
}

export default Listings