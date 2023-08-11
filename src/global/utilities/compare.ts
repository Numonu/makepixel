function imageDataAreSame(first: ImageData, second: ImageData | undefined) {
	if(!second || !second.data)return true;

	const DATA1 = first.data;
	const DATA2 = second.data;

	const length = DATA1.length;

	for (let i = 0; i < length; i++) {
		if (DATA1[i] !== DATA2[i]) {
			return false;
		}
	}
	return true;
}

export { imageDataAreSame };
