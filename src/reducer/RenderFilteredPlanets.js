import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const RenderFilteredPlanets = () => {
  const { filterByNumericValues, filteredPlanets } = useContext(PlanetsContext);
  const newList = filterByNumericValues
    .reduce((acumulator, filter) => acumulator
      .filter((planet) => {
        switch (filter.comparison) {
        case 'maior que':
          return planet[filter.column] > Number(filter.value);
        case 'menor que':
          return planet[filter.column] < Number(filter.value);
        case 'igual a':
          return planet[filter.column] === filter.value;
        default:
          return true;
        }
      }), filteredPlanets);
  // console.log(newList);
  return (newList.map((planet) => (
    <tr key={ planet.name }>
      <td>{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  )));
};

export default RenderFilteredPlanets;
