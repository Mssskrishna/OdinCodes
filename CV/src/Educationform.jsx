import { useState } from "react";
// import Input from "./Input";
import Button from "./Button";
import Educationfield from "./Educationfield";
function EducationForm({ educations, seteducations }) {
  const [edit, setEdit] = useState(true);
  const onDelete = (index) => {
    const neweducation = [...educations];
    neweducation.splice(index, 1);
    seteducations(neweducation);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...educations];
    newEducation[index][name] = value;
    seteducations(newEducation);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const changeEdit = () => {
    setEdit(true);
  };

  const handleAddeducation = () => {
    seteducations([
      ...educations,
      {
        university: "",
        startdate: "",
        enddate: "",
        degree: "",
        location:""
      },
    ]);
  };

  const clear = () => {
    seteducations([
      {
        university: "",
        startdate: "",
        enddate: "",
        location:"",
        degree: "",
      },
    ]);
  };
  return (
    <div>
      {educations.map((education, index) => (
        <div key={index} className="container">
          <Educationfield
            general={education}
            handleChange={(e) => handleChange(e, index)}
            edit={edit}
            onDelete={onDelete}
          />

          <Button
            handleSubmit={handleSubmit}
            changeEdit={changeEdit}
            clear={clear}
          />
        </div>
      ))}

      <button onClick={handleAddeducation}>Add Education</button>
    </div>
  );
}

export default EducationForm;
