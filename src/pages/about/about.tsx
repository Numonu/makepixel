import { Link } from "react-router-dom";
import Wrapper from "../../global/components/atoms/Wrapper";

export default function About() {
	return (
		<Wrapper className="max-w-[600px] py-12 px-4 flex flex-col gap-4">
			<div>
                <img className="mb-2 mx-auto max-w-[50px]" src="images/pixelcrafters_icon.png" alt="pixelcrafters icon" />
				<h1 className="mb-4 text-xl text-center">Pixelcrafters</h1>
				<p className="text-description mb-6 text-sm">
					Pixelcrafters is an open collection of pixelart style art,
					created by Juan Villegas. Pixelcrafters is also a small
					personal project created to provide a simple and intuitive
					space for artists everywhere to share their creations. It is
					hoped that the collection will grow and that hundreds of
					people will use it as a space to share and enjoy pixelart.
				</p>
                <Link className="mx-auto text-sm underline" to="/create">contribute now</Link>
			</div>
		</Wrapper>
	);
}
