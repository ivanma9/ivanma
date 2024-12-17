import { ConfigProvider, Timeline } from "antd";
import AmazonLogo from "../assets/amazon_logo.png";
import RokuLogo from "../assets/roku_logo.jpeg";
import MagikidLogo from "../assets/magikid_logo.jpeg";
import ExperienceItem from "../components/ExperienceItem";
import StepLogo from "../assets/Step.svg";

const ExpTimeline = () => {
	const experienceList = [
		{
			label: "November 2023 - June 2024",
			image: StepLogo,
			company: "Step",
			role: "Co-Founder",
			description: "Self Development AI app",
		},
		{
			label: "June 2022 - September 2022",
			image: AmazonLogo,
			company: "Amazon Time and Attendance (TAAPI) team",
			role: "Software Development Engineer Intern",
			description: "Code Review Bot",
		},
		{
			label: "July 2021 - September 2021",
			image: AmazonLogo,
			company: "Amazon Time and Attendance (TAAPI) team",
			role: "Software Development Engineer Intern",
			description: "Self Service Application",
		},
		{
			label: "May 2021 - August 2021",
			image: RokuLogo,
			company: "Roku Advertising Data Engineering data",
			role: "Software Engineer Intern",
			description: "Maintained Pipeline",
		},
		{
			label: "May 2019 - May 2021",
			image: MagikidLogo,
			company: "Magikid Robotics Lab STEM Education",
			role: "Robotics Instructor",
			description: "Taught students 6 - 14",
		},
	];
	const experienceItems = experienceList.flatMap(( xp ) =>
		[{
			label: xp.label,
			children: ( 
			<ExperienceItem 
			image={xp.image} 
			company={xp.company} 
			role={xp.role} 
			description={xp.description} />),
		}]
	);

	return (
		<div>
			<ConfigProvider
				theme={{
					components: {
						Timeline: {
							dotBorderWidth: 10,
							tailWidth: 10,
							tailColor: "#BCA78E",
							itemPaddingBottom: 100,
						},
					},
					token: {
						colorPrimary: "#2E7B33",
						// lineWidth: 1,
					},
				}}
			>
				<Timeline
					mode="left"
					items={experienceItems}
				/>
			</ConfigProvider>
		</div>
	);
};

export default ExpTimeline;
