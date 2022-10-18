import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContent from '../app-content/AppContent';
import AppHeader from '../app-header/AppHeader';
import { useDispatch } from '../../hooks';
import { getIngredients } from '../../services/actions';


function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Router>
      <AppHeader />
      <AppContent />
    </Router>
  );
}

export default App;
