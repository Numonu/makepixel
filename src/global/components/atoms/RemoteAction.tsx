import { useEffect, useRef } from "react";

type RemoteActionTypes = {
	keycode: string;
};
export default function RemoteAction({ keycode }: RemoteActionTypes) {
	const remote = useRef(null);

	useEffect(() => {
		const CURRENT = remote.current! as HTMLSpanElement;
		const HANDLE_KEY = (e: KeyboardEvent) => {
			if (e.key == keycode) CURRENT.click();
		};
		addEventListener("keydown", HANDLE_KEY);
		return () => removeEventListener("keydown", HANDLE_KEY);
	}, [keycode]);
	return <span ref={remote}></span>;
}
