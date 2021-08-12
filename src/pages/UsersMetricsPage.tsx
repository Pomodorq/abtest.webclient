import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUsers, postUsers, UserData } from 'model/UsersData';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650,
  // },
  container: {
    maxHeight: 440,
    width: 500,
  },
  cell: {
    width: 50,
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

  const [users, setUsers] = useState<UserData[]>([]);
  React.useEffect(() => {
    const doGetUsers = async () => {
      const foundUsers = await getUsers(parseInt(projectId));
      setUsers(foundUsers);
    };
    doGetUsers();
  }, []);

  return (
    <div>
      <Paper>
        <h1>Users {projectId}</h1>
        <TableContainer component={Paper} className={classes.container}>
          <Table size="small">
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
    </div>
  );
};
