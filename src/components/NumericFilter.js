import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
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
		<>
			<DropdownButton title="Coluna">
				<Dropdown.Item onClick={() => setColumn("population")}>População</Dropdown.Item>
				<Dropdown.Item onClick={() => setColumn("orbital_period")}>Periodo de Órbita</Dropdown.Item>
				<Dropdown.Item onClick={() => setColumn("diameter")}>Diâmetro</Dropdown.Item>
				<Dropdown.Item onClick={() => setColumn("surface_water")}>Água da Superfície</Dropdown.Item>
			</DropdownButton>
			<DropdownButton title="Comparação">
				<Dropdown.Item onClick={() => setComparison("maior")}>Maior que</Dropdown.Item>
				<Dropdown.Item onClick={() => setComparison("menor")}>Menor que</Dropdown.Item>
				<Dropdown.Item onClick={() => setComparison("igual")}>Igual a</Dropdown.Item>
			</DropdownButton>
			<input className="form-control" type="number" value={value} onChange={e => setValue(e.target.value)} />
			<Button type="button" variant="primary" onClick={execFilter}>Filtrar</Button>
		</>
	);
}