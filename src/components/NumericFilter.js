import React, { useState } from "react";
import { usePlanets } from "../hooks/usePlanets";

// componente para filtrar numericamente
export default function NumericFilter() {

	const [, { setFilters }] = usePlanets();

	const [column, setColumn] = useState("population");
	const [comparison, setComparison] = useState("maior");
	const [value, setValue] = useState("");

	//function para adicionar o filtro
	function execFilter(e) {
		e.preventDefault();
		setFilters(filters => {
			return {
				...filters, filterByNumericValues: [
					...filters.filterByNumericValues, {
						column: column,
						comparison: comparison,
						value: value,
					}
				]
			};
		});
	}

	return (
		<form onSubmit={e => execFilter(e)}>
			<select value={column} onChange={e => setColumn(e.target.value)}>
				<option value="population">População</option>
				<option value="orbital_period">Periodo de Órbita</option>
				<option value="diameter">Diâmetro</option>
				<option value="surface_water">Água da Superfície</option>
			</select>
			<select value={comparison} onChange={e => setComparison(e.target.value)}>
				<option value="maior">Maior que</option>
				<option value="menor">Menor que</option>
				<option value="igual">Igual a</option>
			</select>
			<input type="number" value={value} onChange={e => setValue(e.target.value)} />
			<button type='submit'>Executar Filtragem</button>
		</form>
	);
}