function imageDataAreSame(first: ImageData, second: ImageData) {
	if(!first.data || !second.data)return true;

	const data1 = first.data;
	const data2 = second.data;
	const length = data1.length;

	for (let i = 0; i < length; i++) {
		if (data1[i] !== data2[i]) {
			return false;
		}
	}
	return true;
}

export { imageDataAreSame };
