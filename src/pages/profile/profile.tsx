import Wrapper from "../../global/components/atoms/Wrapper";
import ArtCard from "../gallery/components/organisms/ArtCard";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import SocialButton from "./components/atoms/SocialButton";
import { useParams } from "react-router-dom";

export default function Profile() {
    
	const { uid } = useParams();

	return (
		<Wrapper>
			<header className="pt-16 flex flex-col items-center gap-6">
				<img
					className="max-w-[200px] aspect-square rounded-[30%] bg-cover text-transparent"
					src={""}
					alt={`profile image of example`}
					style={{
						backgroundImage:
							"url(../../../public/images/picture.jpg)",
					}}
				/>
				<div className="flex flex-col gap-4 text-center">
					<h1 className="text-xl">@{uid}</h1>
					<p className="text-description text-sm">
						Hi , I am using Pixelcrafters
					</p>
					<nav className="flex justify-center gap-4">
						<SocialButton icon={<AiOutlineInstagram />}>
							Instagram
						</SocialButton>
						<SocialButton icon={<AiOutlineYoutube />}>
							Youtube
						</SocialButton>
					</nav>
				</div>
			</header>
			<hr className="my-8" />
			<main className="flex flex-col gap-8">
				<section>
					<h2 className="mb-4 capitalize text-xl">top rated</h2>
					<div className="grid grid-cols-5 gap-6">
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
					</div>
				</section>
				<section>
					<h2 className="mb-4 capitalize text-xl">all work</h2>
					<div className="grid grid-cols-5 gap-6">
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
						<ArtCard />
					</div>
				</section>
			</main>
		</Wrapper>
	);
}
