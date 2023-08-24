import { useContext } from "react";
import Wrapper from "../../global/components/atoms/Wrapper";
import { auth } from "../../lib/firebase.config";
import { userContext } from "../../global/provider/context/userContext";
import { User } from "firebase/auth";
import { toast } from "sonner";
import ArtCard from "../gallery/components/organisms/ArtCard";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import SocialButton from "./components/atoms/SocialButton";

export default function Profile() {
	const user = useContext(userContext) as User;

	const userName = user.displayName ?? "user";
	const userImage = user.photoURL ?? "";

	const signOut = async () => {
		try {
			await auth.signOut();
			toast.success("closed session");
		} catch (error) {
			toast.error("something went wrong");
		}
	};

	return (
		<Wrapper>
			<header className="pt-16 flex flex-col items-center gap-6">
				<img
					className="max-w-[200px] aspect-square rounded-[30%] bg-cover text-transparent"
					src={userImage}
					alt={`profile image of ${userName}`}
					style={{
						backgroundImage:
							"url(../../../public/images/picture.jpg)",
					}}
				/>
				<div className="flex flex-col gap-4 text-center">
					<h1 className="text-xl">@{userName}</h1>
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
			<button onClick={signOut}>Sign Out</button>
		</Wrapper>
	);
}
