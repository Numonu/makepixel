import { useContext } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BiLogoPatreon } from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import SocialButton from "../atoms/SocialButton";
import { BsPencilSquare } from "react-icons/bs";
import { userContext } from "../../../../global/provider/context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { DataTypes } from "../../hooks/useBio";
import { auth } from "../../../../config/firebase.config";
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
	};

	const someSocialLink =
		data.social.instagram ||
		data.social.youtube ||
		data.social.twitter ||
		data.social.patreon ||
		data.social.tiktok;

	return (
		<>
			<h1 className="text-xl" translate="no">@{data.name}</h1>
			<p className="text-description max-w-[400px] text-base lg:max-w-[600px]">
				{data.bio}
			</p>
			{someSocialLink && (
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
					{data.social.twitter && (
						<SocialButton
							link="https://twitter.com/"
							user={data.social.twitter}
							icon={<FiTwitter />}
						>
							Twitter
						</SocialButton>
					)}
					{data.social.patreon && (
						<SocialButton
							link="https://patreon.com/"
							user={data.social.patreon}
							icon={<BiLogoPatreon />}
						>
							Patreon
						</SocialButton>
					)}
					{data.social.tiktok && (
						<SocialButton
							link="https://tiktok.com/"
							user={data.social.tiktok}
							icon={<FaTiktok />}
						>
							TikTok
						</SocialButton>
					)}
				</nav>
			)}

			{profileOwner && (
				<footer className="flex gap-6 flex-wrap">
					<button
						className="text-gray-600 w-max flex gap-2 items-center hover:underline"
						onClick={SignOut}
					>
						<RxExit />
						Close Account
					</button>
					<button
						className="text-white bg-primary w-max p-2 flex gap-2 items-center rounded-md hover:bg-secondary transition-colors"
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
