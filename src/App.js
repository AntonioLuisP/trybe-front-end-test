import React from "react";
import Filter from "./components/Filter";
import Table from "./components/Table";
import { PlanetsProvider } from "./contexts/PlanetsContext";
const App = () => (
	<PlanetsProvider>
		<Filter/>
		<Table />
	</PlanetsProvider>
);

export default App;
