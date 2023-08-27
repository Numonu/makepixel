import Bio from "./components/molecules/Bio";
import Settings from "./components/molecules/Settings";
import Wrapper from "../../global/components/atoms/Wrapper";
import ArtCard from "../gallery/components/organisms/ArtCard";
import ProfileSkeleton from "./components/atoms/ProfileSkeleton";

import { useState } from "react";
import { useParams } from "react-router-dom";
import {useContext} from "react";
import useBio, { DataTypes } from "./hooks/useBio";
import { userContext } from "../../global/provider/context/userContext";

export default function Profile() {
	const { uid } = useParams();
	const user = useContext(userContext);
	const [settings, setSettings] = useState(false);

	const { bioData, setBioData } = useBio(uid!);

	const on = () => setSettings(true);
	const off = () => setSettings(false);

	const updateAndClose = (data: DataTypes) => {
		setBioData(data);
		off();
	};

	if (!bioData) return <ProfileSkeleton />;

	return (
		<Wrapper>
			<header className="pt-16 flex flex-col items-center gap-6">
				<img
					className="max-w-[200px] w-full aspect-square rounded-[30%] bg-cover text-transparent"
					src={user?.photoURL ?? ""}
					alt={`profile image of ${user?.displayName}`}
					style={{
						backgroundImage:
							"url(../../../public/images/picture.jpg)",
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
				<section>
					<h2 className="mb-4 capitalize text-xl">top rated</h2>
					<div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 md:grid-cols-4">
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
					</div>
				</section>
				<section>
					<h2 className="mb-4 capitalize text-xl">all work</h2>
					<div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
					</div>
				</section>
			</main>
		</Wrapper>
	);
}
