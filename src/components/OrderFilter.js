import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { usePlanets } from "../hooks/usePlanets";

// componente para ordenar
export default function OrderFilter() {

	const [, { filters, setFilters }] = usePlanets();
	
	//informações de ordenação dos filtros 
	const sortMethod = filters.order.sort;
	const sortColumn = filters.order.column;

	//array de colunas que são exibidas no primeiro dropdown
	const columns = [
		{
			field: "name",
			text: "Nome",
		},
		{
			field: "climate",
			text: "Clima",
		},
		{
			field: "diameter",
			text: "Diâmetro",
		},
		{
			field: "gravity",
			text: "Gravidade",
		},
		{
			field: "population",
			text: "População",
		},
		{
			field: "surface_water",
			text: "Água da Superfície",
		},
		{
			field: "terrain",
			text: "Terreno",
		},
		{
			field: "rotation_period",
			text: "Periodo de Rotação",
		},
		{
			field: "orbital_period",
			text: "Periodo de Órbita",
		},
		{
			field: "created",
			text: "Criado em"
		},
		{
			field: "edited",
			text: "Editado em"
		},
	];

	return (
		<>
			<DropdownButton variant="info" title="Ordenar">
				{
					columns.map((column, id) => (
						<Dropdown.Item
							key={id}
							onClick={() => setFilters(filters => {
								return { ...filters, order: { ...filters.order, column: column.field } };
							})}
							active={sortColumn === column.field}
						>
							{column.text}
						</Dropdown.Item>
					))
				}
			</DropdownButton>
			<Form.Check
				type="radio"
				label="ASC"
				checked={sortMethod === "ASC"}
				onChange={() => setFilters(filters => {
					return { ...filters, order: { ...filters.order, sort: "ASC" } };
				})}
			/>
			<Form.Check
				type="radio"
				label="DESC"
				checked={sortMethod === "DESC"}
				onChange={() => setFilters(filters => {
					return { ...filters, order: { ...filters.order, sort: "DESC" } };
				})}
			/>
		</>
	);
}