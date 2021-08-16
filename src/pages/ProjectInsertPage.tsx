import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, Toolbar, Box, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  InputLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { postProject } from '../model/ProjectData';

const InputSeparate = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const useStyles = makeStyles({
  paperContainer: {
    height: 500,
    maxWidth: 700,
  },
  container: {
    height: 400,
    minWidth: 500,
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
  labelCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  helper: {
    display: 'flex',
    height: '20px',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '12px',
    color: '#FF5151',
    textTransform: 'uppercase',
  },
  input: {
    width: '500px',
  },
});

export const ProjectInsertPage = () => {
  const classes = useStyles();
  const [projectName, setProjectName] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [projectNameValidationMsg, setProjectNameValidationMsg] =
    React.useState<string | null>(null);

  const navigate = useNavigate();

  const handleClickSave = async () => {
    if (!validateProjectName) return;
    let createdProject = await postProject({
      $state: 'new',
      name: projectName!,
    });
    if (!createdProject) {
      navigate(`/404`);
      return;
    }
    navigate(`/app/projects/${createdProject.projectId!}/users`);
  };

  const handleProjectNameChange = (event: any) => {
    const name = event.target.value;
    setProjectName(name);
  };

  const validateProjectName = () => {
    if (!projectName) {
      setProjectNameValidationMsg('Project name is required');
      return false;
    }
    if (projectNameValidationMsg != null) {
      setProjectNameValidationMsg(null);
    }
    return true;
  };

  return (
    <Container className={classes.mainContainer}>
      <Paper elevation={0} className={classes.paperContainer}>
        <Box className={classes.usersCaption}>
          <Typography variant="h2" className={classes.caption}>
            Add project
          </Typography>
        </Box>
        <InputSeparate>
          <InputLabel className={classes.labelCenter} htmlFor="ProjectName">
            Project name:
          </InputLabel>
          <Input
            id="ProjectName"
            aria-describedby="my-helper-text"
            className={classes.input}
            value={projectName}
            onChange={handleProjectNameChange}
            onBlur={validateProjectName}
          />
        </InputSeparate>
        <FormHelperText id="my-helper-text" className={classes.helper}>
          {projectNameValidationMsg}
        </FormHelperText>
        <Toolbar className={classes.toolbar}>
          <Button onClick={handleClickSave}>Save</Button>
        </Toolbar>
      </Paper>
    </Container>
  );
};
