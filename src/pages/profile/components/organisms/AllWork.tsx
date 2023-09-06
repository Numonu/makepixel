import { useState, useEffect } from "react";
import { ArtDataTypes } from "../../../../global/constants/types";
import { useParams } from "react-router-dom";
import Repeat from "../../../../global/components/atoms/Repeat";
import ArtCardSoul from "../../../gallery/components/molecules/ArtCardSoul";
import ArtCard from "../../../gallery/components/organisms/ArtCard";
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../../config/firebase.config";
import { loadSession, saveSession } from "../../utilities/storage";
import { ALL_WORK_KEY } from "../../../constants/session";
import { usePagination } from "../../../gallery/hooks/usePagination";

export default function AllWork() {
	const QUERY_LIMIT = 12;
	const { uid } = useParams();
	const sessionKey = ALL_WORK_KEY + uid!;
	const [arts, setArts] = useState<ArtDataTypes[] | null>(
		loadSession(sessionKey)
	);
	const { paginationSoul, fullArts , setLastDocument } = usePagination(arts, setArts, {
		queryLenght: QUERY_LIMIT,
		sortMode: orderBy("timestamp", "desc"),
		whereMode : where("uid" , "==" , uid),
		onPaginate : (data) => saveSession(sessionKey, data),
	});

	//Obtenemos los trabajos del usuario (max:4)
	useEffect(() => {
		if (arts == null) {
			const q = query(
				collection(db, "gallery"),
				where("uid", "==", uid),
				orderBy("timestamp", "desc"),
				limit(QUERY_LIMIT)
			);
			getDocs(q).then((snapshot) => {
				const result: ArtDataTypes[] = [];
				snapshot.forEach((e) => {
					result.push(e.data() as ArtDataTypes);
				});
				setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
				saveSession(sessionKey, result);
				setArts(result);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setArts(loadSession(sessionKey));
		console.log("loaded session from " + sessionKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid]);

	//Durante la carga
	if (!arts) {
		return (
			<section>
				<h2 className="mb-4 capitalize text-xl">all work</h2>
				<div className="grid grid-cols-1 gap-6 min-[430px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					<Repeat repeat={QUERY_LIMIT}>
						<ArtCardSoul />
					</Repeat>
				</div>
			</section>
		);
	}
	//Si el usuario NO tiene publicaciones
	if (!arts.length)
		return (
			<h2 className="text-neutral-400 text-center capitalize">
				this user still has nothing to show...
			</h2>
		);
	//Si el usuario SI tiene publicaciones
	return (
		<section>
			<h2 className="mb-4 capitalize text-xl">all work</h2>
			<div className="grid grid-cols-1 gap-6 min-[430px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{arts.map((e: ArtDataTypes) => (
					<ArtCard key={e.id} data={e} />
				))}
				{(paginationSoul && !fullArts) && (
					<Repeat repeat={QUERY_LIMIT}>
						<ArtCardSoul />
					</Repeat>
				)}
			</div>
		</section>
	);
}
