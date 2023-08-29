import { ReactNode } from "react";

type RepeatTypes = {
	children: ReactNode;
	repeat: number;
};
export default function Repeat({ children, repeat }: RepeatTypes) {
	return new Array(repeat).fill(children);
}
