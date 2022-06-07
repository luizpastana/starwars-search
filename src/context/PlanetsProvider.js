import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../API';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const planetsArray = async () => {
    const result = await fetchPlanets();
    setPlanets(result);
  };

  const context = {
    planets,
    planetsArray,
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
