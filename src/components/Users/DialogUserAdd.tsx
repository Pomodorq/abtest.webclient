import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Input,
  InputLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { UserData } from 'model/UsersData';

const InputSeparate = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  //marginBottom: '20px',
}));

const useStyles = makeStyles({
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
    width: '200px',
  },
});

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (user: UserData) => void;
  projectId: number;
  users: UserData[];
}

export default function DialogUserAdd({
  isOpen,
  handleClose,
  handleSave,
  projectId,
  users,
}: Props) {
  const classes = useStyles();

  const [userId, setUserId] = React.useState<string | null>(null);

  const [dateLastActivity, setDateLastActivity] = React.useState<Date | null>(
    null,
  );
  const [dateRegistration, setDateRegistration] = React.useState<Date | null>(
    null,
  );

  const [userIdValidationMsg, setUserIdValidationMsg] = React.useState<
    string | null
  >(null);
  const [dateLastActivityValidationMsg, setDateLastActivityValidationMsg] =
    React.useState<string | null>(null);
  const [dateRegistrationValidationMsg, setDateRegistrationValidationMsg] =
    React.useState<string | null>(null);

  const handleUserIdChange = (event: any) => {
    const id = event.target.value;
    setUserId(id);
  };

  const makeDate = (value: string) => {
    let a = value.split('.');
    let day = a[0];
    let month = a[1];
    let year = a[2];
    return new Date(`${year}-${month}-${day}T00:00:00-00:00`);
  };

  const handleDateRegistrationChange = (
    event: any,
    value: string | null | undefined,
  ) => {
    if (!value) {
      setDateRegistration(null);
      return;
    }
    setDateRegistration(makeDate(value));
  };
  const handleDateLastActivityChange = (
    event: any,
    value: string | null | undefined,
  ) => {
    if (!value) {
      setDateLastActivity(null);
      return;
    }
    setDateLastActivity(makeDate(value));
  };

  const validateUserId = () => {
    if (!userId) {
      setUserIdValidationMsg('UserId is required');
      return false;
    }
    var pattern = /^(0|([1-9]\d*))$/;
    if (!pattern.test(userId)) {
      setUserIdValidationMsg('UserId must be integer');
      return false;
    }
    if (users.find((x) => x.userId === parseInt(userId))) {
      setUserIdValidationMsg('User with such UserId already added');
      return false;
    }
    if (userIdValidationMsg != null) {
      setUserIdValidationMsg(null);
    }
    return true;
  };

  const validateDateRegistration = () => {
    if (!dateRegistration) {
      setDateRegistrationValidationMsg('Date Registration is required');
      return false;
    }
    /* eslint-disable no-self-compare */
    if (dateRegistration.getTime() !== dateRegistration.getTime()) {
      setDateRegistrationValidationMsg('Date Registration is invalid');
      return false;
    }
    if (dateRegistrationValidationMsg != null) {
      setDateRegistrationValidationMsg(null);
    }
    return true;
  };

  const validateDateLastActivity = () => {
    if (!dateLastActivity) {
      setDateLastActivityValidationMsg('Date Last Activity is required');
      return false;
    }
    /* eslint-disable no-self-compare */
    if (dateLastActivity.getTime() !== dateLastActivity.getTime()) {
      setDateLastActivityValidationMsg('Date Last Activity is invalid');
      return false;
    }
    if (dateRegistration && dateLastActivity < dateRegistration) {
      setDateLastActivityValidationMsg(
        'Date must be more or equals to Date Registration',
      );
      return false;
    }
    if (dateLastActivityValidationMsg != null) {
      setDateLastActivityValidationMsg(null);
    }
    return true;
  };

  const handleSaveClick = () => {
    let a = validateUserId();
    let b = validateDateLastActivity();
    let c = validateDateRegistration();
    if (!a || !b || !c) return;

    let newUser: UserData = {
      $state: 'new',
      projectId: projectId,
      userId: parseInt(userId!),
      dateLastActivity: dateLastActivity!,
      dateRegistration: dateRegistration!,
    };

    handleSave(newUser);
    setDateLastActivity(null);
    setDateRegistration(null);
    setUserId(null);
    handleClose();
  };

  const handleCancelClick = () => {
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h2">Add new user</Typography>
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <InputSeparate>
            <InputLabel className={classes.labelCenter} htmlFor="UserId">
              UserId
            </InputLabel>
            <Input
              id="UserId"
              aria-describedby="my-helper-text"
              className={classes.input}
              value={userId}
              onChange={handleUserIdChange}
              onBlur={validateUserId}
            />
          </InputSeparate>
          <FormHelperText id="my-helper-text" className={classes.helper}>
            {userIdValidationMsg}
          </FormHelperText>
          <InputSeparate>
            <InputLabel
              className={classes.labelCenter}
              htmlFor="DateRegistration"
            >
              Date Registration
            </InputLabel>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd.MM.yyyy"
              id="date-picker-inline"
              value={dateRegistration}
              onChange={handleDateRegistrationChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={classes.input}
            />
          </InputSeparate>
          <FormHelperText id="my-helper-text" className={classes.helper}>
            {dateRegistrationValidationMsg}
          </FormHelperText>
          <InputSeparate>
            <InputLabel
              className={classes.labelCenter}
              htmlFor="DateLastActivity"
            >
              Date Last Activity
            </InputLabel>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd.MM.yyyy"
              id="date-last-activity"
              value={dateLastActivity}
              onChange={handleDateLastActivityChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              className={classes.input}
            />
          </InputSeparate>
          <FormHelperText id="my-helper-text" className={classes.helper}>
            {dateLastActivityValidationMsg}
          </FormHelperText>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveClick}>Add</Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
