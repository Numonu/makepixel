import { ReactNode } from "react";

type ToolTipTypes = {
	children: ReactNode;
	tip: string;
	keycode?: string;
};
export default function ToolTip({ children, tip, keycode }: ToolTipTypes) {
	return (
		<div className="group relative">
			{children}
			<div className="bg-neutral-900 text-neutral-50 isolate py-2 px-2 rounded-md flex items-center absolute right-0 top-1/2 translate-x-[120%] -translate-y-1/2 opacity-0 scale-[.85] origin-left group-hover:opacity-100 group-hover:scale-100 transition-[scale_opacity] pointer-events-none z-10">
				{tip}
				<div className="bg-neutral-700 ml-2 px-[0.3rem] uppercase font-bold rounded-sm">
					{keycode}
				</div>
				<div className="bg-neutral-900 w-3 aspect-square rotate-45 absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
			</div>
		</div>
	);
}
