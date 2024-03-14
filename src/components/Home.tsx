import React, { useRef } from "react";
import "../styles/Home.css";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import img1 from "../assets/UCLA_GRAD_chill.jpg";
const section_data = [img1];

const useParallax = (value: MotionValue<number>, distance: number) =>
	useTransform(value, [0, 1], [-distance, distance]);

const Section = ({ id }: { id: String }) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useParallax(scrollYProgress, 300);

	return (
		<section>
			<div ref={ref}>
				<img width={100} src={`${id}`} alt="Item" />
			</div>
			<motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
		</section>
	);
};

const Home = () => {
	return (
		<>
			{section_data.map((image) => (
				<Section id={image} />
			))}
		</>
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
