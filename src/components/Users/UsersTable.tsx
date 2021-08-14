import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  getUsers,
  UserData,
  deleteUsers,
  postUsers,
} from '../../model/UsersData';
import { useState } from 'react';
import { Typography, Button, Toolbar, Container } from '@material-ui/core';
import DialogUserAdd from 'components/Users/DialogUserAdd';

const useStyles = makeStyles({
  container: {
    height: 500,
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
});

export const formatDate = (date: Date | null | undefined) => {
  if (!date) return '';
  let day = date.getUTCDate().toString().padStart(2, '0');
  let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  let year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
};

interface Props {
  projectId: number;
}

export const UsersTable = ({ projectId }: Props) => {
  const classes = useStyles();

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogUserAddOpen, setIsDialogUserAddOpen] =
    useState<boolean>(false);

  React.useEffect(() => {
    const doGetUsers = async () => {
      const foundUsers = await getUsers(projectId);
      setUsers(foundUsers);
      setLoading(false);
    };
    doGetUsers();
  }, [projectId]);

  const handleClickClear = async () => {
    setLoading(true);
    await deleteUsers(projectId);
    const foundUsers = await getUsers(projectId);
    setUsers(foundUsers);
    setLoading(false);
  };

  const handleClickAdd = async () => {
    setIsDialogUserAddOpen(true);
  };

  const handleClickSave = async () => {
    setLoading(true);
    await postUsers(
      users.filter((x) => x.$state === 'new'),
      projectId,
    );
    const foundUsers = await getUsers(projectId);
    setUsers(foundUsers);
    setLoading(false);
  };

  return (
    <Paper elevation={0}>
      <Typography variant="h2" className={classes.caption}>
        Users
      </Typography>
      <TableContainer component={Paper} className={classes.container}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell align="left">Date Registration</TableCell>
              <TableCell align="left">Date Last Activity</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <Container>
              <Typography>Loading...</Typography>
            </Container>
          ) : (
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell align="left">{row.userId}</TableCell>
                  <TableCell align="left">
                    {formatDate(row.dateRegistration)}
                  </TableCell>
                  <TableCell align="left">
                    {formatDate(row.dateLastActivity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Toolbar className={classes.toolbar}>
        <Button
          className={classes.btnLeft}
          onClick={handleClickClear}
          disabled={loading}
        >
          Clear
        </Button>
        <Button
          onClick={handleClickSave}
          className={classes.btn}
          disabled={loading}
        >
          Save
        </Button>
        <Button onClick={handleClickAdd} disabled={loading}>
          Add
        </Button>
      </Toolbar>
      <DialogUserAdd
        isOpen={isDialogUserAddOpen}
        handleClose={() => setIsDialogUserAddOpen(false)}
        handleSave={(newUser) => {
          setUsers([...users, newUser]);
        }}
        projectId={projectId}
        users={users}
      />
    </Paper>
  );
};
