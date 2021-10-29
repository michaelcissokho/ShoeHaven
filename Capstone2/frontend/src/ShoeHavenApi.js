import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000"

class ShoeHavenApi {

    static token

    static async request(endpoint, data = {}, method = 'get') {
        console.debug("API CALL:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        const params = (method === 'get') ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data
        } catch (err) {
            console.error("API error:", err.response);
            let message = err.response.data;
            throw Array.isArray(message) ? message : [message]
        }

    }

    //signup a new user with form data and save username and token in localStorage
    static async signup(username, password, firstname, lastname, email) {
        const response = await this.request('users/signup', { username, password, firstname, lastname, email }, 'post')

        localStorage.setItem('username', response.username)
        localStorage.setItem('token', response.token)

        return response
    }

    //login user with form data and save username and token in localStorage
    static async login(username, password) {
        try {
            const response = await this.request('users/login', { username, password }, 'post')
            localStorage.setItem('username', response.username)
            localStorage.setItem('token', response.token)
            return response
        } catch (err) {
            alert(err[0].error.message)
        }
    }

    //update a user
    static async updateUser(password, firstname, lastname, email) {
        const response = await this.request(
            `users/${localStorage.getItem('username')}/update`,
            { password, firstname, lastname, email },
            'patch'
        )

        return response
    }

    //create a sale
    static async createSale(listingId, seller) {
        const response = await this.request(
            `sales/new`,
            { listingId, seller, buyer: localStorage.getItem('username'), returned: false },
            'post'
        )

        return response
    }
}

export { ShoeHavenApi }