import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import { Layout } from "antd";
import { MenuOutlined, LinkedinOutlined, GithubOutlined, MailOutlined } from "@ant-design/icons";
import "./styles/Navbar.css";
import "./styles/Footer.css";


const { Header, Content, Footer, Sider } = Layout;

function App() {
	const [expandNavbar, setExpandedNavbar] = useState(false);

	const location = useLocation();

	useEffect(() => {
		setExpandedNavbar(false);
	}, [location])

	return (
		<div className="App">
			<Layout>
				<Header>header</Header>
				<Layout>
					<Sider>left sidebar</Sider>
					<Content>
						<div>
							<div className="navbar" id={expandNavbar ? "open" : "close"}>
								<div className="toggleButton">
									<button
										onClick={() => {
											setExpandedNavbar((prev) => !prev);
										}}
									>
										<MenuOutlined />
									</button>
								</div>
								<div className="links">
									<Link to="/">Home</Link>
									<Link to="/about">About</Link>
									<Link to="/portfolio">Portfolio</Link>
									<Link to="/contact">Contact</Link>
								</div>
							</div>

							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/about" element={<About />} />
								<Route path="/portfolio" element={<Portfolio />} />
								<Route path="/contact" element={<Contact />} />
							</Routes>
						</div>
					</Content>
					<Sider>right sidebar</Sider>
				</Layout>
				<Footer>
					<div className="footer">
						<div className="socialMedia">
							<Link to="https://www.linkedin.com/in/ivan-ma9/">
								<LinkedinOutlined />
							</Link>
							<Link to="https://github.com/ivanma9">
								<GithubOutlined />
							</Link>
							<MailOutlined />
						</div>
						<p> &copy; 2023 ivanma</p>
					</div>
				</Footer>
			</Layout>
		</div>
	);
}

export default App;