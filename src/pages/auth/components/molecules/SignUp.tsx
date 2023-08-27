import { auth, googleProvider } from "../../../../lib/firebase.config";
import { useState, useContext, useEffect } from "react";
import Input from "../atoms/Input";
import { FcGoogle } from "react-icons/fc";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../../global/provider/context/userContext";
import { setAuthError } from "../../utilities/errorAtlas";
import PasswordInput from "../atoms/PasswordInput";
import { NAME_MAX } from "../../../../global/constants/limits";
import { cutString } from "../../../../global/utilities/usefulString";

export default function SignUp() {
	//Contextos y Hooks
	const navigate = useNavigate();
	const user = useContext(userContext);
	//Estados
	const [sending, setSending] = useState(false);
	//Estados para el Formulario
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState({
		email: "",
		password: "",
	});

	//Al encontrar un usuario activo lo redirigimos a su perfil e intentamos cambiar su nombre
	useEffect(() => {
		if (user) {
			if (user.displayName) {
				toast.success(`Welcome to spritecrafters ${user.displayName}`);
				navigate("/profile");
			} else {
				updateProfile(user, {
					displayName: cutString(username, NAME_MAX),
				}).finally(() => {
					navigate("/profile");
					toast.success(
						`Welcome to spritecrafters ${user.displayName}`
					);
				});
			}
		}
	}, [user, navigate, username]);

	//Unirse usando el Email
	const signUpWithEmail = async () => {
		setSending(true);
		//
		toast.promise(
			() => createUserWithEmailAndPassword(auth, email, password),
			{
				error: (error) => {
					setSending(false);
					setAuthError(error.code, setErrorMessage);
					return "Something went wrong";
				},
				success: "Success",
				loading: "Sending...",
			}
		);
		//
	};

	//Unirse usando Google
	const joinWithGoogle = async () => {
		setSending(true);
		//
		toast.promise(() => signInWithPopup(auth, googleProvider), {
			error: () => {
				setSending(false);
				return "Something went wrong";
			},
			success: "Success",
			loading: "Sending...",
		});
		//
	};

	return (
		<form
			className="w-full max-w-xs mb-6"
			onSubmit={(e) => {
				e.preventDefault();
				signUpWithEmail();
			}}
		>
			<div className="mb-12 flex flex-col gap-6">
				<Input
					error=""
					value={username}
					placeholder="name"
					maxLength={NAME_MAX}
					onChange={(e) => setUserName(e)}
				/>
				<Input
					type="email"
					placeholder="email"
					error={errorMessage.email}
					onChange={(e) => setEmail(e)}
				/>
				<PasswordInput
					placeholder="password"
					error={errorMessage.password}
					onChange={(e) => setPassword(e)}
				/>
			</div>
			<div className="flex flex-col gap-4 [&>*]:outline-offset-2">
				<button
					className="bg-primary text-neutral-50 font-medium w-full py-2 border hover:bg-secondary disabled:opacity-50 transition-[colors_opacity]"
					disabled={sending}
				>
					Sign Up
				</button>
				<button
					className="w-full py-2 flex justify-center gap-2 items-center border hover:bg-select disabled:opacity-50 transition-[colors_opacity]"
					type="button"
					disabled={sending}
					onClick={joinWithGoogle}
				>
					<span className="text-xl">
						<FcGoogle />
					</span>
					Continue with Google
				</button>
			</div>
		</form>
	);
}
