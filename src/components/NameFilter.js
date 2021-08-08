import React from "react";
import { usePlanets } from "../hooks/usePlanets";

//componente para fitrar pelo nome
export default function NameFilter() {

	const [, { filters, setFilters }] = usePlanets();

	return (
		<>
			<input
				type="text"
				placeholder="Nome do Planeta"
				value={filters.filterByName.name}
				onChange={e => setFilters(filters => {
					return { ...filters, filterByName: { ...filters.filterByName, name: e.target.value } };
				})}
			/>
		</>
	);
}