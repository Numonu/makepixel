import { BrowserRouter , Routes , Route } from "react-router-dom";
import Create from "./create/create";
import Gallery from "./gallery/gallery";
import Post from "./post/post";
import Auth from "./auth/auth";
import GlobalHead from "../global/components/organisms/GlobalHead";

export default function Routing(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<GlobalHead/>}>
                <Route index element={<Gallery/>}/>
                <Route path="/gallery" element={<Gallery/>}>
                    <Route path="/gallery/:post" element={<Post/>}/>
                </Route>
                <Route path="/create" element={<Create/>}/>
            </Route>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
    </BrowserRouter>
}