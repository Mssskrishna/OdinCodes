import Input from "./Input";
function Experiencefield({ general, handleChange, edit, onDelete }) {
  return (
    <>
      <div className="heading">
      <h1>Experience</h1>
      <button className="delete" onClick={onDelete}>Delete</button>
      </div>
      <Input
        name="company"
        value={general.company}
        handleChange={handleChange}
        type="text"
        edit={edit}
      />
      <Input
        name="experience"
        value={general.experience}
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
    </>
  );
}
export default Experiencefield;
