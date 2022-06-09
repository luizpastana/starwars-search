import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const {
    planets, planetsArray, labels,
    filteredPlanets, setFilteredPlanets,
    setNumericFiltersObj, numericFiltersObj,
  } = useContext(PlanetsContext);

  const [nameInput, setNameInput] = useState({ name: '' });

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const nameAndNumericFilter = (planetHempObj) => {
    // planetHempObj.reduce(() => {
    setFilteredPlanets(planetHempObj);
  };

  const handleChange = ({ target }) => {
    const { value: planetName } = target;
    setNameInput(planetName.toLowerCase());
    nameAndNumericFilter(planets
      .filter((planet) => planet.name
        .toLowerCase().includes(planetName.toLowerCase())));
  };

  useEffect(() => {
    const getPlanets = async () => {
      planetsArray();
    };
    getPlanets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeFilterObj = () => {
    const filterObj = {
      column,
      comparison,
      value,
    };
    console.log(filterObj);
    setNumericFiltersObj({
      filterByNumericValues: [...numericFiltersObj.filterByNumericValues, filterObj],
    });

    const filteredByComparison = filteredPlanets
      .filter((planet) => {
        switch (filterObj.comparison) {
        case 'maior que':
          return planet[filterObj.column] > Number(filterObj.value);
        case 'menor que':
          return planet[filterObj.column] < Number(filterObj.value);
        case 'igual a':
          return planet[filterObj.column] === filterObj.value;
        default:
          return planet;
        }
      });
    setFilteredPlanets(filteredByComparison);
  };

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
      {numericFiltersObj.filterByNumericValues.map((item) => (
        <p key={ item.column }>{`${item.column} ${item.comparison} ${item.value}`}</p>
      ))}
      <form>
        <label htmlFor="column">
          Coluns
          <select
            name="column"
            id="coluns"
            data-testid="column-filter"
            value={ column }
            onChange={ (e) => setColumn(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          Comparison
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          // funcao que monta o obj. filter
          onClick={ makeFilterObj }
        >
          Filtrar
        </button>
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
