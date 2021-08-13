import { createTheme } from '@material-ui/core/styles';

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
    h2: {
      color: '#3C5AA8',
      fontWeight: 400,
      fontSize: '20px',
      textTransform: 'uppercase',
      fontFamily: 'Ubuntu, Roboto',
      fontStyle: 'normal',
      letterSpacing: '0em',
      opacity: 0.4,
    },
  },
  props: {
    MuiInput: {
      disableUnderline: true,
    },
  },
  overrides: {
    // Style sheet name ⚛️
    //   MuiButton: {
    //     // Name of the rule
    //     text: {
    //       // Some CSS
    //       color: 'white',
    //     },
    //   },
    // MuiPaper: {
    //   root: {
    //     boxShadow: 'none',
    //   },
    // },
    MuiButton: {
      root: {
        backgroundColor: '#4A9DFF',
        borderRadius: '10px',
      },
      text: {
        padding: '8px 27px',
        color: '#FFFFFF',
        fontWeight: 400,
        fontSize: '14px',
        fontFamily: 'Ubuntu, Roboto',
        textTransform: 'none',
      },
    },
    MuiTableRow: {
      root: {
        borderBottom: '0.5px solid rgba(93, 110, 151, 0.4)',
      },
    },
    MuiTableCell: {
      stickyHeader: {
        color: '#5D6D97',
        fontWeight: 400,
        fontSize: '14px',
        fontFamily: 'Ubuntu, Roboto',
        fontStyle: 'normal',
        letterSpacing: '0em',
        border: 'none',
        borderBottom: '0.5px solid rgba(93, 110, 151, 0.4)',
        backgroundColor: '#FFFFFF',
      },
      body: {
        color: '#5D6D97',
        fontWeight: 300,
        fontSize: '14px',
        fontFamily: 'Ubuntu, Roboto',
        fontStyle: 'normal',
        letterSpacing: '0em',
        border: 'none',
        borderBottom: '0.5px solid rgba(93, 110, 151, 0.4)',
        backgroundColor: '#FFFFFF',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#F9F9F9',
        boxShadow: '4px 0px 10px rgba(93, 109, 151, 0.1)',
      },
    },
    MuiTable: {
      stickyHeader: {
        borderRadius: '10px',
      },
    },
    MuiInput: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '0px 12px',
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: 'Ubuntu',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0em',
        color: '#5D6E97',
      },
    },
  },
});
export default theme;
