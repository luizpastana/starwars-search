import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { reducer, initialState } from '../reducer/numericValuesReducer';
import fetchPlanets from '../API';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [labelsColuns, unsetLabelsColuns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filterByNumericValues, dispatch] = useReducer(reducer, initialState);

  const planetsArray = async () => {
    const result = await fetchPlanets();
    const label = Object.keys(result[0]);
    console.log(label);
    setPlanets(result);
    setFilteredPlanets(result);
    setLabels(label);
  };

  const context = {
    planets,
    labels,
    planetsArray,
    filteredPlanets,
    setFilteredPlanets,
    filterByNumericValues,
    dispatch,
    labelsColuns,
    unsetLabelsColuns,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
