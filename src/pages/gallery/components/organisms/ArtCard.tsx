import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { userContext } from "../../../../global/provider/context/userContext";
import { useContext } from "react";
import useModal from "../../../../global/hooks/useModal";
import SignInModal from "../../../../global/components/organisms/SignInModal";
import { toast } from "sonner";

export default function ArtCard() {
	const user = useContext(userContext);
	const { modal, openModal, closeModal } = useModal();

	const noUser = () => {
		if (!user) {
			openModal(); return true;
		}
		return false;
	};

	const like = () => {
		if(noUser())return;
		//
		toast.success("like");
	};

	const favorite = () => {
		if(noUser())return;
		//
		toast.success("add to favorites");
	};

	return (
		<>
			<article className="max-w-full">
				<img
					className="w-full aspect-square mb-4"
					src="https://cdn.pixabay.com/photo/2023/08/10/20/10/shark-8182315_960_720.jpg"
					alt="imagen de ejemplo"
					style={{ imageRendering: "pixelated" }}
				/>
				<div className="w-full flex gap-6 justify-between items-center">
					<div className="flex gap-2">
						<button
							className="border-neutral-300 p-2 flex gap-2 items-center border rounded-lg text-lg active:scale-90 hover:text-sky-500 hover:border-sky-500 transition-transform"
							onClick={like}
						>
							<AiOutlineLike />
							<span className="text-sm hidden min-[450px]:block">
								123
							</span>
						</button>
						<button
							className="border-neutral-300 p-2 flex gap-2 items-center border rounded-lg text-lg active:scale-90 hover:text-sky-500 hover:border-sky-500 transition-transform"
							onClick={favorite}
						>
							<AiOutlineHeart />
						</button>
					</div>
					<Link
						to={"/profile/nameowo"}
						className="text-sm text-ellipsis whitespace-nowrap overflow-hidden hover:text-sky-500"
					>
						@Felipix
					</Link>
				</div>
			</article>
			{modal && <SignInModal onClose={closeModal} />}
		</>
	);
}
