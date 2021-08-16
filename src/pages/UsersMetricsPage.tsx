import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users } from 'components/Users/Users';
import { UsersLifetime } from 'components/Users/UsersLifetime';
import { RollingRetention } from 'components/Users/RollingRetention';
import { Profiler } from 'components/Users/Profiler';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0px 0px',
  },
  justifyContainer: {
    justifyContent: 'space-between',
  },
});

export const UsersMetricsPage = () => {
  const classes = useStyles();
  const { projectId } = useParams();
  const navigate = useNavigate();

  if (!parseInt(projectId)) navigate('404');

  return (
    <Box p={{ xl: '20px 90px', lg: '20px 90px' }}>
      <Container maxWidth={'xl'} className={classes.container}>
        <Grid container spacing={3} className={classes.justifyContainer}>
          <Grid item xl={4} lg={4} md={12} xs={12}>
            <Users projectId={parseInt(projectId)} />
          </Grid>
          <Grid item xl={8} lg={8} md={12} xs={12}>
            <UsersLifetime projectId={parseInt(projectId)} />
          </Grid>
          <Grid item xl={4} lg={4} md={12} xs={12}>
            <RollingRetention projectId={parseInt(projectId)} />
          </Grid>
          <Grid item xl={8} lg={8} md={12} xs={12}>
            <Profiler projectId={parseInt(projectId)} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
