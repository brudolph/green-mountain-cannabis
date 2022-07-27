import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            name
            inventory
            weight
            potency
            strain
            price_threshold {
              price
              amount
              weight
              threshold
            }
            environment
            description
            photo {
              id
              image {
                publicUrl
              }
              altText
              product {
                name
              }
            }
            vendor {
              name
              vendor_ID
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
