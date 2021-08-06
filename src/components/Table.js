import React from 'react';
import { formatDate } from '../services/formatDate';
import { usePlanets } from '../hooks/usePlanets';

const TheTable = () => {

    const [{ data }, { filters }] = usePlanets()

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
                        const planetName = planet.name.toLowerCase()
                        const filterName = filters.filterByName.name.toLowerCase()
                        if (planetName.includes(filterName)) {
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
                            )
                        } else {
                            return (<></>)
                        }
                    })
                }
            </tbody>
        </table >
    )
}

export default TheTable