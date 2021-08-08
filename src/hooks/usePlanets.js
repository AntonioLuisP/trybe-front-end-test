import { useContext } from "react";
import { PlanetsContext } from "../contexts/PlanetsContext";

export function usePlanets(){
	const value = useContext(PlanetsContext);
	return value;
}