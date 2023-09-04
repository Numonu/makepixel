import {
    DocumentData,
	QueryDocumentSnapshot,
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
		sortMode: () => QueryOrderByConstraint;
	}
) => {
    fullArts : boolean,
    paginationSoul : boolean,
    setLastDocument : React.Dispatch<React.SetStateAction<QueryDocumentSnapshot<DocumentData, DocumentData> | null>>,
    setFullArts :  React.Dispatch<React.SetStateAction<boolean>>,
};

export const usePagination: UsePaginationTypes = (state, setter, configuration) => {
	//Estado para guardar el ultimo documento obtenido
	const [lastDocument, setLastDocument] =
		useState<null | QueryDocumentSnapshot>(null);
	//Estado para saber si ya no hay mas documentos que pedir
	const [fullArts, setFullArts] = useState(false);
	//Estado para controlar los esqueletos de carga
	const [paginationSoul, setPaginationSoul] = useState(false);

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
			const q = query(
				collection(db, "gallery"),
				configuration.sortMode(),
				startAfter(lastDocument),
				limit(configuration.queryLenght)
			);


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

					//Designamos el ultimo obtenido para usarlo de punto de inicio en la siguiente paginacion
					const last = queryResult.docs[queryResult.docs.length - 1];
					setLastDocument(last);

					//No hay mas datos que pedir , se cancela el esqueleto
					if (result.length < configuration.queryLenght){
                        setPaginationSoul(false);
                        setFullArts(true);
                    }
				} else {
					//No hay mas datos que pedir y se cancela el esqueleto
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
    }
};

