
import Wrapper from "../components/atoms/Wrapper";
import GalleryAside from "../components/organisms/GalleryAside";

export default function Gallery(){
    return <Wrapper className="grid grid-cols-[max-content_1fr]">
        <GalleryAside/>
        <main>

        </main>
    </Wrapper>
}