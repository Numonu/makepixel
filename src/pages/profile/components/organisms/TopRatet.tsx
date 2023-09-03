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
import { saveSession, loadSession } from "../../utilities/storage";
import { TOP_WORK_KEY } from "../../../constants/session";

export default function TopRated() {
	const { uid } = useParams();
	const sessionKey = TOP_WORK_KEY + uid!;
	const [arts, setArts] = useState<ArtDataTypes[] | null>(
		loadSession(sessionKey)
	);

	//Obtenemos los trabajos del usuario (max:4)
	useEffect(() => {
		//Si no tenemos datos locales , los pedimos de firebase
		if (arts == null) {
			const q = query(
				collection(db, "gallery"),
				where("uid", "==", uid),
				orderBy("likes", "desc"),
				limit(4)
			);
			getDocs(q).then((snapshot) => {
				const result: ArtDataTypes[] = [];
				snapshot.forEach((e) => {
					result.push(e.data() as ArtDataTypes);
				});
				setArts(result);
				saveSession(sessionKey, result);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Durante la carga
	if (!arts) {
		return (
			<section>
				<h2 className="mb-4 capitalize text-xl">top rated</h2>
				<div className="w-full grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 md:grid-cols-4">
					<Repeat repeat={4}>
						<ArtCardSoul />
					</Repeat>
				</div>
			</section>
		);
	}
	//Si el usuario NO tiene publicaciones
	if (!arts.length) return null;

	//Si el usuario SI tiene publicaciones
	return (
		<section>
			<h2 className="mb-4 capitalize text-xl">top rated</h2>
			<div className="w-full grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 md:grid-cols-4">
				{arts.map((e: ArtDataTypes) => (
					<ArtCard key={e.id} data={e} />
				))}
			</div>
		</section>
	);
}
