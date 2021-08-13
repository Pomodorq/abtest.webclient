import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersTable } from 'components/Users/UsersTable';
import { Box, Container, Grid } from '@material-ui/core';
import { UsersLifetime } from 'components/Users/UsersLifetime';

const useStyles = makeStyles({
  container: {
    padding: '0px 0px',
  },
  justifyContainer: {
    justifyContent: 'space-between',
  },
});

export const formatDate = (date: Date) => {
  let day = date.getDay().toString().padStart(2, '0');
  let month = date.getMonth().toString().padStart(2, '0');
  let year = date.getFullYear();
  return `${day}:${month}:${year}`;
};

export const UsersMetricsPage = () => {
  const classes = useStyles();
  const { projectId } = useParams();
  const navigate = useNavigate();

  if (!parseInt(projectId)) navigate('404');

  return (
    <Box p={{ xl: '20px 90px', lg: '20px 90px' }}>
      <Container maxWidth={'xl'} className={classes.container}>
        <Grid container spacing={5} className={classes.justifyContainer}>
          <Grid container item spacing={3} xl={5} lg={5} md={12} xs={12}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <UsersTable projectId={parseInt(projectId)} />
            </Grid>
          </Grid>
          <Grid container item spacing={3} xl={7} lg={7} md={12} xs={12}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <UsersLifetime projectId={parseInt(projectId)} />
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <div style={{ backgroundColor: 'blue', width: 600, height: 200 }}>
                Rolling retention
              </div>
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <div
                style={{ backgroundColor: 'white', width: 600, height: 200 }}
              >
                Profiler
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
