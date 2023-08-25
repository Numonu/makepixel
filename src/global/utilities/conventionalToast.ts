import { toast } from "sonner";

//constantes
const FAIL_MESSAGE = "something went wrong";
const SUCCES_MESSAGE = "success";
const LOAD_MESSAGE = "loading...";
//metodos
const errorToast = () => toast.error(FAIL_MESSAGE);

export {
    FAIL_MESSAGE,
    SUCCES_MESSAGE,
    LOAD_MESSAGE,
    errorToast
}