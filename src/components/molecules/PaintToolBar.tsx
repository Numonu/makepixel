import { HiOutlinePaintBrush } from "react-icons/hi2";
import { BsEraser } from "react-icons/bs";
import { TfiBackLeft, TfiBackRight } from "react-icons/tfi";
import { MdFileDownload } from "react-icons/md";

export default function PaintToolBar() {
	return (
		<aside className="mr-6 flex flex-row gap-6 lg:flex-col">
			<div className="shadow-neutral-300 p-2 rounded-md flex lg:flex-col gap-4 text-3xl shadow-md">
				<HiOutlinePaintBrush />
				<img className="w-9" src="svg/colorpicker.svg" />
				<BsEraser />
			</div>
			<div className="shadow-neutral-300 p-2 rounded-md flex lg:flex-col gap-4 text-3xl shadow-md">
				<TfiBackLeft />
				<TfiBackRight />
			</div>
			<div className="shadow-neutral-300 p-2 rounded-md flex lg:flex-col gap-4 text-3xl shadow-md">
				<MdFileDownload />
			</div>
		</aside>
	);
}
