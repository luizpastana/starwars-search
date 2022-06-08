import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const {
    planets, planetsArray, labels,
    filteredPlanets, setFilteredPlanets,
  } = useContext(PlanetsContext);

  const [nameInput, setNameInput] = useState({ name: '' });

  const nameAndNumericFilter = (planetHempObj) => {
    // planetHempObj.reduce(() => {
    setFilteredPlanets(planetHempObj);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setNameInput(value.toLowerCase());
    nameAndNumericFilter(planets
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
      <form>
        <label htmlFor="coluns">
          Coluns
          <select name="coluns" id="coluns" data-testid="column-filter">
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          Comparison
          <select name="comparison" id="comparison" data-testid="comparison-filter">
            <option value="population">maior que</option>
            <option value="orbital_period">menor que</option>
            <option value="diameter">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
        />
      </form>
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
