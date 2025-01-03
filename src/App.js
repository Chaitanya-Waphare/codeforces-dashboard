import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import Dashboard from './pages/Dashboard';
import ContestDetailsPage from './pages/ContestDetailsPage';
import axios from 'axios';
import '@shopify/polaris/build/esm/styles.css';

const App = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axios
      .get('https://codeforces.com/api/contest.list')
      .then((response) => {
        if (response.data.status === 'OK') {
          setContests(response.data.result);
        }
      })
      .catch((error) => console.error('Error fetching contests:', error));
  }, []);

  return (
    <AppProvider i18n={{}}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard contests={contests} />} />
          <Route path="/contest/:id" element={<ContestDetailsPage contests={contests} />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
