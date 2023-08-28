const saveStorage = (key: string, value: object) => {
	localStorage[key] = JSON.stringify(value);
};
const loadStorage = (key: string) => {
	const storage = localStorage[key];
	if (storage) return JSON.parse(storage);
	return null;
};
const saveSession = (key: string, value: object) => {
	sessionStorage[key] = JSON.stringify(value);
};
const loadSession = (key: string) => {
	const storage = sessionStorage[key];
	if (storage) return JSON.parse(storage);
	return null;
};

export { saveStorage, loadStorage, saveSession, loadSession };
