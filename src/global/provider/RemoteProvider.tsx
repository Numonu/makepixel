import { ReactNode, useState } from "react";
import { remoteContext } from "./context/remoteContext";

type RemoteProviderTypes = {
	children: ReactNode;
};
export default function RemoteProvider({children}:RemoteProviderTypes) {
    const [remotes , setRemotes] = useState(true);

    const enableRemotes = () => setRemotes(true);
    const disableRemotes = () => setRemotes(false);

	return <remoteContext.Provider value={{
        remotes,
        enableRemotes,
        disableRemotes,
    }}>
        {children}
    </remoteContext.Provider>;
}
