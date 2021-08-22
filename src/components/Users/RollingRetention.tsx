import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Container,
  Toolbar,
  Button,
} from '@material-ui/core';
import {
  getRollingRetention,
  RollingRetentionResult,
} from 'model/RollingRetentionResult';

const useStyles = makeStyles({
  caption: {
    marginBottom: 10,
  },
  container: {
    height: 180,
    minWidth: 350,
  },
  toolbar: {
    justifyContent: 'flex-end',
    padding: 0,
  },
  labelCenter: {
    maxWidth: 190,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  input: {
    width: '200px',
  },
  retentionResult: {
    color: 'rgba(238, 123, 48, 0.6)',
    fontSize: 80,
  },
});

interface Props {
  projectId: number;
}

export const RollingRetention = ({ projectId }: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [retention, setRetention] = useState<RollingRetentionResult | null>(
    null,
  );
  const [retentionMsg, setRetentionMsg] = useState<string | null>(null);

  const handleClickCalculate = async () => {
    setLoading(true);
    let ret = await getRollingRetention(projectId, 7);
    if (ret.ok) {
      setRetention(ret.body!);
      setRetentionMsg(null);
    } else {
      setRetentionMsg(ret.problem!.detail!);
      setRetention(null);
    }
    setLoading(false);
  };

  return (
    <Paper elevation={0}>
      <Typography variant="h2" className={classes.caption}>
        Rolling Retention 7 day
      </Typography>
      <Container className={classes.container}>
        <Container>
          <Typography className={classes.retentionResult}>
            {retention ? retention.value + '%' : null}
          </Typography>
          <Typography>{retentionMsg}</Typography>
        </Container>
      </Container>
      <Toolbar className={classes.toolbar}>
        <Button onClick={handleClickCalculate} disabled={loading}>
          Calculate rolling retention
        </Button>
      </Toolbar>
    </Paper>
  );
};
