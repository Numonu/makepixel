import { RiLoader5Line } from "react-icons/ri";
import Wrapper from "../../../../global/components/atoms/Wrapper";

export default function ProfileSkeleton() {
	return (
		<Wrapper className="pt-12">
			<span className="block w-max mx-auto text-4xl origin-center animate-spin">
				<RiLoader5Line />
			</span>
		</Wrapper>
	);
}
