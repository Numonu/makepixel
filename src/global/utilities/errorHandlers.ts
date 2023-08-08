const requireDependencies = (...dependencies: unknown[]) => {
    const missing: unknown[] = [];
    dependencies.forEach((e) => {
        if (e === null || e == undefined) {
            missing.push(e);
        }
    });
    if (missing.length) {
        throw new Error(`[!]Some dependencies are missing, ${[...missing]}`);
    }
};

export {
    requireDependencies
}