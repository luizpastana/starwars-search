import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const RenderFilteredPlanets = () => {
  const { filterByNumericValues, filteredPlanets, planets } = useContext(PlanetsContext);
  const teste = planets || [];

  const sort = teste.sort((a, b) => {
    const one = -1;
    if (Number(a.diameter) < Number(b.diameter)) { return one; }
    if (Number(a.diameter) > Number(b.diameter)) { return 1; }
    return 0;
  });
  console.log(sort);

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
