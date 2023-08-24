import { ReactNode } from "react";

type SocialButtonTypes = {
	icon: ReactNode;
	children: ReactNode;
	href?: string;
};

export default function SocialButton({
	children,
	icon,
	href,
}: SocialButtonTypes) {
	return (
		<a
			href={href ?? "#"}
			className="border-title text-title w-max p-2 flex items-center gap-2 border rounded-lg hover:border-primary hover:text-primary transition-colors"
		>
			<span className="text-2xl">{icon}</span>
			{children}
		</a>
	);
}
