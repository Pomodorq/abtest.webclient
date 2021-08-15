import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ProfilerMsg } from 'model/ProfilerMsg';

const useStyles = makeStyles({
  paperContainer: {
    height: 200,
    maxWidth: 900,
  },
  container: {
    height: 170,
    minWidth: 350,
  },
});

interface Props {
  profiler: ProfilerMsg[];
}

export const reversedBody = (profiler: ProfilerMsg[]) => {
  let result = [];
  for (let i = profiler.length - 1; i > -1; --i) {
    let row = (
      <TableRow key={i}>
        <TableCell align="left">{profiler[i].actionName}</TableCell>
        <TableCell align="left">{profiler[i].time}</TableCell>
      </TableRow>
    );
    result.push(row);
  }
  return result;
};

export const ProfilerTable = ({ profiler }: Props) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paperContainer}>
      <TableContainer component={Paper} className={classes.container}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell align="left">Time (in ms)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{reversedBody(profiler)}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
