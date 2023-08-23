type ErrorTypes = {
	email: string;
	password: string;
};

type ErrorSetterTypes = React.Dispatch<React.SetStateAction<ErrorTypes>>;

const setAuthError = (
	error: string,
	errorSetter: ErrorSetterTypes
) => {
	let emailErrorMessage = "";
	let passwordErrorMessage = "";
	switch (error) {
		//Email Errors
		case "auth/user-not-found":
			emailErrorMessage = "unregistered email";
			break;
		case "auth/invalid-email":
			emailErrorMessage = "invalid email format";
			break;
		case "auth/email-already-exists":
			emailErrorMessage = "this email is already in use";
			break;
		//Password Errors
		case "auth/invalid-password":
			passwordErrorMessage = "invalid password";
			break;
        case "auth/weak-password":
            passwordErrorMessage = "the password must be at least 6 characters";
			break;
		default:
			break;
	}
	//
    errorSetter({
        email : emailErrorMessage,
        password : passwordErrorMessage
    })
};

export { setAuthError };
