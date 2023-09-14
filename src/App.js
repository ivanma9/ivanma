import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import Layout from "antd";


function App() {
	return (

		<div className="App">
			<div>
				<div className="navbar">
					<div className="toggleButton">
						<button></button>
					</div>
					<div className="links">
					
							<Link to="/">Home</Link>
							<Link to="/about">About</Link>
							<Link to="/portfolio">Portfolio</Link>
							<Link to="/contact">Contact</Link>
					</div>
				</div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/portfolio">Portfolio</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
