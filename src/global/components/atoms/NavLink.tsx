import { Link } from "react-router-dom";
import { ReactNode } from "react";

type NavLinkTypes = {
	children: ReactNode;
	to?: string;
};
export default function NavLink({ children, to = "#" }: NavLinkTypes) {
	return (
		<li>
			<Link
				className="inline-block w-full py-1 pl-2 pr-3 rounded-md cursor-pointer hover:bg-neutral-100 transition-colors"
				to={to}
			>
				{children}
			</Link>
		</li>
	);
}
