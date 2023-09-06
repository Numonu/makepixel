import Wrapper from "../../global/components/atoms/Wrapper";
import WhiteLink from "../../global/components/atoms/WhiteLink";

export default function NotFound() {
	return (
		<Wrapper className="h-[calc(100vh-5rem)] flex flex-col gap-12 items-center justify-center">
			<div>
				<h2 className="text-6xl text-center">404</h2>
				<h1 className="text-2xl">route not found</h1>
			</div>
			<WhiteLink to="/">back to gallery</WhiteLink>
		</Wrapper>
	);
}
