import React from 'react';
import { Paper, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selectProfiler } from 'store/usersSlice';
import { useAppSelector } from 'store/hook';
import { ProfilerTable } from 'components/Users/ProfilerTable';

const useStyles = makeStyles({
  caption: {
    marginBottom: 10,
  },
  container: {
    height: 200,
    minWidth: 500,
    padding: 0,
  },
});

interface Props {
  projectId: number;
}

export const Profiler = ({ projectId }: Props) => {
  const classes = useStyles();
  const profiler = useAppSelector(selectProfiler);

  return (
    <Paper elevation={0}>
      <Typography variant="h2" className={classes.caption}>
        Profiler
      </Typography>
      <Container className={classes.container}>
        <ProfilerTable profiler={profiler} />
      </Container>
    </Paper>
  );
};
