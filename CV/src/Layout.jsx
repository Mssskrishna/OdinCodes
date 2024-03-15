function Layout({ general, educations, experiences }) {
  return (
    <div className="cvlayout">
      <div className="Maintitle">
        <h1 className="title">{general.fullname}</h1>
        <div className="submain">
          {general.phone !== "" && <h3>+91-{general.phone}</h3>}
          <h3>{general.email}</h3>
          <h3>{general.location}</h3>
        </div>
        <div className="Education">
          <h2>Education</h2>
          {educations.map((education, index) => (
            <div key={index}>
              <h3>
                {education.university} {education.startdate}-{education.enddate}
              </h3>
              <h3>{education.location}</h3>
              <h3>{education.degree}</h3>
            </div>
          ))}
        </div>
        <div className="Expereince">
          <h2>Experience</h2>
          {experiences.map((experience, index) => (
            <div key={index}>
              <h3>
                {experience.company} {experience.startdate}-{experience.enddate}
              </h3>
              <h3>{experience.location}</h3>
              <h3>{experience.experience}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Layout;
