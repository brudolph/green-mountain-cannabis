import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Head from 'next/head';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
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
        weight
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
function SingleOrderPage({ query }) {
  console.log(typeof query);
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data;
  return (
    <OrderStyles>
      <Head>
        <title>Green Mountain Cannabis - ${order.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>ItemCount:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item?.photo?.image.publicUrl} alt={item.title} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>
                Qty: {item.quantity} {item.weight}
              </p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

SingleOrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.any,
  }),
};

export default SingleOrderPage;
