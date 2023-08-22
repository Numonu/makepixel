import Brand from "../../global/components/atoms/Brand";
import SignIn from "./components/molecules/SignIn";
import To from "../../global/components/atoms/To";

export default function Auth() {
	return (
		<div className="max-w-[1500px]">
			<main className="min-h-screen grid md:grid-cols-2 lg:grid-cols-[1fr_2fr]">
				<aside className="px-4 flex flex-col items-center justify-center">
					<header className="flex flex-col gap-2 items-center mb-20">
						<Brand className="flex-col"/>
						<h1 className="text-description text-center">
                            Join the world's most pixelated <br className="sm:hidden"/> pixel art community
						</h1>
					</header>
					<SignIn/>
                    <footer>
                        <span className="text-xs">Do you want to join as a guest ? <To to="/">Click Here</To></span>
                    </footer>
				</aside>
				<div
					className="bg-cover -order-1 md:order-1"
					style={{
						imageRendering: "pixelated",
						backgroundImage:
							"url(https://i.pinimg.com/originals/b8/2f/28/b82f28a7e9c8fcb3868d3d94652c107c.gif)",
					}}
				></div>
			</main>
		</div>
	);
}
