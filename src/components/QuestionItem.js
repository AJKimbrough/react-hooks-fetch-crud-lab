import React from "react";

function QuestionItem({ question, onDeleteClick }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function changeAnswer(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(event.target.value)
      })
    })
  }

  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={changeAnswer} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => onDeleteClick(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
