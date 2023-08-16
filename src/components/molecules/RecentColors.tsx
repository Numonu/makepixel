import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";

export default function RecentColors() {
	const draw = useContext(drawContext);
	return (
		<div className="flex flex-wrap gap-2">
			{draw!.color.history.map((e,i) => {
				return (
					<div
                        key={i}
						className="w-5 aspect-square rounded-full"
						style={{
							backgroundColor: e,
						}}
					></div>
				);
			})}
		</div>
	);
}
