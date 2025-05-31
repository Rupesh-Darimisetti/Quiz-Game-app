import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import QuizGame from './components/QuizGame'
import GameReport from './components/GameReport'
import GameResult from './components/GameResult'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
    <ProtectedRoute exact path="/game-results" component={GameResult} />
    <ProtectedRoute exact path="/game-report" component={GameReport} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
