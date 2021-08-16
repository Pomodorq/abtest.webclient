import { ResponsiveBar } from '@nivo/bar';
import { LifetimeIntervalCount } from 'model/LifetimeIntervalCount';
import { useState } from 'react';
import React from 'react';
import { getLifetimeCountsByIntervals } from 'model/LifetimeIntervalCount';
import {
  Paper,
  Typography,
  Container,
  Toolbar,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { add } from 'store/usersSlice';
import { useAppDispatch } from 'store/hook';

const useStyles = makeStyles({
  caption: {
    marginBottom: 10,
  },
  paperContainer: {
    height: 500,
  },
  container: {
    height: 400,
    minWidth: 500,
  },
  toolbar: {
    justifyContent: 'flex-end',
    //padding: 0,
  },
});

interface Props {
  projectId: number;
}

export const UsersLifetime = ({ projectId }: Props) => {
  const classes = useStyles();
  const [lifetimeCounts, setLifetimeCounts] = useState<LifetimeIntervalCount[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClickCalculate = async () => {
    setLoading(true);
    const foundLifetimeCounts = await getLifetimeCountsByIntervals(
      projectId,
      (x) => {
        dispatch(add(x));
      },
    );
    setLifetimeCounts(foundLifetimeCounts);
    setLoading(false);
  };

  return (
    <Paper elevation={0} className={classes.paperContainer}>
      <Typography variant="h2" className={classes.caption}>
        Lifetimes
      </Typography>
      <Container className={classes.container}>
        <ResponsiveBar
          data={lifetimeCounts}
          keys={['count']}
          valueScale={{ type: 'linear' }}
          animate={false}
          indexBy="lifetimeInterval"
          padding={0.2}
          labelTextColor="inherit:darker(1.4)"
          colors={'rgba(238, 123, 48, 0.6)'}
          labelSkipWidth={16}
          labelSkipHeight={16}
          margin={{ left: 40, top: 10, bottom: 20 }}
        />
      </Container>
      <Toolbar className={classes.toolbar}>
        <Button onClick={handleClickCalculate} disabled={loading}>
          Calculate lifetimes
        </Button>
      </Toolbar>
    </Paper>
  );
};
