import React from 'react'

const Review = ({ wasLastQuestion, reviews, rightAnswer, wrongAnswer }) => {
  if(wasLastQuestion) {
    return(
      <div>
        Your Quiz review
        <p>{rightAnswer} correct answers, {wrongAnswer} incorrect answers</p>
        <div>
          {reviews.map(review => 
          <div key={review.question}>
            <p>Question: {review.question}</p>
            <p>Answer: {review.answer}</p>
            <p>Your answer: {review.playerAnswer}</p>
          </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

export default Review