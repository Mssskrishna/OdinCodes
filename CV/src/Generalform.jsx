import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
function GeneralForm({general,setgeneral}) {
  const [edit, seEdit] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setgeneral((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    seEdit(false);
  };

  const changeEdit = () => {
    seEdit(true);
  };
  const clear = () => {
    setgeneral({
      fullname: "",
      location: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="container">
      <h1>Personal</h1>
      <Input
        name="fullname"
        value={general.fullname}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Input
        name="email"
        value={general.email}
        handleChange={handleChange}
        type="email"
        edit={edit}
      />
      <Input
        name="phone"
        value={general.phone}
        handleChange={handleChange}
        type="tel"
        edit={edit}
      />
      <Input
        name="location"
        value={general.location}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Button
        handleSubmit={handleSubmit}
        changeEdit={changeEdit}
        clear={clear}
      />
    </div>
  );
}
export default GeneralForm;
