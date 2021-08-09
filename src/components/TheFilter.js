import React from "react";
import NameFilter from "./NameFilter";
import NumericFilter from "./NumericFilter";

//componente com todos os filtros
export default function TheFilter() {

	return (
		<div className="btn-group">
			<NameFilter />
			<NumericFilter />
		</div>
	);
}