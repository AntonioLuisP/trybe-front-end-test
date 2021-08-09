import React from "react";
import Table from "react-bootstrap/Table";
import { formatDate } from "../services/formatDate";
import { usePlanets } from "../hooks/usePlanets";

//helper function para comparar coluna com valo de acordo com o valor de comparation
function makeComparation(column, comparation, value) {

	//valores vêm como string e precisam ser convertidos
	const numColumn = Number(column);
	const numValue = Number(value);

	if (comparation === "maior") return numColumn > numValue;
	if (comparation === "menor") return numColumn < numValue;
	if (comparation === "igual") return numColumn === numValue;

	return numColumn > numValue;
}

// componente para table
export default function TheTable() {

	const [{ data }, { filters }] = usePlanets();

	//informações dos filtros colocadas fora dos loops para diminuir a complexidade do código
	const nameFilter = filters.filterByName.name.toLowerCase(); //letras minusculas para comparação ser case sensitive

	const numericFilter = filters.filterByNumericValues[filters.filterByNumericValues.length - 1]; //ultimo do array
	const columnName = numericFilter ? numericFilter.column : "";
	const comparation = numericFilter ? numericFilter.comparison : "";
	const valueToCompare = numericFilter ? Number(numericFilter.value) : 0; //valor vem como string e precisa ser convertido

	const sortColumn = filters.order.column;
	const sortMethod = filters.order.sort;

	//array com os devidos planetas filtrados
	const filterPlanets = data.filter(planet => {
		const planetName = planet.name.toLowerCase(); //letras minusculas para comparação ser case sensitive
		//aplica os filtros (no numérico verifica se não existe ou qual deve ser aplicado)
		if (planetName.includes(nameFilter) &&
			(!numericFilter || makeComparation(planet[columnName], comparation, valueToCompare))
		) {
			return true;
		}
		return false;
	});

	//array de planetas ordenados
	const planets = filterPlanets.sort((actual, next) => {
		const actualValue = actual[sortColumn];
		const nextValue = next[sortColumn];

		//ordena para textos com numeros e case sensitive verificando se é ASC ou DESC
		if (sortMethod === "ASC") {
			return actualValue.localeCompare(nextValue, undefined, { numeric: true, sensitive: "base" });
		}
		return nextValue.localeCompare(actualValue, undefined, { numeric: true, sensitive: "base" });
	});

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Nome</th>
					<th>Filmes</th>
					<th>Clima</th>
					<th>Diâmetro</th>
					<th>Gravidade</th>
					<th>População</th>
					<th>Água da Superfície</th>
					<th>Terreno</th>
					<th>Periodo de Rotação</th>
					<th>Periodo de Órbita</th>
					<th>Criado em</th>
					<th>Editado em</th>
					<th>URL</th>
				</tr>
			</thead>
			<tbody>
				{
					planets.map((planet, id) => {
						return (
							<tr key={id}>
								<td> {planet.name}</td>
								<td>
									{
										planet.films.map((film, id) => (
											<p key={id}>{film}</p>
										))
									}
								</td>
								<td> {planet.climate}</td>
								<td> {planet.diameter}</td>
								<td> {planet.gravity}</td>
								<td> {planet.population}</td>
								<td> {planet.surface_water}</td>
								<td> {planet.terrain}</td>
								<td> {planet.rotation_period}</td>
								<td> {planet.orbital_period}</td>
								<td> {formatDate(planet.created)}</td>
								<td> {formatDate(planet.edited)}</td>
								<td><a href={planet.url}>GO</a> </td>
							</tr>
						);
					})
				}
			</tbody>
		</Table >
	);
}