import { useState, useEffect, useContext } from "react";
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
import { toastError } from "../../../../global/utilities/comunToast";
import { userContext } from "../../../../global/provider/context/userContext";
import WhiteLink from "../../../../global/components/atoms/WhiteLink";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function AllWork() {
	const QUERY_LIMIT = 10;
	const { uid } = useParams();
	const user = useContext(userContext);
	const sessionKey = ALL_WORK_KEY + uid!;
	const [arts, setArts] = useState<ArtDataTypes[] | null>(
		loadSession(sessionKey)
	);
	const { paginationSoul, fullArts, setLastDocument } = usePagination(
		arts,
		setArts,
		{
			queryLenght: QUERY_LIMIT,
			sortMode: orderBy("timestamp", "desc"),
			whereMode: where("uid", "==", uid),
			onPaginate: (data) => saveSession(sessionKey, data),
		}
	);

	//Obtenemos los trabajos del usuario (max:4)
	useEffect(() => {
		if (arts == null) {
			const q = query(
				collection(db, "gallery"),
				where("uid", "==", uid),
				orderBy("timestamp", "desc"),
				limit(QUERY_LIMIT)
			);
			getDocs(q)
				.then((snapshot) => {
					const result: ArtDataTypes[] = [];
					snapshot.forEach((e) => {
						result.push(e.data() as ArtDataTypes);
					});
					setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
					saveSession(sessionKey, result);
					setArts(result);
				})
				.catch(toastError.network);
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
	if (!arts.length) {
		//Mensaje personalizado si es nuestro perfil
		if (user?.uid == uid)
			return (
				<div className="flex gap-2 flex-col justify-center items-center text-center">
					<span>
						You have not published anything yet
					</span>
					<WhiteLink to="/create">
						create your first publication here
					</WhiteLink>
				</div>
			);
		//Mensaje ambiguo para perfiles agenos
		return (
			<div className="text-amber-500 flex gap-2 items-center text-center">
				<span className="text-xl">
					<AiOutlineInfoCircle/> 
				</span>
				<span>
					This user has not posted anything...
				</span>
			</div>
		);
	}
	//Si el usuario SI tiene publicaciones
	return (
		<section>
			<h2 className="mb-4 capitalize text-xl">all work</h2>
			<div className="grid grid-cols-1 gap-6 min-[430px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{arts.map((e: ArtDataTypes) => (
					<ArtCard key={e.id} data={e} />
				))}
				{paginationSoul && !fullArts && (
					<Repeat repeat={QUERY_LIMIT}>
						<ArtCardSoul />
					</Repeat>
				)}
			</div>
		</section>
	);
}
