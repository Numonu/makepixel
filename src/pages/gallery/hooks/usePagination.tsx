import {
	DocumentData,
	QueryDocumentSnapshot,
	QueryFieldFilterConstraint,
	QueryOrderByConstraint,
	collection,
	getDocs,
	limit,
	query,
	startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase.config";
import { ArtDataTypes } from "../../../global/constants/types";

type UsePaginationTypes = (
	state: ArtDataTypes[] | null,
	setter: React.Dispatch<React.SetStateAction<ArtDataTypes[] | null>>,
	configuration: {
		queryLenght: number;
		sortMode?: QueryOrderByConstraint;
		whereMode?: QueryFieldFilterConstraint;
		onPaginate?: (data: ArtDataTypes[]) => void;
	}
) => {
	fullArts: boolean;
	paginationSoul: boolean;
	setLastDocument: React.Dispatch<
		React.SetStateAction<QueryDocumentSnapshot<
			DocumentData,
			DocumentData
		> | null>
	>;
	setFullArts: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePagination: UsePaginationTypes = (
	state,
	setter,
	configuration
) => {
	//Estado para guardar el ultimo documento obtenido
	const [lastDocument, setLastDocument] =
		useState<null | QueryDocumentSnapshot>(null);
	//Estado para saber si ya no hay mas documentos que pedir
	const [fullArts, setFullArts] = useState(false);
	//Estado para controlar los esqueletos de carga
	const [paginationSoul, setPaginationSoul] = useState(false);

	//Metodo para construir nuestra query
	const getQuery = (
		sortMode?: QueryOrderByConstraint,
		whereMode?: QueryFieldFilterConstraint
	) => {
		const getTemplate = (inyect: QueryOrderByConstraint | QueryFieldFilterConstraint) =>
			query(collection(db, "gallery"),inyect,startAfter(lastDocument),limit(configuration.queryLenght));

		if (sortMode && whereMode) {
			return query(
				collection(db, "gallery"),
				whereMode,
				sortMode,
				startAfter(lastDocument),
				limit(configuration.queryLenght)
			);
		} else if (sortMode) {
			return getTemplate(sortMode);
		} else if (whereMode) {
			return getTemplate(whereMode);
		}
		return query(
			collection(db, "gallery"),
			startAfter(lastDocument),
			limit(configuration.queryLenght)
		);
	};

	useEffect(() => {
		//Este metodo se llama al llegar al final de la pagina
		const handleScroll = () => {
			const isScrolledToBottom =
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight;

			//Si no hemos llegado al final
			//o no tenemos un ultimo documento nos retiramos
			if (!isScrolledToBottom || !lastDocument) return;

			//Activamos el esqueleto y preparamos la query para la peticion
			setPaginationSoul(true);
			const q = getQuery(configuration.sortMode , configuration.whereMode);

			//Exito en el pedido , ahora convertimos el documento en un objeto
			getDocs(q).then((queryResult) => {
				const result: ArtDataTypes[] = [];
				queryResult.forEach((e) =>
					result.push(e.data() as ArtDataTypes)
				);

				//Si hubo nuevos resultados lo aplicamos al estado
				if (result && result.length) {
					const fusion = [...(state ?? []), ...result];
					setter(fusion);

					//Si tenemos un callback lo llamamos
					if (configuration.onPaginate)
						configuration.onPaginate(fusion);

					//Designamos el ultimo obtenido para usarlo de punto de inicio en la siguiente paginacion
					const last = queryResult.docs[queryResult.docs.length - 1];
					setLastDocument(last);

					//Una vez todo terminado quitamos el esqueleto
					setPaginationSoul(false);

					//No hay mas datos que pedir , cancelamos futuros esqueletos
					if (result.length < configuration.queryLenght) {
						setFullArts(true);
					}
				} else {
					//No hay mas datos que pedir, quitamos el esqueleto actual y cancelamos los siguientes
					setPaginationSoul(false);
					setFullArts(true);
				}
			});
		};
		//Agregamos un listener al scroll
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastDocument]);

	return {
		fullArts,
		setFullArts,
		setLastDocument,
		paginationSoul,
	};
};
