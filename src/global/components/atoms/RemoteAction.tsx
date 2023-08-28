import { useContext, useEffect, useRef } from "react";
import { remoteContext } from "../../provider/context/remoteContext";

type RemoteActionTypes = {
	keycode: string;
};
export default function RemoteAction({ keycode }: RemoteActionTypes) {
	const { remotes } = useContext(remoteContext);
	const remote = useRef(null);

	useEffect(() => {
		const CURRENT = remote.current! as HTMLSpanElement;
		const HANDLE_KEY = (e: KeyboardEvent) => {
			if (remotes && e.key == keycode) CURRENT.click();
		};
		addEventListener("keydown", HANDLE_KEY);
		return () => removeEventListener("keydown", HANDLE_KEY);
	}, [keycode, remotes]);
	return <span ref={remote}></span>;
}
