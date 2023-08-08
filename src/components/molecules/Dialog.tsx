import { ReactNode, useState } from "react";

type DialogTypes = {
	children: ReactNode;
	offElement: ReactNode;
	onElement?: ReactNode;
};
export default function Dialog({
	children,
	offElement,
	onElement,
}: DialogTypes) {
	const [focus, setFocus] = useState(false);

	const toggleFocus = () => (focus ? setFocus(false) : setFocus(true));

	return (
		<div className="relative z-20" onClick={toggleFocus}>
			<span className="text-3xl">{focus ? onElement : offElement}</span>
			{focus && <div className="absolute right-0 bottom-0 translate-y-full">{children}</div>}
		</div>
	);
}
