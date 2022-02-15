import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(auth:{
      username: $username
      password: $password
    }) {
      userId
      username
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LogIn($username: String!, $password: String!) {
    login(auth:{
      username: $username
      password: $password
    }) {
      userId
      username
      token
    }
  }
`

const SIGNOUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`

const SUBMIT_PAYMENT_MUTATION = gql`
  mutation SubmitPayment($name: String!, $cardType: String!, $cardNumber: String!, $expiryDate: String!, $cvc: Int!, $amount: Float!) {
    pay(details: {
      name: $name,
      type: $cardType,
      number: $cardNumber,
      expiry: $expiryDate,
      cv2: $cvc,
      amount: $amount,
    }) {
      id,
      card_plaintext,
      card_ciphertext,
      message
    } 
  }
`

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($orderItems: [OrderItemInput!]){
    order(items: $orderItems) {
      id,
      items {
        coffee { id, name, price }
        quantity
      }
    } 
  }
`

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  SIGNOUT_MUTATION,
  SUBMIT_PAYMENT_MUTATION,
  CREATE_ORDER_MUTATION
};
