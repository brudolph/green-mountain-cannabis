import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import { styled } from 'twin.macro';
import ErrorMessage from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from '../styles/OrderItemStyles';
import PleaseSignIn from '../components/PleaseSignIn';
import { useUser } from '../components/User';
import { MyLink } from '../components/MyLink';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($userid: ID) {
    allOrders(where: { user: { id: { equals: $userid } } }) {
      id
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
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
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const user = useUser();
  const userid = user.id;

  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
    variables: {
      userid,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (!user) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return (
    <PleaseSignIn>
      <Head>
        <title>Your Orders (${allOrders.length})</title>
      </Head>
      <div tw="max-w-7xl mx-auto py-16 px-6">
        <h1>You have {allOrders.length} orders!</h1>
        <OrderUl>
          {allOrders.map((order) => (
            <OrderItemStyles>
              <MyLink href={`/order/${order.id}`}>
                <a>
                  <div className="order-meta">
                    <p>Qty. {countItemsInAnOrder(order)}</p>
                    <p>
                      {order.items.length} Product
                      {order.items.length === 1 ? '' : 's'}
                    </p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img
                        key={`image-${item.id}`}
                        src={item?.photo?.image?.publicUrl}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </a>
              </MyLink>
            </OrderItemStyles>
          ))}
        </OrderUl>
      </div>
    </PleaseSignIn>
  );
}
