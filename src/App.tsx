// src/App.tsx
import React from 'react';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <div>
      <h1>My React TypeScript App</h1>
      <AppRoutes />
    </div>
  );
};

export default App;
