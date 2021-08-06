import React from 'react';
import { usePlanets } from '../hooks/usePlanets';

const NameFilter = () => {

    const [, { filters, setFilters }] = usePlanets()


    return (
        <>
            <input
                type="text"
                placeholder="Nome do Planeta"
                value={filters.filterByName.name}
                onChange={e => setFilters(filters => {
                    return { ...filters, filterByName: { ...filters.filterByName, name: e.target.value } }
                })}
            />
        </>
    )
}
export default NameFilter