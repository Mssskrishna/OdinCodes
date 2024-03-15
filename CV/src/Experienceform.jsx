import { useState } from "react";
// import Input from "./Input";
import Button from "./Button";
import Experiencefield from "./Experiencefield";
function Experienceform({ experiences, setexperiences }) {
  const [edit, setEdit] = useState(true);
  const onDelete = (index) => {
    const newexperience = [...experiences];
    newexperience.splice(index, 1);
    setexperiences(newexperience);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newexperience = [...experiences];
    newexperience[index][name] = value;
    setexperiences(newexperience);
  };
  const addexperience = () => {
    setexperiences([
      ...experiences,
      {
        company: "",
        experience: "",
        startdate: "",
        enddate: "",
        location: "",
      },
    ]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const changeEdit = () => {
    setEdit(true);
  };
  const clear = () => {
    setexperiences([{
      company: "",
      experience: "",
      startdate: "",
      enddate: "",
      location: "",
    }]);
  };

  return (
    <div >
      {experiences.map((experience, index) => (
        <div className="container" key={index}>
          <Experiencefield
            handleChange={(e) => handleChange(e, index)}
            edit={edit}
            general={experience}
            onDelete={onDelete}
          />
          <Button
            changeEdit={changeEdit}
            clear={clear}
            handleSubmit={handleSubmit}
          />
        </div>
      ))}
      <button onClick={addexperience}>Add Experience</button>
    </div>
  );
}
export default Experienceform;
