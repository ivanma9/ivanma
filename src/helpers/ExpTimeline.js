import { ConfigProvider, Timeline } from "antd";

const ExpTimeline = () => {
	return (
		<div>
			<ConfigProvider
					theme={{
						components: {
							Timeline: {
								dotBorderWidth: 10,
								tailWidth: 10,
								tailColor: '#BCA78E',
								itemPaddingBottom: 100,
							}
						},
						token: {
							colorPrimary: '#2E7B33',
							// lineWidth: 1,
						}
				}} >
			<Timeline
				mode="left"
				items={[
					{
						label: "2015-09-01",
						children: "Create a services",
					},
					{
						label: "2015-09-01 09:12:11",
						children: "Solve initial network problems",
					},
					{
						children: "Technical testing",
					},
					{
						label: "2015-09-01 09:12:11",
						children: "Network problems being solved",
					},
				]}
			/>
			</ConfigProvider>
		</div>
	);
};

export default ExpTimeline;