import React from "react";
import "../styles/Home.css"

const Home = () => {
	return (
		<div className="home">
			<div className="about">
				<h2> Hi, my name is Ivan</h2>
				<p>A software engineer with a passion for creating alongside practical solutions</p>
			</div>
			<div className="skills">
				<h1>Skills</h1>
				<ol className="list">
					<li className="item">
						<h2>Frontend</h2>
						<span></span>
					</li>
					<li className="item">
						<h2>Backend</h2>
						<span></span>
					</li>
					<li className="item">
						<h2>Languages</h2>
						<span></span>
					</li>
				</ol>
			</div>
		</div>
	);
};

export default Home;
