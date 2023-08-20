import GridSetter from "./molecules/GridSetter";

export default function GridConfig() {
	return (
		<>
			<h3 className="font-medium mb-2">Canvas Size</h3>
			<div className="w-1/2 grid grid-cols-4 gap-1">
				<GridSetter value={8}/>
				<GridSetter value={16}/>
				<GridSetter value={32}/>
				<GridSetter value={64}/>
			</div>
		</>
	);
}
