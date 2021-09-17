import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const CheckoutForm = ({ cart, checkoutItems }) => {
    let total = 0
    for (let item of cart) {
        total += item.price
    }

    const history = useHistory()

    const INITIAL_STATE = {
        firstname: '',
        lastname: '',
        address: '',
        card: '',
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    function handleChange(e) {
        setFormData((formData) => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleSubmit(e) {
        e.preventDefault()

        checkoutItems()

        setFormData(INITIAL_STATE)

        history.push('/home')
    }

    return (
        <div>
            <h3>Cart Total: {total}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='firstname'
                    placeholder='firstname'
                    value={formData.firstname}
                    onChange={handleChange}
                    className='formInput'
                />
                <input
                    type='text'
                    name='lastname'
                    placeholder='lastname'
                    value={formData.lastname}
                    onChange={handleChange}
                    className='formInput'
                />
                <input
                    type='text'
                    name='address'
                    placeholder='address'
                    value={formData.address}
                    onChange={handleChange}
                    className='formInput'
                />
                <input
                    type='text'
                    name='card'
                    placeholder='Card Number'
                    value={formData.card}
                    onChange={handleChange}
                    className='formInput'
                /><br></br>
                <button> Checkout </button>
            </form>
        </div>
    )
}

export default CheckoutForm