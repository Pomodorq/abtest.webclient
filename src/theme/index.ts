import { createTheme } from '@material-ui/core/styles';
import overrides from 'theme/overrides';

const theme = createTheme({
  palette: {
    background: {
      default: '#F9F9F9',
      paper: '#F9F9F9',
    },
    primary: {
      main: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: 'Ubuntu, Roboto',
  },
  overrides,
});

export default theme;
