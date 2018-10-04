import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// Check prop types
import PropTypes from 'prop-types'
// Connect to redux
import { connect } from 'react-redux'
// Import actions
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
import Planet from '../../img/icons/planet-earth.png'

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser()
    this.props.clearCurrentProfile()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const authLinks = (
      <a style={{ textDecoration: 'none' }} onClick={this.onLogoutClick}>
        <Button>LogOut</Button>
      </a>
    )

    const guestLinks = (
      <div>
        <Link style={{ textDecoration: 'none' }} to="/register">
          <Button>Sign Up</Button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    )

    return (
      <Nav>
        <img src={Planet} style={{ width: 30, marginRight: 10 }} />

        <Link style={{ textDecoration: 'none' }} to="/">
          <Logo>
            Dev
            <span style={{ color: 'rgb(245, 173, 57)' }}>Connector</span>
          </Logo>
        </Link>
        <Button first>Developers</Button>
        {isAuthenticated ? authLinks : guestLinks}
      </Nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile,
  }
)(Navbar)

/*

  Styles

*/

const Nav = styled.nav`
  position: relative;
  background-color: white;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  // background-color: rgba(240, 245, 248);
`

const Logo = styled.span`
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  font-size: 22px;
  :hover {
    cursor: pointer;
  }
`

const Button = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  margin-left: ${props => (props.first ? '40px' : '15px')};
  transition: all ease-in-out 100ms;

  :hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.4);
  }
`
