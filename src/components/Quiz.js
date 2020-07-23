import React from 'react'

const Quiz = (props) => {
  const { gameOver, question, options, handleStart, handleNextQuestion, handleResponse, disabled, wasLastQuestion } = props
  if(gameOver) {
    return(
      <button onClick={handleStart}>{wasLastQuestion ? 'Play Again' : 'Start Quiz'}</button>
    )
  }
  return(
    <div>
      <p>{question}</p>
      <div>
        {options.map(option => <p key={option}><button onClick={handleResponse} value={option} disabled={disabled}>{option}</button></p>)}
      </div>
      <div>
        <button onClick={handleNextQuestion}>next question</button>
      </div>
    </div>
  )
}

export default Quiz