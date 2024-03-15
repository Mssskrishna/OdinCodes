function Button({ changeEdit, handleSubmit,clear }) {
    return (
      <div className="buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={changeEdit}>Edit</button>
        <button onClick={clear}>Clear</button>
      </div>
    );
  }
export default Button;  