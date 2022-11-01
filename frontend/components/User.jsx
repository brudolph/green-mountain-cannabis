import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        role {
          name
        }
        cart {
          id
          quantity
          product {
            id
            name
            slug
            inventory
            price
            category {
              name
            }
            priceThreshold {
              amount
              price
              name
            }
            photos {
              id
              image {
                publicUrl
              }
              altText
              product {
                name
              }
            }
            status
            vendor {
              id
              name
            }
            oil {
              weight
            }
            flower {
              weight
            }
            concentrate {
              weight
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
