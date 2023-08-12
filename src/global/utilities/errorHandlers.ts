const requireDependencies = (...dependencies: unknown[]) => {
	let missingCount: number = 0;
	dependencies.forEach((e) => {
		if (e === null || e == undefined) missingCount++;
	});
	if (missingCount)
		throw new Error(`[!] ${missingCount} dependencies have been lost`);
};

const checkDependencies = (...dependencies: unknown[]) => {
	let missingCount: number = 0;
	dependencies.forEach((e) => {
		if (e === null || e == undefined) missingCount++;
	});
	if (missingCount) {
		console.warn(`[!] ${missingCount} dependencies have been lost`);
		return false;
	}
	return true;
};

export { requireDependencies, checkDependencies };
