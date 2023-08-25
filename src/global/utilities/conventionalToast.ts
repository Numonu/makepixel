import { toast } from "sonner";

const FAIL_MESSAGE = "something went wrong";
const errorToast = () => toast.error(FAIL_MESSAGE);

export {
    FAIL_MESSAGE,
    errorToast
}