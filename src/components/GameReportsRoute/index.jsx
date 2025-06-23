import {useLocation} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReportsRoute = () => {
  const location = useLocation()
  const {questions = [], ttlQns = 0} = location.state || {}

  const getUnattemptedQuestions = () =>
    questions.filter(question => question.slctOptId === null)

  const getCorrectAnswersCount = () =>
    questions.filter(question => question.slctOptId === question.crctOptId)
      .length

  const getIncorrectQuestionsCount = () =>
    questions.filter(
      question =>
        question.slctOptId !== null &&
        question.slctOptId !== question.crctOptId,
    ).length

  const renderUnattemptedQuestions = () => {
    const unattemptedQuestions = getUnattemptedQuestions()
    if (unattemptedQuestions.length === 0) {
      return (
        <div className="unattempted-questions-container">
          <h1>Attempted all the questions</h1>
        </div>
      )
    }
    return (
      <div className="unattempted-questions-container">
        <h2>Unattempted Questions</h2>
        {unattemptedQuestions.map(question => (
          <ul key={question.id} className="question-container">
            <h3>{question.question}</h3>
            {question.options.map((option, index) => {
              const isCorrect = option.id === question.crctOptId

              if (question.optionType === 'DEFAULT') {
                return (
                  <li
                    key={option.id}
                    className={`option ${isCorrect ? 'correct' : ''}`}
                  >
                    <span>{`${String.fromCharCode(65 + index)}. `}</span>
                    <button
                      className={`option ${isCorrect ? 'correct' : ''}`}
                      aria-label={option.text}
                      type="button"
                    >
                      {option.text}
                      {isCorrect && (
                        <img
                          className="option-icon"
                          alt="correct checked circle"
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        />
                      )}
                    </button>
                  </li>
                )
              }

              if (question.optionType === 'SINGLE_SELECT') {
                return (
                  <li
                    key={option.id}
                    className="option-container single-select"
                  >
                    {isCorrect ? (
                      <input
                        type="radio"
                        id={option.id}
                        name={`singleSelectOption-${question.id}`}
                        className="single-select-radio"
                        aria-label={option.text}
                        checked
                      />
                    ) : (
                      <input
                        type="radio"
                        id={option.id}
                        name={`singleSelectOption-${question.id}`}
                        className="single-select-radio"
                        aria-label={option.text}
                        disabled
                      />
                    )}

                    <label htmlFor={option.id} className="single-select-label">
                      <span>{option.text}</span>
                      {isCorrect && (
                        <img
                          className="option-icon"
                          alt="correct checked circle"
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        />
                      )}
                    </label>
                  </li>
                )
              }

              if (question.optionType === 'IMAGE') {
                return (
                  <li
                    key={option.id}
                    className={`option ${isCorrect ? 'correct' : ''}`}
                  >
                    <button
                      className={`option ${isCorrect ? 'correct' : ''}`}
                      aria-label={option.text}
                      type="button"
                    >
                      <img
                        src={option.url}
                        alt={option.text}
                        className="option-image"
                      />
                      {isCorrect && (
                        <img
                          className="option-icon"
                          alt="correct checked circle"
                          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        />
                      )}
                    </button>
                  </li>
                )
              }

              return null
            })}
          </ul>
        ))}
      </div>
    )
  }

  const CorrectAnswers = getCorrectAnswersCount()
  const IncorrectAnswers = getIncorrectQuestionsCount()
  const Unattempted = getUnattemptedQuestions().length

  return (
    <div className="page-container">
      <Header />
      <div className="report-container">
        <div className="score-board">
          <div className="score-container">
            <div className="score-circle">
              <p>
                <span className="score">{CorrectAnswers}</span>/{ttlQns}
              </p>
            </div>
            <div className="score-details">
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="score-icon"
                />
                <p className="count">{CorrectAnswers} Correct answers</p>
              </div>
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="score-icon"
                />
                <p className="count">{IncorrectAnswers} Incorrect answers</p>
              </div>
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="score-icon"
                />
                <p className="count">{Unattempted} Unattempted</p>
              </div>
            </div>
          </div>
          {renderUnattemptedQuestions()}
        </div>
      </div>
    </div>
  )
}

export default GameReportsRoute
