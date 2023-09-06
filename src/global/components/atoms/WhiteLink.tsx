import { ReactNode } from "react";
import { Link } from "react-router-dom";

type WhiteLinkTypes = {
    children : ReactNode
    to:string
}
export default function WhiteLink({children , to}:WhiteLinkTypes){
    return <Link className="text-sm underline hover:text-primary" to={to}>{children}</Link>
}