import { ReactNode } from "react";
type WrapperTypes = {
	children: ReactNode;
	className?: string;
};
export default function Wrapper({ children, className }: WrapperTypes) {
	return (
		<div className={`max-w-[1200px] mx-auto px-2 ${className}`}>
			{children}
		</div>
	);
}
