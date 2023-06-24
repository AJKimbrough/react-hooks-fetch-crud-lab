import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  /*const [question, setQuestion] = useState([])

  useEffect(
    () => 
      fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestion((question) => (question = questions))), []
      )

      function handleDeleteQuestion(id) {
        const newQestionList = question.filter((ques) => {
          if(ques.id === parseInt(id)) {
            return false
          }
          return true
        })

        fetch(`http://localhost/4000/questions/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }) .then((res) => res.json())
           .then(question => setQuestion(newQestionList))
      }*/

  const handleDeleteClick = async (id) => {
    
    const config = {method: "DELETE"}
    const response = await fetch(`http://localhost:4000/questions/${id}`, config)

    console.log(questions)

    const filteredQuestions = questions.filter(question => question.id !== id)
    setQuestions(filteredQuestions)

  }

  const handleAnswerChange = async (selection,id) => {
    const config = {
      method: "PATCH", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: selection })
    }
    const response = await fetch(`http://localhost:4000/questions/${id}`).then(r => r.json())

    const updatedQuestions = questions.map(question => {
      if(question.id === id) {
        return response
      }
      else return question
    })
    setQuestions(updatedQuestions)
  }


  
  
  const questionMap = questions.map(question => 
    <QuestionItem key={question.id} onAnswerChange={handleAnswerChange} onDeleteClick={handleDeleteClick} question={question}/>  )



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
