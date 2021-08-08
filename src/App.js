import React from "react";
import TheFilter from "./components/TheFilter";
import TheTable from "./components/TheTable";
import { PlanetsProvider } from "./contexts/PlanetsContext";

export default function App() {
	return (
		<PlanetsProvider>
			<TheFilter />
			<TheTable />
		</PlanetsProvider>
	);
}