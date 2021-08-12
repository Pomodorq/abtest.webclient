import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme/index';

const App = () => {
  const routing = useRoutes(routes);
  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

export default App;
