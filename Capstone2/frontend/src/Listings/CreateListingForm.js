import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const CreateListingForm = ({createListing}) => {
    const INITIAL_STATE = {
        title: '',
        picture: '',
        price: '',
        details: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    let history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        const { title, picture, price, details } = formData

        createListing(title, picture, price, details)

        history.push('/home')

        setFormData(INITIAL_STATE)

    }

    const handleChange = (e) => {
        e.preventDefault()

        setFormData(formData => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))
    }

    return (
        <div>
            <h5>Enter Details To Create A Listing</h5>
            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    onChange={handleChange}
                    name='title'
                    value={formData.title}
                    style={{ width: '500px' }}
                    placeholder='Item Name'
                />
                <input
                    type='text'
                    onChange={handleChange}
                    name='picture'
                    value={formData.picture}
                    style={{ width: '500px' }}
                    placeholder='image URL'
                />
                <input
                    type='number'
                    onChange={handleChange}
                    name='price'
                    value={formData.price}
                    placeholder='Price'
                    style={{ width: '500px' }}
                    className="mb-3"
                />
                <textarea
                    rows={10}
                    onChange={handleChange}
                    name='details'
                    value={formData.details}
                    placeholder='Details'
                    style={{ width: '500px' }}
                />
                <br></br>
                <button> Submit </button>
            </form>
        </div>
    )
}

export default CreateListingForm