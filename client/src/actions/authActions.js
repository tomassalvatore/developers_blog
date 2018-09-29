// HTTP requests (AXIOS)
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register user
export const registerUser = (userData, history) => dispatch => {
  // We added: "proxy": "http://localhost:5000" to package.json
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

// Login user - GET user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data
      // Set token to local storage
      localStorage.setItem('jwtToken', token)
      // Set token to auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to an empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}