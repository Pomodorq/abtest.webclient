import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import { Typography, Button, Toolbar, Box, Container } from '@material-ui/core';
import { getProjects, ProjectData } from 'model/ProjectData';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  paperContainer: {
    height: 500,
  },
  container: {
    height: 400,
    minWidth: 350,
  },
  caption: {
    marginBottom: 10,
  },
  toolbar: {
    justifyContent: 'flex-end',
    padding: 0,
  },
  btn: {
    margin: '5px',
  },
  btnLeft: {
    marginRight: 'auto',
  },
  newRow: {
    backgroundColor: 'rgba(74, 157, 255, 0.08)',
  },
  info: {
    color: 'rgba(93, 109, 151, 0.75)',
  },
  usersCaption: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainContainer: {
    marginTop: 40,
  },
  smallCell: {
    width: 150,
  },
});

export const ProjectsPage = () => {
  const classes = useStyles();

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    const doGetProjects = async () => {
      const foundProjects = await getProjects();
      setProjects(foundProjects);
      setLoading(false);
    };
    doGetProjects();
  }, []);

  const handleClickAdd = async () => {
    navigate('/app/projects/new');
  };

  const handleRowClick = (e: any, projectId: number) => {
    navigate(`/app/projects/${projectId}/users`);
  };

  return (
    <Container className={classes.mainContainer}>
      <Paper elevation={0} className={classes.paperContainer}>
        <Box className={classes.usersCaption}>
          <Typography variant="h2" className={classes.caption}>
            Projects
          </Typography>
        </Box>
        <TableContainer component={Paper} className={classes.container}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.smallCell}>ProjectId</TableCell>
                <TableCell align="left">Project Name</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow>
                  <Typography>Loading...</Typography>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {projects.map((row) => (
                  <TableRow
                    hover
                    key={row.projectId}
                    onClick={(e) => handleRowClick(e, row.projectId!)}
                  >
                    <TableCell className={classes.smallCell} align="left">
                      {row.projectId}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Toolbar className={classes.toolbar}>
          <Button onClick={handleClickAdd} disabled={loading}>
            Add
          </Button>
        </Toolbar>
      </Paper>
    </Container>
  );
};
