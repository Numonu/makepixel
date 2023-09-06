import { useState, useEffect } from "react";
import ArtCard from "./ArtCard";
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../../config/firebase.config";
import { ArtDataTypes } from "../../../../global/constants/types";
import ArtCardSoul from "../molecules/ArtCardSoul";
import Repeat from "../../../../global/components/atoms/Repeat";
import { useParams } from "react-router-dom";
import { loadStorage } from "../../../profile/utilities/storage";
import { usePagination } from "../../hooks/usePagination";

export default function GridGallery() {
	const { filter, tag } = useParams();
	//Estado que contiene el arreglo de nuestras publicaciones
	const [arts, setArts] = useState<ArtDataTypes[] | null>(null);
	//Limite de peticion por paginacion
	const QUERY_LIMIT = 12;

	//Obtener el moto de ordenamiento para la query
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

	const { fullArts, setFullArts, setLastDocument, paginationSoul } =
		usePagination(arts, setArts, {
			queryLenght: 12,
			sortMode: getSort(),
		});

	//Carga inicial de las publicaciones que hace uso del filtro
	useEffect(() => {
		setFullArts(false);
		//Con un filtro de favoritos , cargamos de manera local
		if (filter == "favorites") {
			setArts(loadStorage("favorites") ?? []);
			return;
		}
		setArts(null);
		//Pedimos las publicaciones
		const q = query(
			collection(db, "gallery"),
			getSort(),
			limit(QUERY_LIMIT)
		);
		getDocs(q).then((queryResult) => {
			//Exito en el pedido , ahora lo aplicamos al estado
			setArts(getDocArr(queryResult));
			//Designamos el ultimo obtenido para usarlo de punto de inicio en la siguiente paginacion
			const lastVisible = queryResult.docs[queryResult.docs.length - 1];
			setLastDocument(lastVisible);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	//Retornamos un arreglo de Documentos
	const getDocArr = (data: QuerySnapshot) => {
		const result: ArtDataTypes[] = [];
		data.forEach((e) => result.push(e.data() as ArtDataTypes));
		return result;
	};

	if (!arts)
		return (
			<main className="grid gap-6 mb-16 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<Repeat repeat={QUERY_LIMIT}>
					<ArtCardSoul />
				</Repeat>
			</main>
		);

	return (
		<main className="mb-28 grid gap-6 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{arts
				.filter((e) => {
					if (!tag) return true;
					else return e.tag == tag;
				})
				.map((e) => (
					<ArtCard key={e.id} data={e} />
				))}
			{/* Eskeleto para los datos paginados */}
			{paginationSoul && !fullArts && (
				<Repeat repeat={QUERY_LIMIT}>
					<ArtCardSoul />
				</Repeat>
			)}
		</main>
	);
}
