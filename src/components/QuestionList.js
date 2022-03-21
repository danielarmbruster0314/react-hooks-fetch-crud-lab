import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({question}) {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
      fetch(' http://localhost:4000/questions')
      .then((resp) => resp.json())
      .then((data) => {setQuestions(data)
      })
  }, [])


function handleDeletQuestion(id){
  fetch(`http://localhost:4000/questions/${id}`,{
    method: 'DELETE',
  })
  .then((resp) => resp.json())
  .then(() => {
    const newStateOfQuestions = questions.filter((q) => q.id !== id)
    setQuestions(newStateOfQuestions)
  })
}

function handleTheNewAnswer(id, index){
  fetch(`http://localhost:4000/questions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify({
      correctIndex: index
    })
  })
  .then((resp) => resp.json())
  .then((data) => {
    const updatedList =questions.map((item) =>{
      if(item.id === data.id) return data;
      return item
    })
    setQuestions(updatedList)
  })
}

  const items = questions.map((item)=>{
    return (
      <QuestionItem 
      key={item.id}
      question={item}
      onDelete={handleDeletQuestion}
      onUpdate={handleTheNewAnswer}
      />
    )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {items}
        </ul>
    </section>
  );
}

export default QuestionList;
