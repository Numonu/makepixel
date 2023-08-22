import { ReactNode, useContext } from "react";
import { userContext } from "../../provider/context/userContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteTypes = {
	children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteTypes) {
	const user = useContext(userContext);

	if (user) return children;
	return <Navigate to="/auth" />;
}
