import { ReactNode } from "react";

type SocialButtonTypes = {
	icon: ReactNode;
	children: ReactNode;
	user: string;
	link: string;
};

export default function SocialButton({
	children,
	icon,
	user,
	link,
}: SocialButtonTypes) {
	return (
		<a
			href={link + user ?? "#"}
			className="border-title text-title w-max p-2 flex items-center gap-2 border rounded-lg hover:border-primary hover:text-primary transition-colors"
		>
			<span className="text-2xl">{icon}</span>
			<span translate="no">
				{children}
			</span>
		</a>
	);
}
