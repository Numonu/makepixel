import { createContext } from "react";

export type RemoteContextTypes = {
	remotes: boolean;
	enableRemotes: () => void;
	disableRemotes: () => void;
};
const remoteContext = createContext<RemoteContextTypes>({
	remotes: true,
	enableRemotes: () => {},
	disableRemotes: () => {},
});
export { remoteContext };
