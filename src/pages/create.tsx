import DrawCanvas from "../components/molecules/DrawCanvas";
import Wrapper from "../components/atoms/Wrapper";
import DrawToolBar from "../components/organisms/DrawToolBar";
import DrawProvider from "../components/providers/DrawProvider";
import DrawOptions from "../components/organisms/DrawOptions";
import GuideCanvas from "../components/molecules/GuideCanvas";

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
			<main className="max-w-[500px] mx-auto grid pb-12 gap-4 grid-cols-1 lg:max-w-none lg:grid-cols-[1fr_500px_1fr]">
				<DrawProvider>
					<section className="flex justify-center lg:justify-end lg:-order-1 lg:mx-0">
						<DrawToolBar />
					</section>
					<section className="relative aspect-square">
						<GuideCanvas/>
						<DrawCanvas/>
					</section>
					<section>
						<div className="border-neutral-300 w-min min-w-[200px] h-full p-2 rounded-md border">
							<DrawOptions/>
						</div>
					</section>
				</DrawProvider>
			</main>
		</Wrapper>
	);
}
