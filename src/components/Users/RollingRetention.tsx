import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  FormHelperText,
  Typography,
  Paper,
  Container,
  Toolbar,
  Button,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { getRollingRetention } from 'model/LifetimeIntervalCount';

const InputSeparate = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 400,
}));

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
  helper: {
    display: 'flex',
    height: '20px',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '12px',
    color: '#FF5151',
    textTransform: 'uppercase',
  },
  input: {
    width: '200px',
  },
  retentionResult: {
    color: 'rgba(238, 123, 48, 0.6)',
    fontSize: 100,
  },
});

interface Props {
  projectId: number;
}

export const RollingRetention = ({ projectId }: Props) => {
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(null);
  const [dateValidationMsg, setDateValidationMsg] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [retention, setRetention] = useState<number | null>(null);

  const handleClickCalculate = async () => {
    if (!validateDate()) return;
    setLoading(true);
    let ret = await getRollingRetention(projectId, 7, date);
    setRetention(ret);
    console.log(retention);
    setLoading(false);
  };

  const makeDate = (value: string) => {
    let a = value.split('.');
    let day = a[0];
    let month = a[1];
    let year = a[2];
    return new Date(`${year}-${month}-${day}T00:00:00-00:00`);
  };

  const handleDateChange = (event: any, value: string | null | undefined) => {
    if (!value) {
      setDate(null);
      return;
    }
    setDate(makeDate(value));
  };

  const validateDate = () => {
    if (!date) {
      return true;
    }
    /* eslint-disable no-self-compare */
    if (date.getTime() !== date.getTime()) {
      return false;
    }
    if (dateValidationMsg != null) {
      setDateValidationMsg(null);
    }
    return true;
  };

  return (
    <Paper elevation={0}>
      <Typography variant="h2" className={classes.caption}>
        Rolling Retention 7 day
      </Typography>
      <Container className={classes.container}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <InputSeparate>
            <InputLabel
              className={classes.labelCenter}
              htmlFor="DateRegistration"
            >
              Start date (minimal registration date by default):
            </InputLabel>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd.MM.yyyy"
              id="date-picker-inline"
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={classes.input}
            />
          </InputSeparate>
          <FormHelperText id="my-helper-text" className={classes.helper}>
            {dateValidationMsg}
          </FormHelperText>
          <Container>
            <Typography className={classes.retentionResult}>
              <React.Fragment>
                {retention}
                {retention || retention === 0 ? '%' : null}
              </React.Fragment>
            </Typography>
          </Container>
        </MuiPickersUtilsProvider>
      </Container>
      <Toolbar className={classes.toolbar}>
        <Button onClick={handleClickCalculate} disabled={loading}>
          Calculate rolling retention
        </Button>
      </Toolbar>
    </Paper>
  );
};
