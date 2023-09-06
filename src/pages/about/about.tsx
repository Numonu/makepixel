import Wrapper from "../../global/components/atoms/Wrapper";
import Brand from "../../global/components/atoms/Brand";
import { APP_NAME } from "../../global/constants/names";
import WhiteLink from "../../global/components/atoms/WhiteLink";

export default function About() {
	return (
		<Wrapper className="max-w-[600px] py-12 px-4 flex flex-col gap-4">
			<div>
                <Brand className="flex-col mb-4"/> 
				<p className="text-description mb-6 text-sm">
					{APP_NAME} is an open collection of pixel art style art,
					created by Juan Villegas. {APP_NAME} is also a small
					personal project created to provide a simple and intuitive
					space for artists everywhere to share their creations. It is
					hoped that the collection will grow and that hundreds of
					people will use it as a space to share and enjoy pixel art.
				</p>
				<WhiteLink to="/create">create new pixel art</WhiteLink>
			</div>
		</Wrapper>
	);
}
