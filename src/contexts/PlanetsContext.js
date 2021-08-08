import React, { useState, useEffect, createContext } from "react";
import api from "../services/api";

export const PlanetsContext = createContext({});

export function PlanetsProvider({ children }) {

	const [data, setData] = useState([]);

	const [filters, setFilters] = useState({
		filterByName: {
			name: ""
		},
		filterByNumericValues: [
		]
	});
	console.log(filters);

	useEffect(() => {
		api.get("planets/")
			.then(response => {
				if (response.status === 200) {
					setData(response.data.results);
				}
			}).catch(erro => alert(erro.message));
	}, []);

	return (
		<PlanetsContext.Provider value={[{ data, setData }, { filters, setFilters }]}>
			{children}
		</PlanetsContext.Provider>
	);
}