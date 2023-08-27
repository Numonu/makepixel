import { useContext } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import SocialButton from "../atoms/SocialButton";
import { BsPencilSquare } from "react-icons/bs";
import { userContext } from "../../../../global/provider/context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import {RxExit} from "react-icons/rx";
import { DataTypes } from "../../hooks/useBio";
import { auth } from "../../../../lib/firebase.config";
import { toast } from "sonner";
import { toastError } from "../../../../global/utilities/comunToast";

type BioTypes = {
	data: DataTypes;
	onEdit: () => void;
};
export default function Bio({ data, onEdit }: BioTypes) {
	const { uid } = useParams();
	const navigate = useNavigate();
	const user = useContext(userContext);

	const profileOwner = user?.uid == uid;

	const SignOut = async () => {
		try {
			await auth.signOut();
			navigate("/");
			toast.success("closed account");
		} catch (error) {
			toastError.base();
		}
	}

	return (
		<>
			<h1 className="text-xl">@{data.name}</h1>
			<p className="text-description max-w-[400px] text-sm lg:max-w-[600px]">
				{data.bio}
			</p>
			{(data.social.instagram || data.social.youtube) && (
				<nav className="flex flex-wrap items-center justify-center gap-4">
					{data.social.instagram && (
						<SocialButton
							link="https://www.instagram.com/"
							user={data.social.instagram}
							icon={<AiOutlineInstagram />}
						>
							Instagram
						</SocialButton>
					)}
					{data.social.youtube && (
						<SocialButton
							link="https://www.youtube.com/"
							user={data.social.youtube}
							icon={<AiOutlineYoutube />}
						>
							Youtube
						</SocialButton>
					)}
				</nav>
			)}

			{profileOwner && (
				<footer className="flex gap-4 flex-wrap">
					<button
						className="text-red-500 w-max flex gap-2 items-center hover:underline"
						onClick={SignOut}
					>
						<RxExit />
						Close Account
					</button>
					<button
						className="text-primary w-max flex gap-2 items-center hover:underline"
						onClick={onEdit}
					>
						<BsPencilSquare />
						Edit profile
					</button>
				</footer>
			)}
		</>
	);
}
