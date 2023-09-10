import Brand from "../atoms/Brand";
import Wrapper from "../atoms/Wrapper";
import NavDialog from "./NavDialog";
import { Link, Outlet } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import AttachToRoute from "../atoms/AttachToRoute";

export default function GlobalHead() {
	return (
		<>
			<header className="border-neutral-100 bg-white sticky top-0 py-2 border-b z-10">
				<Wrapper className="flex gap-4 justify-between items-center md:gap-12">
					<Brand />
					<div className="flex gap-6 items-center">
						<AttachToRoute atach="/">
							<Link
								className="bg-primary text-white border-secondary py-1 px-2 flex gap-2 items-center rounded-md border-b-2 hover:border-0"
								to="/create"
							>
								<span className="text-xl">
									<BsPlusCircleFill />
								</span>
								Create Pixel Art
							</Link>
						</AttachToRoute>
						<NavDialog />
					</div>
				</Wrapper>
			</header>
			<Outlet />
		</>
	);
}
