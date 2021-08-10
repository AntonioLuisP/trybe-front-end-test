import React from "react";
import { formatDate } from "../services/formatDate";
import { usePlanets } from "../hooks/usePlanets";

//helper function para comparar coluna com valo de acordo com o valor de comparation
function makeComparation(column, comparation, value) {

	//valores vêm como string e precisam ser convertidos
	const numColumn = Number(column);
	const numValue = Number(value);

	if (comparation === "maior que") return numColumn > numValue;
	if (comparation === "menor que") return numColumn < numValue;
	if (comparation === "igual a") return numColumn === numValue;

	return numColumn > numValue;
}

// componente para table
export default function Table() {

	const [{ data }, { filters }] = usePlanets();

	//informações dos filtros colocadas fora dos loops para diminuir a complexidade do código
	const nameFilter = filters.filterByName.name.toLowerCase(); //letras minusculas para comparação ser case sensitive
	const numericFilters = filters.filterByNumericValues;
	const sortColumn = filters.order.column;
	const sortMethod = filters.order.sort;

	//array com os devidos planetas filtrados pelo nome
	const planetsNameFiltred = data.filter(planet => {
		const planetName = planet.name.toLowerCase(); //letras minusculas para comparação ser case sensitive

		//verifica se o planeta contém o nome escrito no input
		if (planetName.includes(nameFilter)) return true;
		return false;
	});

	// array com os devidos planetas filtrados numericamente
	const planetsNumericFiltred = planetsNameFiltred.filter(planet => {
		//aplica os filtros (no numérico verifica se não existe ou qual deve ser aplicado)
		if (numericFilters.length > 0) {
			for (let index = 0; index < numericFilters.length; index++) {
				const numericFilter = numericFilters[index];
				const columnName = numericFilter.column;
				const comparation = numericFilter.comparison;
				const valueToCompare = Number(numericFilter.value); //valor vem como string e precisa ser convertido
				if (!makeComparation(planet[columnName], comparation, valueToCompare)) {
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	});

	//array de planetas ordenados
	const planets = planetsNumericFiltred.sort((actual, next) => {
		const actualValue = actual[sortColumn];
		const nextValue = next[sortColumn];

		//ordena para textos com numeros e case sensitive verificando se é ASC ou DESC
		if (sortMethod === "ASC") {
			return actualValue.localeCompare(nextValue, undefined, { numeric: true, sensitive: "base" });
		}
		return nextValue.localeCompare(actualValue, undefined, { numeric: true, sensitive: "base" });
	});

	return (
		<table className="table table-striped table-bordered table-hover">
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
										planet.films.map(film => {
											const filmId = film.split("/")[5];
											return (
												<React.Fragment key={filmId} >
													<a href={film} target='_blank' rel="noreferrer">{"Filme: " + filmId}</a>{" "}
												</React.Fragment>
											);
										})
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
		</table >
	);
}