import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 700,
    letterSpacing: '0em',
    color: '#5D6E97',
    textTransform: 'uppercase',
  },
}));

const ABTestLogo = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.logo} noWrap>
      AB Test Real
    </Typography>
  );
};

export default ABTestLogo;
