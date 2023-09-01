import Wrapper from "../../global/components/atoms/Wrapper";
import GalleryAside from "./components/organisms/GalleryAside";
import GridGallery from "./components/organisms/GridGallery";

export default function Gallery() {
	return (
		<Wrapper className="pt-4 grid grid-cols-1 gap-12 md:px-4 lg:grid-cols-[min-content_1fr]">
			<GalleryAside/>
			<GridGallery/>
		</Wrapper>
	);
}
