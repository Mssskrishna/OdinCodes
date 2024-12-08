import React, { useState, useEffect } from "react";
import InputElement from "./InputElement";

const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: [] });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedFields = JSON.parse(localStorage.getItem("fields")) || [];
    const savedFormData = JSON.parse(localStorage.getItem("formData")) || {
      title: "",
      body: [],
    };
    setFields(savedFields);
    setFormData(savedFormData);
  }, []);

  // Save fields to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(fields));
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [fields, formData]);

  // Add new field
  const addParagraph = () => {
    setFields([...fields, { id: Date.now(), value: "" }]);
  };

  // Handle input changes
  const handleChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      body: updatedFields.map((field) => field.value),
    }));
  };

  // Handle title change
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prevData) => ({ ...prevData, title }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "max(300px,50%)", padding: "10px" }}
    >
      {/* Static Input for Title */}
      <InputElement label={"Title"} name={"title"} key={"1"} handleChange={handleTitleChange}/>
      

      {/* Dynamic Input Fields */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>Paragraph {index + 1}:</label>
          <input
            type="text"
            value={field.value}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}

      {/* Button to Add New Field */}
      <input
        type="button"
        value="Add Paragraph"
        onClick={addParagraph}
      />

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
