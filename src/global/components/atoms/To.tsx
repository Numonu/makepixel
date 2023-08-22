import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ToTypes = {
	children: ReactNode;
	to: string;
};

export default function To({ children, to }: ToTypes) {
	return (
		<Link to={to} className="text-primary hover:underline">
			{children}
		</Link>
	);
}
