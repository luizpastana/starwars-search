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
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  const [labelsColuns, unsetLabelsColuns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

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
    labelsColuns,
    unsetLabelsColuns,
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
