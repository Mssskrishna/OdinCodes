import { useState } from "react";

function Form({ labels, handleSubmit, onInputChange, formState, edit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Received ${name} with value ${value}`);
    onInputChange(name, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(labels).map(([iterator, typeInout]) => (
        <div key={iterator} className="form">
          <label htmlFor={iterator}>{iterator}</label>
          <input
            type={typeInout}
            onChange={handleChange}
            name={iterator}
            id={iterator}
            value={formState[iterator]}
            disabled={!edit}
          />
        </div>
      ))}
    </form>
  );
}

function Buttons({ handleSubmit, changeEdit }) {
  return (
    <div className="buttons">
      <button
        type="submit"
        style={{ backgroundColor: "rgb(0,256,0,0.5)" }}
        onClick={handleSubmit}
      >
        Submit
      </button>

      <button
        onClick={changeEdit}
        style={{ backgroundColor: "rgb(256,256,0,0.5)" }}
      >
        Edit
      </button>
    </div>
  );
}

function Display({ thing }) {
  return <h1>{thing}</h1>;
}

function Education({ educationFormstate, onInputChange }) {
  const [edit, setEdit] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const changeEdit = () => {
    setEdit(true);
  };

  return (
    <div className="container">
      <Form
        labels={educationFormstate}
        onInputChange={onInputChange}
        handleSubmit={handleSubmit}
        edit={edit}
        formState={educationFormstate}
      />
      <Buttons handleSubmit={handleSubmit} changeEdit={changeEdit} />
      
    </div>
  );
}

function General({ generalformState, onInputChange }) {
  const [edit, setEdit] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const changeEdit = () => {
    setEdit(true);
  };

  return (
    <div className="container">
      <Form
        labels={generalformState}
        onInputChange={onInputChange}
        handleSubmit={handleSubmit}
        formState={generalformState}
        edit={edit}
      />
      <Buttons handleSubmit={handleSubmit} changeEdit={changeEdit} />
    </div>
  );
}

function App() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    phone: 0,
  });
  const [educationFormstate, seteducationFormstate] = useState({
    university: "",
    startdate: "",
    enddate: "",
    degree: "",
  });

  const onInputGeneralChange = (name, value) => {
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onInputeducationChange = (name, value) => {
    seteducationFormstate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mainbody">
      <div className="left">
        <General
          generalformState={formState}
          onInputChange={onInputGeneralChange}
        />
        <Education
          educationFormstate={educationFormstate}
          onInputChange={onInputeducationChange}
        />
        {/* <button onClick={Education}>Add</button> */}
      </div>
      <div className="right">
        {Object.entries(formState).map(([kile, value]) => (
          <Display key={value} thing={value} />
        ))}
        {Object.entries(educationFormstate).map(([kile, value]) => (
          <Display key={value} thing={value} />
        ))}
      </div>
    </div>
  );
}

export default App;
