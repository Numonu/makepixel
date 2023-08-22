import { User } from "firebase/auth";
import { createContext } from "react";

type userContextTypes = null | User;
const userContext = createContext<userContextTypes>(null);
export { userContext };
