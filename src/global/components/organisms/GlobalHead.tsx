import Brand from "../atoms/Brand";
import GallerySearch from "../../../pages/gallery/components/molecules/GallerySearch";
import Wrapper from "../atoms/Wrapper";
import NavDialog from "./NavDialog";
import { Outlet } from "react-router-dom";

export default function GlobalHead() {
	return (
		<>
			<header className="border-neutral-100 bg-white sticky top-0 py-2 border-b z-10">
				<Wrapper className="flex gap-4 justify-between items-center md:gap-12">
					<Brand />
					<GallerySearch />
					<NavDialog />
				</Wrapper>
			</header>
			<Outlet />
		</>
	);
}
