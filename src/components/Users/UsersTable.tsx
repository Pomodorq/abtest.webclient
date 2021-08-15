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
import { Typography, Button, Toolbar, Box } from '@material-ui/core';
import DialogUserAdd from 'components/Users/DialogUserAdd';
import { add } from 'store/usersSlice';
import { useAppDispatch } from 'store/hook';

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
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const doGetUsers = async () => {
      let start = Date.now();
      const foundUsers = await getUsers(projectId);
      let end = Date.now();
      dispatch(
        add({
          actionName: `[WebClient] Get ${foundUsers.length} users`,
          time: end - start,
        }),
      );
      setUsers(foundUsers);
      setLoading(false);
    };
    doGetUsers();
  }, [projectId]);

  const refreshUsers = async () => {
    let start = Date.now();
    const foundUsers = await getUsers(projectId);
    let end = Date.now();
    setUsers(foundUsers);
    dispatch(
      add({
        actionName: `[WebClient] Get ${foundUsers.length} users`,
        time: end - start,
      }),
    );
  };

  const handleClickClear = async () => {
    setLoading(true);
    await deleteUsers(projectId);
    await refreshUsers();
    setLoading(false);
  };

  const handleClickAdd = async () => {
    setIsDialogUserAddOpen(true);
  };

  const handleClickSave = async () => {
    setLoading(true);
    let start = Date.now();
    await postUsers(
      users.filter((x) => x.$state === 'new'),
      projectId,
    );
    let end = Date.now();
    dispatch(
      add({
        actionName: `[WebClient] Post new users`,
        time: end - start,
      }),
    );
    await refreshUsers();
    setUnsaved(false);
    setLoading(false);
  };

  return (
    <Paper elevation={0} className={classes.paperContainer}>
      <Box className={classes.usersCaption}>
        <Typography variant="h2" className={classes.caption}>
          Users
        </Typography>
        <Typography className={classes.info}>
          {unsaved ? '*There are unsaved data' : null}
        </Typography>
      </Box>
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
            <TableBody>
              <TableRow>
                <Typography>Loading...</Typography>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell
                    align="left"
                    className={
                      row.$state === 'new' ? classes.newRow : undefined
                    }
                  >
                    {row.userId}
                  </TableCell>
                  <TableCell
                    className={
                      row.$state === 'new' ? classes.newRow : undefined
                    }
                    align="left"
                  >
                    {formatDate(row.dateRegistration)}
                  </TableCell>
                  <TableCell
                    className={
                      row.$state === 'new' ? classes.newRow : undefined
                    }
                    align="left"
                  >
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
          setUnsaved(true);
        }}
        projectId={projectId}
        users={users}
      />
    </Paper>
  );
};
