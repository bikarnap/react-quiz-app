import React from 'react'

const Review = ({ wasLastQuestion, questions }) => {
  if(wasLastQuestion) {
    return(
      <div>
        Your Quiz review
      </div>
    )
  }

  return null
}

export default Review