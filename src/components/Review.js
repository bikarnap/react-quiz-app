import React from 'react'

const Review = ({ wasLastQuestion, reviews }) => {
  if(wasLastQuestion) {
    return(
      <div>
        Your Quiz review
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