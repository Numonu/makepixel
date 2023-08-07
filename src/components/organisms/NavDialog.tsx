import Dialog from "../molecules/Dialog";
import { PiDotsThreeOutlineThin, PiDotsThreeOutlineFill } from "react-icons/pi";
import NavLink from "../atoms/NavLink";
import Separator from "../atoms/Separator";

export default function NavDialog() {
	return (
		<Dialog
			offElement={
				<span className="inline-block p-[.35rem] rounded-full cursor-pointer hover:bg-neutral-100 transition-colors">
					<PiDotsThreeOutlineThin />
				</span>
			}
			onElement={
				<span className="bg-neutral-100 inline-block p-[.35rem] rounded-full cursor-pointer">
					<PiDotsThreeOutlineFill />
				</span>
			}
		>
			<nav className="border-neutral-100 bg-white w-max border p-2 rounded-lg animate-reveal">
				<ul className="flex flex-col items-stretch gap-[0.1rem] text-sm">
					<NavLink to="/">Gallery</NavLink>
					<NavLink to="/create">Create</NavLink>
					<NavLink to="/profile">Profile</NavLink>
					<li>
						<Separator />
					</li>
					<NavLink to="/">About</NavLink>
					<NavLink to="/create">Instagram</NavLink>
					<li>
						<Separator />
					</li>
					<NavLink to="/">Terms of services</NavLink>
					<NavLink to="/create">Privacy Policy</NavLink>
				</ul>
			</nav>
		</Dialog>
	);
}
