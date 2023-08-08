import Brand from "../atoms/Brand";
import GallerySearch from "../molecules/GallerySearch";
import Wrapper from "../atoms/Wrapper";
import NavDialog from "./NavDialog";
import { Outlet } from "react-router-dom";

export default function GlobalHead() {
	return (
		<>
			<header className="border-neutral-100 py-2 border-b">
				<Wrapper className="flex gap-4 items-center md:gap-12">
					<Brand />
					<GallerySearch />
					<NavDialog />
				</Wrapper>
			</header>
			<Outlet />
		</>
	);
}
