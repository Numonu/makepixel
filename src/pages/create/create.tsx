import Wrapper from "../../global/components/atoms/Wrapper";
import DrawCanvas from "./components/molecules/DrawCanvas";
import GuideCanvas from "./components/molecules/GuideCanvas";
import DrawToolBar from "./components/organisms/DrawToolBar";
import DrawOptions from "./components/organisms/DrawOptions";
import DrawProvider from "./providers/DrawProvider";
import RemoteProvider from "../../global/provider/RemoteProvider";
import { PiDevicesDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { APP_NAME } from "../../global/constants/names";

export default function Create() {
	return (
		<>
			<Wrapper className="hidden min-[534px]:block">
				<header className="text-center mt-4 mb-16 lg:mb-14">
					<h2 className="text-black mb-2 text-xl font-medium">
						New Pixelart
					</h2>
					<h1 className="text-base font-normal">
						Create a new pixelart and contribute to {APP_NAME} collection
					</h1>
				</header>
				<main className="max-w-[500px] mx-auto grid pb-12 gap-4 grid-cols-1 lg:max-w-none lg:grid-cols-[1fr_500px_1fr]">
					<DrawProvider>
						<section className="flex justify-center lg:justify-end lg:-order-1 lg:mx-0">
							<RemoteProvider>
								<DrawToolBar />
							</RemoteProvider>
						</section>
						<section className="relative aspect-square">
							<GuideCanvas />
							<DrawCanvas />
						</section>
						<section>
							<div className="border-neutral-300 w-min min-w-[200px] h-full p-2 rounded-md border">
								<DrawOptions />
							</div>
						</section>
					</DrawProvider>
				</main>
			</Wrapper>
			{/* fallback para pantallas demaciado estrechas */}
			<div className="min-[534px]:hidden py-6 text-center ">
				<div className="bg-red-500 text-white w-max mb-2 mx-auto p-2 aspect-square rounded-full text-4xl">
					<PiDevicesDuotone />
				</div>
				<h1 className="text-red-500 font-medium mb-4">
					Our integrated pixelart editor <br /> is best used on a
					larger device!
				</h1>
				<Link className="text-sm underline" to="/">back to gallery</Link>
			</div>
		</>
	);
}
