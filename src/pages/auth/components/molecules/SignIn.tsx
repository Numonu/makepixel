import Input from "../atoms/Input";
import {FcGoogle} from "react-icons/fc";

export default function SignIn() {
	return (
		<form className="w-full max-w-xs mb-6">
			<div className="mb-12 flex flex-col gap-6">
				<Input placeholder="Email" />
				<Input type="password" placeholder="Password" />
			</div>
			<div className="flex flex-col gap-4 [&>*]:outline-offset-2">
				<button className="bg-primary text-neutral-50 font-medium w-full py-2 border hover:bg-secondary transition-colors">
					Sign In
				</button>
				<button className="w-full py-2 flex justify-center gap-2 items-center border hover:bg-select transition-colors">
                    <span className="text-xl">
                        <FcGoogle/>
                    </span>
					Sign in with Google
				</button>
			</div>
		</form>
	);
}
