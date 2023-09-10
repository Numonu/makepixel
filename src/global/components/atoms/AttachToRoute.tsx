import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type RouteDependencieTypes = {
	children: ReactNode;
	atach: string;
};
export default function AttachToRoute({
	children,
	atach,
}: RouteDependencieTypes) {
	const { pathname } = useLocation();
	if (pathname == atach) return children;
	return null;
}
