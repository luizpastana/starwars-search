import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../API';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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
