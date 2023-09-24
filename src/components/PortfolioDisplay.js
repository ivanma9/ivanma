import React from "react";
import { useParams } from "react-router-dom";
import { ProjectList } from "../helpers/ProjectList";
import { GithubFilled } from "@ant-design/icons";
import "../styles/PortfolioDisplay.css";

export default function PortfolioDisplay() {
	const { id } = useParams();
	const project = ProjectList[id];
	return (
		<div className="project">
			<h1> {project.name} </h1>
			<img src={project.image} alt="Project not shown" />
			<p>
				<b>Skills</b> {project.skills}
			</p>
			<div className="repo">
				<GithubFilled />
				<span> Check out repo </span>
			</div>
		</div>
	);
}
