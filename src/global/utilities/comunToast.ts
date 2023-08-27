import { toast } from "sonner";

//constantes
const FAIL_MESSAGE = "something went wrong";
const SUCCES_MESSAGE = "success";
const LOAD_MESSAGE = "loading...";
//metodos
const toastError = {
    base : () => toast.error(FAIL_MESSAGE),
    network : () => toast.error("We are having problems, please try again later"),
}

export {
    FAIL_MESSAGE,
    SUCCES_MESSAGE,
    LOAD_MESSAGE,
    toastError
}