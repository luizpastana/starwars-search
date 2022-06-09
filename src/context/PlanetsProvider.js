import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../API';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [numericFiltersObj, setNumericFiltersObj] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
  });

  const planetsArray = async () => {
    const result = await fetchPlanets();
    const label = Object.keys(result[0]);
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
    numericFiltersObj,
    setNumericFiltersObj,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
