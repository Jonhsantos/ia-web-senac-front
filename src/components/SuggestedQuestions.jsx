export default function SuggestedQuestions({ questions, onSelect }) {
  if (questions.length === 0) return null

  return (
    <div className="suggestions">
      <p>EXPERIMENTE PERGUNTAR</p>
      <div className="suggestion-list">
        {questions.map((question) => (
          <button key={question} type="button" onClick={() => onSelect(question)}>{question}</button>
        ))}
      </div>
    </div>
  )
}
