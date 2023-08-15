import { useContext } from "react";
import { drawContext } from "../../global/context/drawContext";
import Range from "./Range";

export default function EffectSize() {
	const draw = useContext(drawContext);
	return <Range onChange={(e) => draw!.effectSize.update(e)} />;
}
