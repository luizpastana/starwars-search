import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Planets from './components/Planets';

function App() {
  return (
    <PlanetsProvider>
      <Planets />
    </PlanetsProvider>
  );
}

export default App;
