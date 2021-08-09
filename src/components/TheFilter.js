import React from "react";
import NameFilter from "./NameFilter";
import NumericFilter from "./NumericFilter";
import OrderFilter from "./OrderFilter";

//componente com todos os filtros
export default function TheFilter() {

	return (
		<div className="btn-group">
			<NameFilter />
			<NumericFilter />
			<OrderFilter />
		</div>
	);
}