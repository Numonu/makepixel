import { MdOutlineCancel } from "react-icons/md";
import SignIn from "../../../pages/auth/components/molecules/SignIn";
import Brand from "../atoms/Brand";
import To from "../atoms/To";
import Modal from "../molecules/Modal";

type SignInModalTypes = {
	onClose: () => void;
};

export default function SignInModal({ onClose }: SignInModalTypes) {
	return (
		<Modal
			className="pt-8 pb-16"
			onClose={onClose}
		>
			<div className="px-4 flex flex-col items-center justify-center">
				<div className="flex w-full justify-end">
					<button
						className="text-neutral-500 text-3xl"
						onClick={onClose}
					>
						<MdOutlineCancel />
					</button>
				</div>
				<header className="flex flex-col gap-2 items-center mb-20">
					<Brand className="flex-col" />
					<h1 className="text-description text-center">
						Login and join the world's <br /> most pixelated
						community pixelated community
					</h1>
				</header>
				<SignIn onSignIn={onClose} />
				<footer>
					<span className="text-xs">
						Do you want to create a new account ?{" "}
						<To to="/auth">Click Here</To>
					</span>
				</footer>
			</div>
		</Modal>
	);
}
