import Wrapper from "../../global/components/atoms/Wrapper";
import Aseprite from "../../temp/Aseprite";
import GalleryAside from "./components/organisms/GalleryAside";
import GridGallery from "./components/organisms/GridGallery";

export default function Gallery() {
	return (
		<>
			{/* // Espacio para anuncios propios */}
			<Aseprite />
			{/* // */}
			<Wrapper className="pt-4 grid grid-cols-1 gap-12 md:px-4 lg:grid-cols-[min-content_1fr]">
				<GalleryAside />
				<GridGallery />
			</Wrapper>
		</>
	);
}
