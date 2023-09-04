import Bio from "./components/molecules/Bio";
import Settings from "./components/molecules/Settings";
import Wrapper from "../../global/components/atoms/Wrapper";
import ProfileSkeleton from "./components/atoms/ProfileSkeleton";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import useBio, { DataTypes } from "./hooks/useBio";
import { userContext } from "../../global/provider/context/userContext";
import TopRated from "./components/organisms/TopRatet";
import AllWork from "./components/organisms/AllWork";

export default function Profile() {
	const { uid } = useParams();
	const user = useContext(userContext);
	const [settings, setSettings] = useState(false);

	const { bioData, setBioData} = useBio( uid!);

	const on = () => setSettings(true);
	const off = () => setSettings(false);

	const updateAndClose = (data: DataTypes) => {
		setBioData(data);
		off();
	};

	if (!bioData) return <ProfileSkeleton />;

	return (
		<Wrapper className="min-h-screen pb-16">
			<header className="pt-16 flex flex-col items-center gap-6">
				<img
					className="max-w-[200px] w-full aspect-square rounded-[30%] bg-cover text-transparent"
					src={"data:image/png;base64," + bioData.avatar}
					alt={`profile image of ${user?.displayName}`}
					style={{
						backgroundImage: "url(/images/picture.jpg)",
					}}
				/>
				<div className="flex items-center flex-col gap-4 text-center">
					{settings ? (
						<Settings
							data={bioData}
							onCancel={off}
							onSave={updateAndClose}
						/>
					) : (
						<Bio data={bioData} onEdit={on} />
					)}
				</div>
			</header>
			<hr className="my-8" />
			<main className="flex flex-col gap-8">
				<TopRated />
				<AllWork />
			</main>
		</Wrapper>
	);
}
