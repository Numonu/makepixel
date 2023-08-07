import { BrowserRouter , Routes , Route } from "react-router-dom";
import GlobalHead from "../components/organisms/GlobalHead";

export default function Routing(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<GlobalHead/>}>

            </Route>
        </Routes>
    </BrowserRouter>
}