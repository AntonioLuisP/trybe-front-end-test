import { useContext } from "react";
import { PlanetsContext } from "../contexts/PlanetsContext";

//hook personalizado para utilizar as informações do PlanetsContext
export function usePlanets(){
	const value = useContext(PlanetsContext);
	return value;
}