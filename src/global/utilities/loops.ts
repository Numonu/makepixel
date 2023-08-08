const repeatThis = (callback: () => unknown, repeat: number) => {
	for (let i = 0; i < repeat; i++) {
		callback();
	}
};

export { repeatThis };
