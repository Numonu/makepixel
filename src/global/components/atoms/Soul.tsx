import { ReactNode } from "react";

type SoulTypes = {
	children?: ReactNode;
	className?: string;
};

export default function Soul({ children , className }: SoulTypes) {
	return <div className={`bg-neutral-200 animate-glare ${className}`}>{children}</div>;
}
