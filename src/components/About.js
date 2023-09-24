import React from "react";
import ExpTimeline from "../helpers/ExpTimeline";
import "../styles/Home.css";

const About = () => {
	return (
		<section>
			<div className="experience">
				<h1>Experience</h1>
				<ExpTimeline />
			</div>
			<div className="skills">
				<h1>Skills</h1>
				<ol className="list">
					<li className="item">
						<h2>Frontend</h2>
						<span>
							ReactJS, Redux, React Native, HTML, CSS, MaterialUI, AntDesignUI,
							Flutter
						</span>
					</li>
					<li className="item">
						<h2>Backend</h2>
						<span>
							MongoDB, Express, NodeJS, SQL, Airflow, Apache Spark, Tensorflow,
							Pytorch, Continuous Integration, Continuous Development
						</span>
					</li>
					<li className="item">
						<h2>Languages</h2>
						<span>
							Java, Python, Javascript, Typescript, C/C++, Scala, Dart, Swift
						</span>
						<h4>Speaking Global Affairs</h4>
						<span>English, Spanish, Mandarin, Japanese</span>
					</li>
					<li className="item">
						<h2>AWS</h2>
						<span>
							Lambda, CloudWatch, CloudFormation, Cloud Development Kit (CDK),
							Virtual Private Cloud (VPC), EC2, S3, EMR Clusters, IAM, Glue,
							Athena, ElasticSearch, CodeDeploy
						</span>
					</li>
					<li className="item">
						<h2>Other</h2>
						<span>
							Git, REST API, Tableau, JUnit, Agile, Scrum, Jupyter, Natural
							Language Processing, Artificial Intelligence, Machine Learning
						</span>
					</li>
				</ol>
			</div>
		</section>
	);
};

export default About;
