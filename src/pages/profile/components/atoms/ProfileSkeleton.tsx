import Soul from "../../../../global/components/atoms/Soul";
import Wrapper from "../../../../global/components/atoms/Wrapper";

export default function ProfileSkeleton() {
	return (
		<Wrapper>
			<header className="pt-16 flex flex-col items-center gap-6">
				<Soul className="max-w-[200px] w-full aspect-square rounded-[30%]" />
				<div className="flex items-center flex-col gap-4 text-center">
					<h1 className="text-xl opacity-0">loading</h1>
					<p className="text-description max-w-[400px] text-sm lg:max-w-[600px] opacity-0">loading</p>
				</div>
			</header>
			<hr className="my-8" />
			<main className="flex flex-col gap-8">
				<section>
					<h2 className="mb-4 capitalize text-xl">top rated</h2>
					<div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 md:grid-cols-4">
						<Soul className="aspect-square" />
						<Soul />
						<Soul />
						<Soul />
					</div>
				</section>
				<section>
					<h2 className="mb-4 capitalize text-xl">all work</h2>
					<div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						<Soul className="aspect-square" />
						<Soul />
						<Soul />
						<Soul />
						<Soul />
					</div>
				</section>
			</main>
		</Wrapper>
	);
}
