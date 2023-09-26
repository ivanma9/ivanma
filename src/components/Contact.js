import { GithubFilled, LinkedinFilled, MailFilled } from "@ant-design/icons";
import React from "react";
import "../styles/Contact.css";

const Contact = () => {
	return (
		<div className="contact">
			<h1>Contact</h1>
            <h4>My Inbox is open. Message if you want to work together or just to say hi!</h4>
            <div className="contactItem">
                <MailFilled></MailFilled>
			    <div>Email: ivanma9@g.ucla.edu</div>
            </div>
			<div className="contactItem">
                <GithubFilled></GithubFilled>
                <div>Github: github.com/ivanma9</div>
            </div>
			<div className="contactItem">
				<LinkedinFilled></LinkedinFilled>
				<div>Linkedin: https://www.linkedin.com/in/ivan-ma9/</div>
			</div>
		</div>
	);
};

export default Contact;
