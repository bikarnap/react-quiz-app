import React, { useEffect, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz'
import Review from './components/Review'

const QUIZ_API = 'https://opentdb.com/api.php?amount=10&type=multiple'
const TOTAL_QUESTIONS = 10
const MAX_SCORE = TOTAL_QUESTIONS * 10

function App() {
  const [ questions, setQuestions ] = useState([])
  const [ currentQuestion, setCurrentQuestion ] = useState('')
  const [ options, setOptions ] = useState([])
  const [ questionNumber, setQuestionNumber ] = useState(0)
  const [ gameOver, setGameOver ] = useState(true)
  const [ score, setScore ] = useState(0)
  const [ disabled, setDisabled ] = useState(false)
  const [ wasLastQuestion, setWasLastQuestion ] = useState(false)
  const [ reviews, setReviews ] = useState([])
  const [ userAnswer, setUserAnswer ] = useState('')
  //const [ nextDisabled, setNextDisabled ] = useState(true)

  useEffect(() => {
    fetch(QUIZ_API)
      .then(response => response.json())
      .then(json => setQuestions(json.results))
  }, [])

  console.log(questions)
  const manageOptions = () => {
    let allOptions = questions[questionNumber].incorrect_answers.concat(
      questions[questionNumber].correct_answer
    )
    return allOptions.sort((a, b) => Math.random() - 0.5)
  }

  const startGame = () => {
    setQuestionNumber(0)
    setScore(0)
    setReviews([])
    setUserAnswer('')
    setDisabled(false)
    setWasLastQuestion(false)
    setCurrentQuestion(questions[questionNumber].question)
    setOptions(manageOptions())
    setGameOver(false)
    setQuestionNumber(prev => prev + 1)
  }

  const nextQuestion = () => {
    if(!gameOver) {
      if(questionNumber > 0 && questionNumber < TOTAL_QUESTIONS) {
        setDisabled(false)
        setCurrentQuestion(questions[questionNumber].question)
        setOptions(manageOptions())
        setQuestionNumber(prev => prev + 1)
        setReviews(reviews.concat({
          question: questions[questionNumber - 1].question, 
          answer: questions[questionNumber - 1].correct_answer, 
          playerAnswer: userAnswer ? userAnswer : "skipped the question"
        }))
      } else {
        setGameOver(true)
        setQuestionNumber(0)
        setWasLastQuestion(true)
      }
    }
  }

  const handleResponse = event => {
    const response = event.target.value
    setUserAnswer(response)
    console.log(response)
    console.log(questions[questionNumber - 1].correct_answer)
    if(response === questions[questionNumber - 1].correct_answer) {
      setScore(prev => prev + 10)
    } else {
      setScore(prev => prev - 5)
    }
    setDisabled(true)
  }

  return(
    <div className="App">
      <h1>Quiz Game</h1>
      <Review reviews={reviews} wasLastQuestion={wasLastQuestion} />
      {
      !gameOver 
        ? <div>
            <p>Question: {questionNumber} / {TOTAL_QUESTIONS}</p> 
            <p>Score: {score} / {MAX_SCORE}</p>
          </div>
        : null
      }
      
      <Quiz
        gameOver={gameOver}
        handleStart={startGame}
        handleNextQuestion={nextQuestion}
        handleResponse={handleResponse}
        question={currentQuestion}
        options={options}
        disabled={disabled}
        wasLastQuestion={wasLastQuestion}
        // nextDisabled={nextDisabled}
      />
      {/* <Quiz
        gameOver={gameOver}
        handleStart={startGame}
        handleNextQuestion={nextQuestion}
        question={currentQuestion}
        options={options}
      /> */}
    </div>
  )
      
      
    
  
}

export default App;
