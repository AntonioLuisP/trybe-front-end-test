import React from "react";
import TheFilter from "./components/TheFilter";
import Table from "./components/Table";
import { PlanetsProvider } from "./contexts/PlanetsContext";

export default function App() {
	return (
		<PlanetsProvider>
			<TheFilter />
			<Table />
		</PlanetsProvider>
	);
}