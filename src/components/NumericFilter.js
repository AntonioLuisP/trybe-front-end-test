import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import { usePlanets } from "../hooks/usePlanets";

// componente para filtrar numericamente
export default function NumericFilter() {

	const [, { filters, setFilters }] = usePlanets();

	const numFilters = filters.filterByNumericValues;

	const [column, setColumn] = useState("");
	const [comparison, setComparison] = useState("");
	const [value, setValue] = useState(0);

	//array de colunas que são exibidas no primeiro dropdown
	const displayColumns = [
		{
			field: "population",
			text: "População",
		},
		{
			field: "orbital_period",
			text: "Periodo de Órbita",
		},
		{
			field: "diameter",
			text: "Diâmetro",
		},
		{
			field: "rotation_period",
			text: "Periodo de Rotação",
		},
		{
			field: "surface_water",
			text: "Água da Superfície",
		},
	].filter(column => { //filtra quando existe alguma correspondencia da columnDisplay no filtro numerico
		if (numFilters.some(filter => filter.column === column.field)) {
			return false;
		}
		return true;
	});

	//apaga filtro
	function deleteFilter() {
		setFilters(filters => {
			return {
				...filters, filterByNumericValues: []
			};
		});
		setValue(0);
	}

	//function para adicionar o filtro
	function execFilter() {
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
			<DropdownButton variant="info" title="Coluna">
				{
					displayColumns.map((column, id) => (
						<Dropdown.Item key={id} onClick={() => setColumn(column.field)}>{column.text}</Dropdown.Item>
					))
				}
			</DropdownButton>
			<Button
				variant="danger"
				onClick={deleteFilter} >
				X
			</Button>
			<DropdownButton variant="info" title="Comparação">
				<Dropdown.Item onClick={() => setComparison("maior que")}>Maior que</Dropdown.Item>
				<Dropdown.Item onClick={() => setComparison("menor que")}>Menor que</Dropdown.Item>
				<Dropdown.Item onClick={() => setComparison("igual a")}>Igual a</Dropdown.Item>
			</DropdownButton>
			<Button
				variant="danger"
				onClick={deleteFilter} >
				X
			</Button>
			<input
				className="form-control"
				type="number"
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyPress={event => {
					if (!/[0-9]/.test(event.key)) {
						event.preventDefault();
					}
				}}
			/>
			<Button
				variant="danger"
				onClick={deleteFilter} >
				X
			</Button>
			<Button
				disabled={column.trim() === "" || comparison.trim() === ""}
				variant="success"
				onClick={execFilter}
			>
				Filtrar
			</Button>
		</>
	);
}