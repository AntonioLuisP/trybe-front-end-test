import React from "react";
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

	//informações dos filtros colocadas fora do loop para diminuir a complexidade do código
	const nameFilter = filters.filterByName.name.toLowerCase(); //letras minusculas para comparação ser case sensitive
	const numericFilter = filters.filterByNumericValues[filters.filterByNumericValues.length - 1]; //ultimo do array
	const columnName = numericFilter ? numericFilter.column : "";
	const comparation = numericFilter ? numericFilter.comparison : "";
	const valueToCompare = numericFilter ? Number(numericFilter.value) : 0; //valor vem como string e precisa ser convertido

	return (
		<table>
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
					data.map((planet, id) => {
						const planetName = planet.name.toLowerCase(); //letras minusculas para comparação ser case sensitive
						//aplica os filtros (no numérico verifica se não existe ou qual deve ser aplicado)
						if (planetName.includes(nameFilter) &&
							(!numericFilter || makeComparation(planet[columnName], comparation, valueToCompare))
						) {
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
						} else {
							return (<></>); //fragmento que vai ser ignorado na tela
						}
					})
				}
			</tbody>
		</table >
	);
}