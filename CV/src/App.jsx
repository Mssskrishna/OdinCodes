import { useState } from "react";
import GeneralForm from "./Generalform.jsx";
import EducationForm from "./Educationform.jsx";
import Experienceform from "./Experienceform.jsx";
import Layout from "./Layout.jsx";

function App() {
  const [edit, seEdit] = useState(true);
  const [general, setgeneral] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",

  });

  const [experiences, setexperiences] = useState([
    {
      company: "",
      experience: "",
      startdate: "",
      enddate: "",
      location: "",
    },
  ]);
  const [educations, seteducations] = useState([
    {
      university: "",
      startdate: "",
      enddate: "",
      degree: "",
      location:""
    },
  ]);
  return (
    <div className="cvapp">
      <div>
        <GeneralForm general={general} setgeneral={setgeneral} />
        <EducationForm
          educations={educations}
          seteducations={seteducations}
          edit={edit}
          setEdit={seEdit}
        />
        <Experienceform
          experiences={experiences}
          setexperiences={setexperiences}
          edit={edit}
          setEdit={seEdit}
        />
      </div>
      <Layout general={general} educations={educations} experiences={experiences}/>
    </div>
  );
}
export default App;
