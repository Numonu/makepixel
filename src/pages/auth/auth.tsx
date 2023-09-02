import Brand from "../../global/components/atoms/Brand";
import SignInModal from "../../global/components/organisms/SignInModal";
import useModal from "../../global/hooks/useModal";
import SignUp from "./components/molecules/SignUp";

export default function Auth() {

	const {modal , openModal  , closeModal} = useModal();

	return (
		<>
			<div className="max-w-[1500px]">
				<main className="min-h-screen md:h-screen grid md:grid-cols-2 lg:grid-cols-[1fr_2fr]">
					<aside className="h-full py-16 px-4 flex flex-col items-center overflow-y-scroll">
						<header className="flex flex-col gap-2 items-center mb-20">
							<Brand className="flex-col" />
							<h1 className="text-description text-center">
								Create an account and join the world's most{" "}
								<br />
								pixelated pixel art community
							</h1>
						</header>
						<SignUp />
						<footer>
							<span className="text-xs">
								Already have an account ?{" "}
								<button className="text-primary hover:underline" onClick={openModal}>
									Login Here
								</button>
							</span>
						</footer>
					</aside>
					<div
						className="h-[10rem] bg-cover -order-1 md:order-1 md:h-auto"
						style={{
							imageRendering: "pixelated",
							backgroundImage:
								"url(https://i.pinimg.com/originals/b8/2f/28/b82f28a7e9c8fcb3868d3d94652c107c.gif)",
						}}
					></div>
				</main>
			</div>
			{modal && <SignInModal onClose={closeModal}/>}
		</>
	);
}
