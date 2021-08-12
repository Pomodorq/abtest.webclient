import { AppBar, Toolbar, Input, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from 'theme/icons/SearchIcon';
import ExitIcon from 'theme/icons/ExitIcon';
import ABTestLogo from 'components/ABTestLogo';

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    width: '320px',
  },
  adornment: {
    paddingLeft: '16px',
  },
  logo: {
    marginRight: '50px',
  },
  exitIcon: {
    marginLeft: 'auto',
  },
}));

export const AppNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.logo}>
          <ABTestLogo />
        </div>
        <Input
          className={classes.input}
          disableUnderline
          startAdornment={
            <div className={classes.adornment}>
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            </div>
          }
        />
        <div className={classes.exitIcon}>
          <ExitIcon />
        </div>
      </Toolbar>
    </AppBar>
  );
};