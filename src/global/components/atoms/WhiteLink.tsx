import { ReactNode } from "react";
import { Link } from "react-router-dom";

type WhiteLinkTypes = {
    children : ReactNode
    to:string
}
export default function WhiteLink({children , to}:WhiteLinkTypes){
    return <Link className="text-sm underline" to={to}>{children}</Link>
}