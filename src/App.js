import React from 'react';
import fetchPlanets from './API';

function App() {
  const plants = fetchPlanets();
  console.log(plants);
  return (
    <span>opa</span>
  );
}

export default App;
