import React, { useRef } from "react";
import "../styles/Home.css";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import img1 from "../assets/UCLA_GRAD_chill.jpg";
import img2 from "../assets/Step.svg";
import { HomeSection, SectionType } from "../helpers/util";

const section_data: HomeSection[] = [
	{
		content: img1,
		type: "Image",
		caption: "UCLA B.S. in Computer Science",
	},
	{
		content: img2,
		type: "Image",
		caption: "Gen AI Startup",
	},
];

const useParallax = (value: MotionValue<number>, distance: number) =>
	useTransform(value, [0, 1], [-distance, distance]);

const Section = ({ section }: { section: HomeSection }) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useParallax(scrollYProgress, 300);

	return (
		<section
			style={{
				margin: 250,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div ref={ref}>
				<img width={600} src={`${section.content}`} alt="Item" />
			</div>
			<motion.h2
				style={{
					y,
					color: "white",
					backgroundColor: "#2A2A2A",
					width: 1900,
					height: 100,
					display: "flex",
					alignItems: "center",
					justifyContent: "right",
					padding: 50,
					opacity: 0.6,
				}}
			>{`${section.caption}`}</motion.h2>
		</section>
	);
};

const Home = () => {
	return (
		<div
			style={{
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{section_data.map((sec) => (
				<Section section={sec} />
			))}
		</div>
	);
};

const data = () => {
	return (
		<motion.div
			className="home"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			style={{ scaleX: 10 }}
		>
			<div className="about">
				<h2> Hi, my name is Ivan</h2>
				<p className="prompt">
					A software engineer with a passion for creating alongside practical
					solutions
				</p>
			</div>
		</motion.div>
	);
};

export default Home;
