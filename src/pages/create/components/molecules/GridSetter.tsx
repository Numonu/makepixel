import { useContext } from "react";
import { drawContext } from "../../context/drawContext";

type GridSetterTypes = {
	value: number;
};

export default function GridSetter({ value }: GridSetterTypes) {
	const draw = useContext(drawContext);
	const SELECT = value == draw!.grid.size;

	const updateGridSize = () => {
		draw!.grid.update(value);
	};
    
	if (SELECT) {
		return (
			<div
				className="bg-sky-300 group p-1 cursor-pointer rounded-lg transition-colors"
				onClick={updateGridSize}
			>
				<div className="bg-sky-200 aspect-square flex justify-center items-center rounded-md">
					<span className="text-sky-400 text-2xl">{value}</span>
				</div>
			</div>
		);
	}

	return (
		<div
			className="group p-1 cursor-pointer rounded-lg transition-colors hover:bg-sky-300"
			onClick={updateGridSize}
		>
			<div className="bg-neutral-300 aspect-square flex justify-center items-center rounded-md group-hover:bg-sky-200 transition-colors">
				<span className="text-neutral-600 text-2xl group-hover:text-sky-400 transition-colors">
					{value}
				</span>
			</div>
		</div>
	);
}
