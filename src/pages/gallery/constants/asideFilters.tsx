import {
	AiFillFire,
	AiFillHeart,
	AiFillStar,
	AiOutlineFire,
	AiOutlineHeart,
	AiOutlineStar,
} from "react-icons/ai";

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
		icon: <AiOutlineHeart />,
		focusIcon: <AiFillHeart />,
		value: "favorites",
	},
];

export { asideFilters };
