import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    isLoading: false,
  }

  handleStartButtonClick = async () => {
    this.setState({isLoading: true})

    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch('https://apis.ccbp.in/assess/questions', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const {history} = this.props
        history.push({
          pathname: '/quiz-game',
          state: {questions: data.questions},
        })
      } else {
        const {history} = this.props
        history.push('/quiz-game')
        // this.renderFailureView()
        throw new Error('Failed to fetch questions')
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
      this.setState({isLoading: false})
      // Optionally show error to user
    }
  }

  renderLoader = () => (
    <div data-testid='loader' className='loader'>
      <Loader type='ThreeDots' color='#0b69ff' height={50} width={50} />
    </div>
  )

  renderHomePageContent = () => (
    <div className='home-page-content'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png'
        alt='start quiz game'
        className='home-image'
      />
      <h1 className='home-heading'>
        How Many Of These Questions Do You Actually Know?
      </h1>
      <p className='home-description'>
        Test yourself with these easy quiz questions and answers
      </p>
      <button
        className='start-button'
        type='button'
        onClick={this.handleStartButtonClick}
        data-testid='start-quiz-button' // Added for testing
      >
        Start Quiz
      </button>
      <div className='warning-container'>
        <img
          className='warning-image'
          alt='warning icon'
          src='https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png'
        />
        <p className='warning-text'>
          All the progress will be lost, if you reload during the quiz
        </p>
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className='home-container'>
        <Header />
        <div className='home-page'>
          {isLoading ? this.renderLoader() : this.renderHomePageContent()}
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
