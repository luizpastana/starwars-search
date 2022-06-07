import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const { planets, planetsArray } = useContext(PlanetsContext);

  useEffect(() => {
    const getPlanets = async () => {
      planetsArray();
    };
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>Componente Planets</p>
      {planets.map((planet) => (
        <p key={ planet.name }>{planet.name}</p>
      ))}
    </>
  );
}

export default Planets;
