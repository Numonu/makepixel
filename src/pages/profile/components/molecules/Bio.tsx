import { useContext } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import SocialButton from "../atoms/SocialButton";
import { BsPencilSquare } from "react-icons/bs";
import { userContext } from "../../../../global/provider/context/userContext";
import { useParams } from "react-router-dom";
import { DataTypes } from "../../hooks/useBio";

type BioTypes = {
	data: DataTypes;
	onEdit: () => void;
};
export default function Bio({ data, onEdit }: BioTypes) {
	const { uid } = useParams();
	const user = useContext(userContext);

	const profileOwner = user?.uid == uid;

	return (
		<>
			<h1 className="text-xl">@{data.username}</h1>
			<p className="text-description max-w-[400px] text-sm lg:max-w-[600px]">
				{data.description}
			</p>
			{(data.link.instagram || data.link.youtube) && (
				<nav className="flex flex-wrap items-center justify-center gap-4">
					{data.link.instagram && (
						<SocialButton
							link="https://www.instagram.com/"
							user={data.link.instagram}
							icon={<AiOutlineInstagram />}
						>
							Instagram
						</SocialButton>
					)}
					{data.link.youtube && (
						<SocialButton
							link="https://www.youtube.com/"
							user={data.link.youtube}
							icon={<AiOutlineYoutube />}
						>
							Youtube
						</SocialButton>
					)}
				</nav>
			)}

			{profileOwner && (
				<button
					className="text-primary w-max flex gap-2 items-center hover:underline"
					onClick={onEdit}
				>
					<BsPencilSquare />
					Edit profile
				</button>
			)}
		</>
	);
}
