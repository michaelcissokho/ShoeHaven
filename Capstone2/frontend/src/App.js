import React, { useState } from 'react'
import User from './Users/User';
import Listings from './Listings/Listings'
import CreateListingForm from './Listings/CreateListingForm';
import NewPostForm from './Posts/NewPostForm'
import UpdateUserForm from './Users/UpdateUserForm'
import LoginPage from './Users/LoginPage'
import SignupPage from './Users/SignupPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PostPage from './Posts/PostPage'
import Navigation from './Navigation'
import Cart from './Transactions/Cart'
import { ShoeHavenApi as api } from './ShoeHavenApi'
import CheckoutForm from './Transactions/CheckoutForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './UserContext'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  let token = currentUser.token

  //user auth or profile functions
  async function signup(username, password, firstname, lastname, email) {
    let res = await api.request('users/signup', { username, password, firstname, lastname, email }, 'post')
    setCurrentUser(res)
  }
  async function login(username, password) {
    let res = await api.request('users/login', { username, password }, 'post')
    setCurrentUser(res)
  }
  function logout() {
    setCurrentUser({})
    alert('Logged Out')
  }
  async function updateUser(password, firstname, lastname, email) {
    await api.request(`users/${currentUser.username}/update`, { password, firstname, lastname, email }, 'patch', token)
  }

  //listing functions
  async function createListing(title, picture, price, details) {
    await api.request(`listings/new`, { title, picture, price, details, sold: false }, 'post', token)
  }

  async function deleteListing(id) {
    await api.request(`listings/${id}`, {}, 'delete', token)

    alert('Listing Deleted')
  }

  //post functions
  async function createPost(title, body, picture) {
    await api.request(`posts/new`, { title, body, picture }, 'post', token)
  }

  async function deletePost(id) {
    await api.request(`posts/${id}`, {}, 'delete')

    alert('Post Deleted')
  }

  //cart functions
  const [cart, setCart] = useState([])

  function addToCart(cartItem) {
    console.log(cartItem)
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

  console.log(currentUser)

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <BrowserRouter>
          <Navigation logout={logout} />
          <Switch>
            <Route exact path='/login'>
              <LoginPage login={login} />
            </Route>

            <Route exact path='/signup'>
              <SignupPage signup={signup} />
            </Route>

            <Route exact path='/home'>
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
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
