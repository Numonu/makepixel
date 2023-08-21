import {
	AiFillFire,
	AiFillHeart,
	AiFillStar,
	AiOutlineFire,
	AiOutlineHeart,
	AiOutlineStar,
} from "react-icons/ai";
import { PiSpiral, PiSpiralLight } from "react-icons/pi";

const asideFilters = [
	{
		icon: <AiOutlineFire />,
		focusIcon: <AiFillFire />,
		value: "new",
	},
	{
		icon: <AiOutlineStar />,
		focusIcon: <AiFillStar />,
		value: "top",
	},
	{
		icon: <PiSpiralLight />,
		focusIcon: <PiSpiral />,
		value: "random",
	},
	{
		icon: <AiOutlineHeart />,
		focusIcon: <AiFillHeart />,
		value: "favorites",
	},
];

export { asideFilters };
