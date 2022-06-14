import React, { useCallback, useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const {
    planets, planetsArray, labels,
    filteredPlanets, setFilteredPlanets,
    filterByNumericValues, dispatch,
    labelsColuns, unsetLabelsColuns,
  } = useContext(PlanetsContext);

  const [nameInput, setNameInput] = useState({ name: '' });
  const [column, setColumn] = useState('population');
  const [orderLabel, setOrderLabel] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleChange = ({ target }) => {
    const { value: planetName } = target;
    setNameInput(planetName.toLowerCase());
    setFilteredPlanets(planets
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

  const renderFilteredPlanets = useCallback(() => {
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
  }, [filterByNumericValues, filteredPlanets]);

  const makeFilterObj = () => {
    const filterObj = {
      id: filterByNumericValues.length,
      column,
      comparison,
      value,
    };

    unsetLabelsColuns(labelsColuns
      .filter((label) => label !== filterObj.column));

    dispatch({
      type: 'ADD_FILTER',
      payload: filterObj,
    });

    renderFilteredPlanets();
  };

  const deleteSpan = (indexDelete) => {
    // Preciso de outra forma de controlar as "labels" que já foram usadas.
    filterByNumericValues.forEach((item) => {
      if (item.id === indexDelete) {
        unsetLabelsColuns([...labelsColuns, item.column]);
        dispatch({
          type: 'REMOVE_FILTER',
          payload: item.id,
        });
      }
    });
    renderFilteredPlanets();
  };

  const ascFiltersLabels = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => dispatch({ type: 'RESETE' }) }
      >
        Remover Filtros
      </button>
      {filterByNumericValues.map((item, index) => (
        item.id !== 0 && (
          <span key={ index } data-testid="filter">
            <p>{`${item.column} ${item.comparison} ${item.value}`}</p>
            <button type="button" onClick={ () => deleteSpan(index) }>X</button>
          </span>)
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
            {labelsColuns.map((label, index) => (
              <option key={ index } value={ label }>{label}</option>
            ))}
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
      <form>
        <label htmlFor="column-sort">
          Order:
          <select
            name="column-sort"
            id="coluns-sort"
            data-testid="column-sort"
            value={ orderLabel }
            onChange={ (e) => setOrderLabel(e.target.value) }
          >
            {ascFiltersLabels.map((label, index) => (
              <option key={ index } value={ label }>{label}</option>
            ))}
          </select>
        </label>
        <label htmlFor="asc">
          Ascendente
          <input
            name="order"
            id="asc"
            type="radio"
          />
        </label>
        <label htmlFor="dsc">
          Descendente
          <input
            // onClick={ func }
            name="order"
            id="dsc"
            type="radio"
          />
        </label>
      </form>
      <table>
        <tr>
          {labels.filter((key) => key !== 'residents')
            .map((planet) => (
              <th key={ planet }>{planet}</th>
            ))}
        </tr>
        {renderFilteredPlanets()}
      </table>
    </>
  );
}

export default Planets;
