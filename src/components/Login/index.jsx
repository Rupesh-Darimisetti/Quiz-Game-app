import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isPasswordVisible: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => this.setState({showSubmitError: true, errorMsg})

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          placeholder="username"
          className="user-input"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasword = () => {
    const {password, isPasswordVisible} = this.state

    return (
      <>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="user-input"
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  togglePassowrdVisibility = () => {
    const {isPasswordVisible} = this.state
    this.setState({isPasswordVisible: !isPasswordVisible})
  }

  showPassword = () => (
    <>
      <input
        type="checkbox"
        onChange={this.togglePassowrdVisibility}
        id="showPassword"
      />
      <label htmlFor="showPassword">Show Password</label>
    </>
  )

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) return <Redirect to="/" />
    return (
      <div className="quiz-app-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-img.png"
            alt="login website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPasword()}</div>
            <div className="checkbox-container">{this.showPassword()}</div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
