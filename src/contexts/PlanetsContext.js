import React, { useState, useEffect, createContext } from "react";
import api from "../services/api";

//contexto para armazenar as infos dos planetas
export const PlanetsContext = createContext({});

//provedor de informações dos planetas
export function PlanetsProvider({ children }) {

	//infos dos planetas
	const [data, setData] = useState([]);

	//filtros de busca
	const [filters, setFilters] = useState({
		filterByName: {
			name: ""
		},
		filterByNumericValues: [
		],
		order:{
			column: "name",
			sort: "ASC",
		}
	});

	//busca das informações na api
	useEffect(() => {
		api.get("planets/")
			.then(response => {
				if (response.status === 200) {
					setData(response.data.results);
				}
			}).catch(erro => console.log(erro.message));
	}, []);

	return (
		<PlanetsContext.Provider value={[{ data, setData }, { filters, setFilters }]}>
			{children}
		</PlanetsContext.Provider>
	);
}