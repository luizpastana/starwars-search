import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const {
    planets, planetsArray, labels,
    filteredPlanets, setFilteredPlanets,
  } = useContext(PlanetsContext);

  const [nameInput, setNameInput] = useState({ name: '' });

  const handleChange = ({ target }) => {
    const { value } = target;
    setNameInput(value.toLowerCase());
    setFilteredPlanets(planets
      .filter((planet) => planet.name
        .toLowerCase().includes(value.toLowerCase())));
  };

  useEffect(() => {
    const getPlanets = async () => {
      planetsArray();
    };
    getPlanets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="nome do planeta"
        name="name"
        value={ nameInput.name }
        onChange={ handleChange }
      />
      <table>
        <tr>
          {labels.filter((key) => key !== 'residents')
            .map((planet) => (
              <th key={ planet }>{planet}</th>
            ))}
        </tr>
        {filteredPlanets.map((planet) => (
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
        ))}
      </table>
    </>
  );
}

export default Planets;
