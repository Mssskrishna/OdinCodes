import React from "react";

function InputElement({ label, type, name, handleChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        flexDirection: "column",
        marginBottom: "10px",
      }}
    >
      <label htmlFor={label} style={{ fontSize: "20px", fontWeight: "bolder" }}>
        {label}
      </label>
      <textarea
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        // cols={35}
        rows={7}
      />
    </div>
  );
}

export default InputElement;
