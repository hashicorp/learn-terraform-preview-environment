import gql from 'graphql-tag';

const ALL_COFFEES_QUERY = gql`
  query GetCoffees {

    coffees {
      id
      name
      image
    }
  }
`

const COFFEE_QUERY = gql`
  query GetCoffee($coffeeID: String!) {
    coffee(id: $coffeeID) {
      id
      name
      image
      teaser
      collection
      origin
      color
      price
    }
  }
`;

const COFFEE_IMG_QUERY = gql`
  query GetCoffee($coffeeID: String!) {
    coffee(id: $coffeeID) {
      image
    }
  }
`;

const COFFEE_INGREDIENTS_QUERY = gql`
  query GetCoffeeIngredients($coffeeID: String!) {
    coffeeIngredients(coffeeID: $coffeeID) {
      unit
      quantity
      name
    }
  }
`;

const ALL_ORDERS_QUERY = gql`
  query GetAllOrders {
    orders {
      id
      items {
        coffee { name, price, image }
        quantity
      }
    }
  }
`;

const ORDER_QUERY = gql`
  query GetOrder($orderID: String!) {
    order(id: $orderID) {
      id
      items {
        coffee { name, price, image }
        quantity
      }
    }
  }
`;

export {
  ALL_COFFEES_QUERY,
  COFFEE_QUERY,
  COFFEE_IMG_QUERY,
  COFFEE_INGREDIENTS_QUERY,
  ALL_ORDERS_QUERY,
  ORDER_QUERY
};
