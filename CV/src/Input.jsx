
function Input({ name, handleChange, value, type, edit }) {
    return (
      <div className="form">
        <label>{name}</label>
        <input
          type={type}
          onChange={handleChange}
          name={name}
          value={value}
          disabled={!edit}
        />
      </div>
    );
  }
export default Input;  