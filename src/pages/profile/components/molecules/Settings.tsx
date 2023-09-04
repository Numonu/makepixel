import { useState } from "react";
import { DataTypes } from "../../hooks/useBio";
import Input from "../../../auth/components/atoms/Input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase.config";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
	FAIL_MESSAGE,
	LOAD_MESSAGE,
} from "../../../../global/utilities/comunToast";
import { saveSession } from "../../utilities/storage";
import InputLink from "../atoms/InputLink";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { BiLogoPatreon } from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { BIO_MAX } from "../../../../global/constants/limits";
import { cutString } from "../../../../global/utilities/usefulString";
import InputFile from "../atoms/InputFile";

type SettingsTypes = {
	data: DataTypes;
	onCancel: () => void;
	onSave: (data: DataTypes) => void;
};
export default function Settings({ data, onCancel, onSave }: SettingsTypes) {
	const { uid } = useParams();
	//Primary user information
	const [avatar, setAvatar] = useState("");
	const [bio, setBio] = useState(data.bio);
	//Redes sociales
	const [youtube, setYoutube] = useState(data.social.youtube);
	const [instagram, setInstagram] = useState(data.social.instagram);
	const [tiktok, setTiktok] = useState(data.social.tiktok);
	const [twitter, setTwitter] = useState(data.social.twitter);
	const [patreon, setPatreon] = useState(data.social.patreon);

	const [loading, setLoading] = useState(false);

	//Envia los datos y actualiza de manera local
	const save = async () => {
		setLoading(true);
		toast.promise(() => setDoc(doc(db, "users", uid!), takeSend()), {
			success: () => {
				setLoading(false);
				onSave(takeSend());
				saveSession(uid!, takeSend());
				return "updated profile";
			},
			error: () => {
				setLoading(false);
				return FAIL_MESSAGE;
			},
			loading: LOAD_MESSAGE,
		});
	};

	//Prepara los datos para el envio
	const takeSend = () => ({
		avatar : avatar || data.avatar,
		name: data.name,
		bio: cutString(bio, BIO_MAX),
		social: {
			youtube,
			instagram,
			tiktok,
			patreon,
			twitter,
		},
	});
	
	return (
		<form
			className="w-screen max-w-[400px] text-start"
			onSubmit={(e) => {
				e.preventDefault();
				save();
			}}
		>
			<div className="mb-6 flex flex-col gap-4">
				<h2 className="capitalize">personal data</h2>
				<InputFile tip="< 500kb" amount={1} mbLimit={.5} onChange={e => setAvatar(e)}/>
				<Input
					placeholder="bio"
					value={bio}
					maxLength={BIO_MAX}
					onChange={(e) => setBio(e)}
				/>
			</div>
			<div className="mb-6 flex flex-col gap-4">
				<h2 className="capitalize">social accounts</h2>
				<InputLink
					icon={<BsInstagram />}
					required={false}
					value={instagram}
					placeholder="https://www.instagram.com/"
					onChange={(e) => setInstagram(e)}
				/>
				<InputLink
					icon={<BsYoutube />}
					required={false}
					value={youtube}
					placeholder="https://www.youtube.com/"
					onChange={(e) => setYoutube(e)}
				/>
				<InputLink
					icon={<FiTwitter />}
					required={false}
					value={twitter}
					placeholder="https://twitter.com/"
					onChange={(e) => setTwitter(e)}
				/>
				<InputLink
					icon={<BiLogoPatreon />}
					required={false}
					value={patreon}
					placeholder="https://patreon.com/"
					onChange={(e) => setPatreon(e)}
				/>
				<InputLink
					icon={<FaTiktok />}
					required={false}
					value={tiktok}
					placeholder="https://tiktok.com/"
					onChange={(e) => setTiktok(e)}
				/>
			</div>
			<footer className="flex justify-end gap-2">
				<button
					type="button"
					className="p-2 px-5 rounded-md border hover:bg-hover transition-colors disabled:opacity-50"
					disabled={loading}
					onClick={onCancel}
				>
					Cancel
				</button>
				<button
					className="text-neutral-50 bg-primary p-2 px-5 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
					disabled={loading}
				>
					Save
				</button>
			</footer>
		</form>
	);
}
