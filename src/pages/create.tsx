import Canvas from "../components/molecules/DrawCanvas";
import Wrapper from "../components/atoms/Wrapper";
import DrawToolBar from "../components/molecules/DrawToolBar";
import { BsUpload } from "react-icons/bs";
import DrawProvider from "../components/organisms/DrawProvider";

export default function Create() {
	return (
		<Wrapper>
			<header className="text-center mt-4 mb-16 lg:mb-14">
				<h1 className="text-black mb-2 text-xl font-medium">
					New Pixelart
				</h1>
				<h2 className="text-base font-normal">
					Create a new pixelart and contribute to Pixelcrafters
					collection
				</h2>
			</header>
			<main className="grid pb-12 gap-4 grid-cols-1 lg:grid-cols-[1fr_min-content_1fr]">
				<DrawProvider>
					<section className="flex justify-center lg:justify-end lg:-order-1 lg:mx-0">
						<DrawToolBar />
					</section>
					<section>
						<Canvas size={64} />
					</section>
					<section>
						<button className="border-neutral-400 w-full max-w-[500px] py-1 mx-auto flex justify-center items-center gap-2 text-lg rounded-md border">
							<span className="text-xl">
								<BsUpload />
							</span>
							Publish
						</button>
					</section>
				</DrawProvider>
			</main>
		</Wrapper>
	);
}
