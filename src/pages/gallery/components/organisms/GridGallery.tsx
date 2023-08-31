import { useState, useEffect } from "react";
import ArtCard from "./ArtCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../../config/firebase.config";
import { ArtDataTypes } from "../../../../global/constants/types";
import ArtCardSoul from "../molecules/ArtCardSoul";
import Repeat from "../../../../global/components/atoms/Repeat";
import { useParams } from "react-router-dom";
import { loadStorage } from "../../../profile/utilities/storage";

export default function GridGallery() {
	const { filter, tag } = useParams();
	const [arts, setArts] = useState<ArtDataTypes[] | null>(null);

	const getSort = () => {
		switch (filter) {
			case "new":
				return orderBy("timestamp", "desc");
			case "top":
				return orderBy("likes", "desc");
			default:
				return orderBy("timestamp", "desc");
		}
	};

	useEffect(() => {
		//Carga de favoritos
		if(filter == "favorites"){
			setArts(loadStorage("favorites"));
			return;
		}
		//
		setArts(null);
		const q = query(collection(db, "gallery"), getSort());
		getDocs(q).then((queryResult) => {
			const result: ArtDataTypes[] = [];
			queryResult.forEach((e) => result.push(e.data() as ArtDataTypes));
			setArts(result);
			console.log(result);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	if (!arts)
		return (
			<main className="grid grid-cols-4 gap-6">
				<Repeat repeat={16}>
					<ArtCardSoul />
				</Repeat>
			</main>
		);

	return (
		<main className="grid grid-cols-4 gap-6">
			{arts
				.filter((e) => {
					if (!tag) return true;
					else return e.tag == tag;
				})
				.map((e) => (
					<ArtCard data={e} />
				))}
		</main>
	);
}
