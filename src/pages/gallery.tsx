
import { Outlet } from "react-router-dom";
import Wrapper from "../components/atoms/Wrapper";
import GalleryAside from "../components/organisms/GalleryAside";
import GridGallery from "../components/organisms/GridGallery";

export default function Gallery(){
    return <Wrapper className="pt-4 grid grid-cols-[max-content_1fr] gap-12">
        <GalleryAside/>
        <GridGallery/>
        <Outlet/>
    </Wrapper>
}