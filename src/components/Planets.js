import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const { value } = useContext(PlanetsContext);
  return (
    <>
      <p>Componente Planets</p>
      {value}
    </>
  );
}

export default Planets;
