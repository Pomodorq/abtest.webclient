import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersTable } from 'components/Users/UsersTable';
import { Box, Container, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '0px 0px',
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

  // return (
  //   <Box p={{ xl: '20px 90px', lg: '20px 90px' }}>
  //     <Container maxWidth={'xl'} className={classes.container}>
  //       <Grid container spacing={3}>
  //         <Grid item xl={4} lg={4} md={12} xs={12}>
  //           <UsersTable projectId={parseInt(projectId)} />
  //         </Grid>
  //         <Grid item xl={8} lg={8} md={12} xs={12}>
  //           <UsersTable projectId={parseInt(projectId)} />
  //         </Grid>
  //         <Grid item xl={4} lg={4} md={12} xs={12}>
  //           <UsersTable projectId={parseInt(projectId)} />
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   </Box>
  // );
  return (
    <Box p={{ xl: '20px 90px', lg: '20px 90px' }}>
      <Container maxWidth={'xl'} className={classes.container}>
        <Grid container spacing={3}>
          <Grid container item spacing={3} xl={4} lg={4} md={12} xs={12}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <UsersTable projectId={parseInt(projectId)} />
            </Grid>
          </Grid>
          <Grid container item spacing={3} xl={8} lg={8} md={12} xs={12}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <div
                style={{ backgroundColor: 'pink', width: 1000, height: 400 }}
              >
                Users Lifetime
              </div>
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <div style={{ backgroundColor: 'blue', width: 600, height: 200 }}>
                Rolling retention
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
