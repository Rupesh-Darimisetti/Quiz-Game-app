import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar-conainer">
      <ul>
        <li>
          <Link to="/" className="list-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game.png"
              alt="home"
            />
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
