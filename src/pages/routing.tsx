import { BrowserRouter , Routes , Route } from "react-router-dom";
import GlobalHead from "../components/organisms/GlobalHead";
import Create from "./create";
import Gallery from "./gallery";
import Post from "./post";

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
        </Routes>
    </BrowserRouter>
}