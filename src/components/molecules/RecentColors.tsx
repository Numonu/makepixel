import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";

export default function RecentColors() {
	const draw = useContext(drawContext);

	const pickThisColor = (newColor:string) => {
		draw!.color.update(newColor);
	}

	return (
		<div className="flex flex-wrap gap-2">
			{draw!.color.history.map((e,i) => {
				if(e === null){
					return <div className="bg-neutral-200 w-6 aspect-square rounded-full"></div>
				}
				return (
					<button
                        key={i}
						className="w-6 aspect-square rounded-full hover:scale-110 cursor-pointer transition-transform duration-75"
						onClick={() => pickThisColor(e)}
						style={{
							backgroundColor: e,
						}}
					></button>
				);
			})}
		</div>
	);
}
