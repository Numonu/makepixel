import { useState } from "react";
import { DataTypes } from "../../hooks/useBio";
import Input from "../../../auth/components/atoms/Input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase.config";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
	FAIL_MESSAGE,
	LOAD_MESSAGE,
} from "../../../../global/utilities/conventionalToast";
import { saveStorage } from "../../utilities/storage";
import InputLink from "../atoms/InputLink";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { BIO_MAX, NAME_MAX } from "../../../../global/constants/limits";
import { cutString } from "../../../../global/utilities/usefulString";

type SettingsTypes = {
	data: DataTypes;
	onCancel: () => void;
	onSave: (data: DataTypes) => void;
};
export default function Settings({ data, onCancel, onSave }: SettingsTypes) {
	const { uid } = useParams();

	const [name, setName] = useState(data.name);
	const [bio, setBio] = useState(data.bio);
	const [youtube, setYoutube] = useState(data.social.youtube);
	const [instagram, setInstagram] = useState(data.social.instagram);

	//Envia los datos y actualiza de manera local
	const save = async () => {
		toast.promise(() => setDoc(doc(db, "users", uid!), takeSend()), {
			success: () => {
				onSave(takeSend());
				saveStorage(uid!, takeSend());
				return "updated profile";
			},
			error: FAIL_MESSAGE,
			loading: LOAD_MESSAGE,
		});
	};

	//Prepara los datos para el envio
	const takeSend = () => ({
		name: cutString(name, NAME_MAX),
		bio: cutString(bio, BIO_MAX),
		social: {
			youtube,
			instagram,
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
			<div className="mb-6">
				<h2 className="mb-4 capitalize">personal data</h2>
				<Input
					value={name}
					maxLength={NAME_MAX}
					placeholder="name"
					onChange={(e) => setName(e)}
				/>
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
			</div>
			<footer className="flex justify-end gap-2">
				<button
					type="button"
					className="p-2 px-5 rounded-md border hover:bg-hover transition-colors"
					onClick={onCancel}
				>
					Cancel
				</button>
				<button className="text-neutral-50 bg-primary p-2 px-5 rounded-md hover:bg-secondary transition-colors">
					Save
				</button>
			</footer>
		</form>
	);
}
