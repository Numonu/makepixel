import { auth, googleProvider } from "../../../../config/firebase.config";
import { useState, useContext, useEffect } from "react";
import Input from "../atoms/Input";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { userContext } from "../../../../global/provider/context/userContext";
import { setAuthError } from "../../utilities/errorAtlas";
import PasswordInput from "../atoms/PasswordInput";

type SignInTypes = {
	onSignIn: () => void;
};

export default function SignIn({ onSignIn }: SignInTypes) {
	//Contextos y Hooks
	const user = useContext(userContext);
	//Estados
	const [sending, setSending] = useState(false);
	//Estados para el Formulario
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState({
		email: "",
		password: "",
	});

	//Al encontrar un usuario activo lo saludamos y cerramos el modal
	useEffect(() => {
		if (user) {
			toast.success(`Welcome back ${user.displayName}`);
            onSignIn();
		}
	}, [user , onSignIn]);

	//Unirse usando el Email
	const signInWithEmail = async () => {
		setSending(true);
		//
		toast.promise(() => signInWithEmailAndPassword(auth, email, password), {
			error: (error) => {
				setSending(false);
				setAuthError(error.code, setErrorMessage);
				return "Something went wrong";
			},
			success: "Success",
			loading: "Sending...",
		});
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
				signInWithEmail();
			}}
		>
			<div className="mb-12 flex flex-col gap-6">
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
					Sign In
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
