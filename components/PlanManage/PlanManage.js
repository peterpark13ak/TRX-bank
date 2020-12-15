import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  Button, Container, useMediaQuery, Grid, Typography, IconButton, FormControlLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './plan-style';
import routeLink from '~/static/text/link';
import { useDispatch, useSelector } from "react-redux";
import { reauthenticate, deauthenticate, get_plans, update_plan } from '~/store/actions/main';
import Router from 'next/router';

function PlanManage(props) {

  const classes = useStyles();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedPlanId, setPlanId] = useState(-1);
  const [value, setValue] = useState({
    dailyIncome: 0,
    days: 0
  })

  const dispatch = useDispatch();
  const plans = useSelector(state => state.main.data.plans);

  useEffect(() => {
    dispatch(reauthenticate());
    if (plans === null) {
      dispatch(get_plans());
    }
  }, [plans]);

  const handleSignOut = () => {
    dispatch(deauthenticate());
  }

  const handleSave = () => {
    dispatch(update_plan({
      id: plans[selectedPlanId].id,
      name: plans[selectedPlanId].name,
      ...value
    }));
    setPlanId(-1);
  }

  return (
    <Container maxWidth='md' className={classes.mainContainer}>
      <div style={{textAlign: 'right', marginBottom: 6}}>
        <Button onClick={() => handleSignOut()}>Sign Out</Button>
      </div>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Plans</TableCell>
              <TableCell align="right">Daily Income(%)</TableCell>
              <TableCell align="right">Days</TableCell>
              <TableCell align="right">Total Income(%)</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans && plans.map((row, idx) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.dailyIncome}</TableCell>
                <TableCell align="right">{row.days}</TableCell>
                <TableCell align="right">{(row.dailyIncome * row.days).toFixed(1)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => {
                    setPlanId(idx);
                    setValue({
                      dailyIncome: row.dailyIncome,
                      days: row.days
                    })
                  }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={selectedPlanId >= 0} onClose={() => setPlanId(-1)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{selectedPlanId >= 0 && plans[selectedPlanId].name}</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <OutlinedInput
                type="number"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                value={value.dailyIncome}
                onChange={(ev) => {
                  setValue({...value, dailyIncome: ev.target.value})
                }}
                inputProps={{
                  'aria-label': 'weight',
                }}
                style={{margin: 6, width: 150}}
              />
            }
            labelPlacement="start"
            label={<div style={{minWidth: 120}}>Daily Income</div>}
          />
          <br />
          <FormControlLabel
            control={
              <OutlinedInput
                type="number"
                value={value.days}
                onChange={(ev) => {
                  setValue({...value, days: ev.target.value})
                }}
                endAdornment={<InputAdornment position="end">day(s)</InputAdornment>}
                inputProps={{
                  'aria-label': 'weight',
                }}
                style={{margin: 6, width: 150}}
              />
            }
            labelPlacement="start"
            label={<div style={{minWidth: 120}}>Days</div>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPlanId(-1)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSave()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PlanManage;