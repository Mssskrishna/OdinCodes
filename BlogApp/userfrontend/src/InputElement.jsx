import propTypes from "prop-types";

function InputElement({ label, type, name, set }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={(e) => {
          set(e.target.value);
        }}
      />
    </div>
  );
}

export default InputElement;

