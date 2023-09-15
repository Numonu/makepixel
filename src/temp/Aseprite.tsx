import Wrapper from "../global/components/atoms/Wrapper";
import FunctionalModal from "../global/components/molecules/FunctionalModal";
import useModal from "../global/hooks/useModal";

export default function Aseprite() {
	const { modal, openModal, closeModal } = useModal();
	return (
		<>
			<Wrapper>
				<button
					className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white w-full py-6 flex justify-center rounded-md text-center text-4xl font-bold uppercase hover:scale-95 transition-transform"
					onClick={openModal}
				>
					<span className="animate-pulse bg-gradient-to-r from-green-200 via-green-400 to-green-500 bg-clip-text text-transparent">
                    win a steam key from Aseprite!
					</span>
				</button>
			</Wrapper>
			{modal && (
				<FunctionalModal title="" subtitle="" onClose={closeModal}>
					<img
						className="max-w-[100px] mx-auto"
						src="temp/aseprite.png"
						alt="aseprite icon png"
					/>
					<h2 className="text-2xl font-bold uppercase text-center">
						win a steam key from Aseprite
					</h2>
					<div className="pt-4 flex flex-col gap-6">
						<div>
							<h3 className="text-xl mb-2">About</h3>
							<p className="list-decimal list-inside text-sm">
								To celebrate the launch of Makepixel and
								encourage user interaction. I have decided to
								raffle a steam key of the best rated pixel art
								editing software Aseprite. The raffle will last
								from September 15th until September 25th
							</p>
						</div>
						<div>
							<h3 className="text-xl mb-2">
								Steps to participate
							</h3>
							<ol className="list-decimal list-inside text-sm">
								<li>Register or log in to your account</li>
								<li>Like at least 5 other users' posts</li>
								<li>
									Add at least 5 publications to your
									favorites
								</li>
								<li>
									Create a post on the topic of your choice
								</li>
								<li>Ready, you are now participating</li>
							</ol>
						</div>
						<div className="pb-6">
							<h3 className="text-xl mb-2">Selection Process</h3>
							<p className="list-decimal list-inside text-sm">
								A draw will be made among all users who have
								completed all the above steps. The winner will
								be sent an email to confirm the delivery of the
								steam key
							</p>
						</div>
					</div>
				</FunctionalModal>
			)}
		</>
	);
}
