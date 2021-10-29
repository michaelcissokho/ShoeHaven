import React, { useState } from 'react'
import Home from './Home'
import User from './Users/User';
import Listings from './Listings/Listings'
import CreateListingForm from './Listings/CreateListingForm';
import NewPostForm from './Posts/NewPostForm'
import UpdateUserForm from './Users/UpdateUserForm'
import LoginPage from './Users/LoginPage'
import SignupPage from './Users/SignupPage'
import { Route, Switch } from 'react-router-dom'
import PostPage from './Posts/PostPage'
import Navigation from './Navigation'
import Cart from './Transactions/Cart'
import { ShoeHavenApi as api } from './ShoeHavenApi'
import CheckoutForm from './Transactions/CheckoutForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //user auth or profile functions
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('username'))

  async function signup(username, password, firstname, lastname, email) {
    await api.signup(username, password, firstname, lastname, email)
    setUserLoggedIn(localStorage.getItem('username'))
  }

  async function login(username, password) {
    await api.login(username, password)
    setUserLoggedIn(localStorage.getItem('username'))
    return new Promise((resolve, reject) => {
      resolve()
    });
  }

  function logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    alert('Logged Out')
    setUserLoggedIn(localStorage.getItem('username'))
  }

  async function updateUser(password, firstname, lastname, email) {
    await api.updateUser(password, firstname, lastname, email)
  }

  //listing functions
  async function createListing(title, picture, price, details) {
    await api.request(`listings/new`, { title, picture, price, details, sold: false }, 'post')
  }

  async function deleteListing(id) {
    await api.request(`listings/${id}`, {}, 'delete')

    alert('Listing Deleted')
  }

  //post functions
  async function createPost(title, body, picture) {
    await api.request(`posts/new`, { title, body, picture }, 'post')
  }

  async function deletePost(id) {
    await api.request(`posts/${id}`, {}, 'delete')

    alert('Post Deleted')
  }

  //cart functions
  const [cart, setCart] = useState([])

  function addToCart(cartItem) {
    setCart(cart => (
      [
        ...cart,
        cartItem
      ]
    ))

    alert('Added To Cart')
  }

  function removeFromCart(id) {
    setCart(
      cart.filter(cartItem => (cartItem['id'] !== id))
    )
  }
  async function checkoutItems() {
    for (let item of cart) {
      await api.createSale(item.id, item.username)
    }
    setCart([])
  }

  return (
    <div className="App">
        <Navigation logout={logout} userLoggedIn={userLoggedIn}/>
        <Switch>
          <Route exact path='/'>
            <Home userLoggedIn={userLoggedIn}/>
          </Route>
          <Route exact path='/login'>
            <LoginPage login={login} />
          </Route>

          <Route exact path='/signup'>
            <SignupPage signup={signup} />
          </Route>

          <Route exact path='/listings'>
            <Listings addToCart={addToCart} deleteListing={deleteListing} />
          </Route>

          <Route exact path='/posts'>
            <PostPage deletePost={deletePost} />
          </Route>

          <Route exact path='/posts/new'>
            <NewPostForm createPost={createPost} />
          </Route>

          <Route exact path='/users/:username'>
            <User />
          </Route>

          <Route exact path='/listings/new'>
            <CreateListingForm createListing={createListing} />
          </Route>

          <Route exact path='/:username/update'>
            <UpdateUserForm updateUser={updateUser} />
          </Route>

          <Route exact path='/cart'>
            <Cart items={cart} removeFromCart={removeFromCart} />
          </Route>

          <Route exact path='/checkout'>
            <CheckoutForm cart={cart} checkoutItems={checkoutItems} />
          </Route>

        </Switch>
    </div>
  );
}

export default App;
