import React, {useState} from "react";
import {InputLabel, MenuItem, FormControl, Grid, TextField, Button} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    flexGrow: 1
  },
  inputLabel: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(2)

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {

  }
}));




export default function PaymentForm(props) {

    const classes = useStyles();
    const [paymentConfirmation, setPaymentConfirmation] = React.useState({ message: 'Not Submitted', card_plaintext: 'No value until form is submitted...', card_ciphertext: 'No value until form is submitted...'});
    const [cardType, setCardType] = React.useState('');
    const [name, setCardholderName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cvc, setCVC] = React.useState(0);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const SUBMIT_PAYMENT = gql`
mutation {
  pay(
    details: {
      name: "${name}",
      type: "${cardType}",
      number: "${cardNumber}",
      expiry: "${expiryDate}",
      cv2: ${cvc},
      amount: 3.99,
    }
  ){
    id,
    card_plaintext,
    card_ciphertext,
    message
  } 
}
`
    const onCompleted = (data) => {
      setPaymentConfirmation(data.pay)
    }

    const onError = (error) => {
      alert(error)
    }

    const [submitPayment] = useMutation(SUBMIT_PAYMENT, {onCompleted, onError})



    const handleCardTypeChange = (e) => {
      setCardType(e.target.value);
    };

    const handleCardNameChange = (e) => {
      setCardholderName(e.target.value);
    };

    const handleCardNumberChange = (e) => {
      setCardNumber(e.target.value);
    };

    const handleCVC = (e) => {
      setCVC(e.target.value);
    };


    const handleDateChange = (date) => {
      setExpiryDate(date);
    };


    function handleSubmit(e) {
        e.preventDefault();

        if (!cardType || !name || !cardNumber || !cvc || !expiryDate) {
         alert('One of the required fields is missing') 
         return;
        }

        submitPayment()
    }

//'{"name": "Gerry", "type": "mastercard", "number": "1234-1234-1234-1234", "expiry": "01/23", "cvc": "123"}' localhost:8080  | jq
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="column"
        >
          <Grid item xs={12}>
                <FormControl  fullWidth >
                  <InputLabel 
                    id="cardTypeMUILabel" 
                    variant="standard"
                    className={classes.root}
                    required
                  >
                    {props.dropdownDefault}</InputLabel>
                  <Select
                    id="cardTypeMUI"
                    value={cardType}
                    onChange={handleCardTypeChange}
                    className={classes.root}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Visa'}>Visa</MenuItem>
                    <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
                    <MenuItem value={'AmericanExpress'}>AmericanExpress</MenuItem>
                  </Select>

                  <TextField 
                    id="name" 
                    label="Cardholder Name"
                    className={classes.root}
                    onChange={handleCardNameChange}
                    required
                  />
                  <TextField 
                    id="number" 
                    label="Card Number"
                    className={classes.root}
                    onChange={handleCardNumberChange}
                    required
                  />
                  <TextField 
                    id="cvc" 
                    label="CVC"
                    className={classes.root}
                    onChange={handleCVC}
                    required
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.root}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Expiry Date"
                        format="MM/dd/yyyy"
                        value={expiryDate}
                        onChange={handleDateChange}
                        className={classes.root}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                      />
                  </MuiPickersUtilsProvider>
              </FormControl>
                  <Button
                    variant="contained"
                    className={classes.button}
                    fullWidth
                    type="submit"
                    onClick={handleSubmit}
                  >Submit Payment</Button>
                  <p> Status: <b>{paymentConfirmation.message}</b> </p>
                  <p> Encryption Status: <b>{paymentConfirmation.card_ciphertext}</b> </p>
                  <p> CardData Returned from Backend in plaintext :( : <b>{paymentConfirmation.card_plaintext}</b></p>

              </Grid>
            </Grid>

      </div>

    );


  }