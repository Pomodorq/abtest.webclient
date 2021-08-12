import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUsers, UserData } from '../../model/UsersData';
import { useState } from 'react';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
  container: {
    height: 500,
    minWidth: 500,
  },
  cell: {
    minWidth: 50,
  },
  caption: {
    marginBottom: 10,
  },
});

export const formatDate = (date: Date) => {
  let day = date.getDay().toString().padStart(2, '0');
  let month = date.getMonth().toString().padStart(2, '0');
  let year = date.getFullYear();
  return `${day}:${month}:${year}`;
};

interface Props {
  projectId: number;
}

export const UsersTable = ({ projectId }: Props) => {
  const classes = useStyles();

  const [users, setUsers] = useState<UserData[]>([]);
  React.useEffect(() => {
    const doGetUsers = async () => {
      const foundUsers = await getUsers(projectId);
      setUsers(foundUsers);
    };
    doGetUsers();
  }, []);

  return (
    <Paper elevation={0}>
      <Typography variant="h2" className={classes.caption}>
        Users
      </Typography>
      <TableContainer component={Paper} className={classes.container}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>UserId</TableCell>
              <TableCell align="left">Date Registration</TableCell>
              <TableCell align="left">Date Last Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.userId}>
                <TableCell className={classes.cell} align="left">
                  {row.userId}
                </TableCell>
                <TableCell align="left">
                  {formatDate(row.dateRegistration)}
                </TableCell>
                <TableCell align="left">
                  {formatDate(row.dateLastActivity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
