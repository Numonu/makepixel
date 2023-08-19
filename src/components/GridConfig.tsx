export default function GridConfig() {
	return (
		<section>
			<h3 className="font-medium mb-2">Canvas Size</h3>
			<div className="w-1/2 grid grid-cols-4">
				<div className="hover:bg-sky-300 group p-1 cursor-pointer rounded-lg transition-colors">
					<div className="bg-neutral-300 aspect-square flex justify-center items-center rounded-md group-hover:bg-sky-200 transition-colors">
						<span className="text-neutral-600 text-2xl group-hover:text-sky-400 transition-colors">
							8
						</span>
					</div>
				</div>
				<div className="hover:bg-sky-300 group p-1 cursor-pointer rounded-lg transition-colors">
					<div className="bg-neutral-300 aspect-square flex justify-center items-center rounded-md group-hover:bg-sky-200 transition-colors">
						<span className="text-neutral-600 text-2xl group-hover:text-sky-400 transition-colors">
							16
						</span>
					</div>
				</div>
				<div className="hover:bg-sky-300 group p-1 cursor-pointer rounded-lg transition-colors">
					<div className="bg-neutral-300 aspect-square flex justify-center items-center rounded-md group-hover:bg-sky-200 transition-colors">
						<span className="text-neutral-600 text-2xl group-hover:text-sky-400 transition-colors">
							32
						</span>
					</div>
				</div>
				<div className="hover:bg-sky-300 group p-1 cursor-pointer rounded-lg transition-colors">
					<div className="bg-neutral-300 aspect-square flex justify-center items-center rounded-md group-hover:bg-sky-200 transition-colors">
						<span className="text-neutral-600 text-2xl group-hover:text-sky-400 transition-colors">
							64
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
