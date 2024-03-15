import Input from "./Input";
import Button from "./Button";

function Educationfield({ general, handleChange, edit ,onDelete}) {
  return (
    <>
      <div className="heading">
        <h1>Education</h1>
        <button className="delete" onClick={onDelete}>
          Delete
        </button>
      </div>
      <Input
        name="university"
        value={general.university}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Input
        name="startdate"
        value={general.startdate}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Input
        name="enddate"
        value={general.enddate}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Input
        name="location"
        value={general.location}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Input
        name="degree"
        value={general.degree}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      
    </>
  );
}
export default Educationfield;
