import React from "react";
import ProjectItem from "./ProjectItem";
import { ProjectList } from "../helpers/ProjectList";
import "../styles/Project.css";

const Portfolio = () => {
	return (
		<section className="projects">
			<h1 className="projectTitle">Portfolio</h1>
			<div className="projectList">
				{ProjectList.map((project, idx) => {
					return (
						<ProjectItem name={project.name} image={project.image} id={idx} />
					);
				})}
			</div>
		</section>
	);
};

export default Portfolio;
