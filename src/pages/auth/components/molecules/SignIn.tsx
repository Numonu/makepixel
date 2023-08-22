import { auth, googleProvider } from "../../../../lib/firebase.config";
import { useState, useContext, useEffect } from "react";
import Input from "../atoms/Input";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../../global/provider/context/userContext";

export default function SignIn() {
	//Contextos y Hooks
	const navigate = useNavigate();
	const user = useContext(userContext);
	//Estados
	const [sending, setSending] = useState(false);
	//>Estado para las Credenciales
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	//Al encontrar un usuario activo lo redirigimos a su perfil
	useEffect(() => {
		if (user){
			navigate("/profile");
			toast.success(`Welcome back ${user.displayName}`);
		}
	}, [user , navigate]);

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
		<form className="w-full max-w-xs mb-6">
			<div className="mb-12 flex flex-col gap-6">
				<Input placeholder="Email" />
				<Input type="password" placeholder="Password" />
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
					Sign in with Google
				</button>
			</div>
		</form>
	);
}
