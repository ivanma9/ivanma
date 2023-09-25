import React from 'react'

export default function ExperienceItem({ image, company, role, description}) {
  return (
		<div className="experienceItem">
            <div className="imageCropper"><img src={image} alt="logo" /></div>
			<h3>{company}</h3>
            <h4>{role}</h4>
            <p>{description}</p>
		</div>
	);
}
