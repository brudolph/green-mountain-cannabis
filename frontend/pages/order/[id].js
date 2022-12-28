import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Head from 'next/head';
import 'twin.macro';
import ErrorMessage from '../../components/ErrorMessage';
import { ContainerStyles, PageContainerStyles } from '../../styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';
import PleaseSignIn from '../../components/PleaseSignIn';
import ImageWithFallback from '../../components/FallbackImage.tsx';
import formatQuantity from '../../lib/formatQuantity';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(where: { id: $id }) {
      id
      total
      orderDate
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
          image {
            publicUrl
          }
        }
      }
    }
  }
`;
function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data;
  return (
    <PleaseSignIn>
      <Head>
        <title>Order: {order.id} - Green Mountain Cannabis</title>
      </Head>
      <ContainerStyles hasBgPrimaryLight20>
        <PageContainerStyles>
          <h1 tw="text-center">
            Order <span tw="text-xl block">#{order.id}</span>
          </h1>
          <div tw="mt-10">
            <h2 tw="sr-only">Recent orders</h2>
            <div tw="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div tw="px-6 pb-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <div tw="lg:col-span-8 space-y-8 sm:px-4 lg:px-0">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      tw="bg-white border-t border-b border-gray-200 shadow-md sm:rounded-lg sm:border"
                    >
                      <div tw="p-4 sm:px-6 sm:pt-6 sm:pb-2">
                        <h3>{item.name}</h3>
                      </div>
                      {/* Products */}
                      <h3 tw="sr-only">Items</h3>
                      <div tw="flex justify-between p-4 sm:p-6">
                        <ImageWithFallback
                          tw="object-cover"
                          width={128}
                          height={96}
                          layout="fixed"
                          alt={item.name}
                          src={
                            item?.photo
                              ? item?.photo?.image?.publicUrl
                              : '/failed.jpg'
                          }
                        />
                        <ul tw="space-y-4 text-right">
                          <li tw="mt-2 sm:mt-0">
                            <span tw="font-semibold">Price:</span>{' '}
                            {formatMoney(item.price)}
                          </li>
                          <li>
                            <span tw="font-semibold">Quantity:</span>{' '}
                            {formatQuantity(item.quantity)}
                          </li>
                          <li>
                            <span tw="font-semibold">Sub Total:</span>{' '}
                            {formatMoney(item.price * item.quantity)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  aria-labelledby="summary-heading"
                  tw="sticky top-5 mt-16 rounded-lg bg-primary-light/40 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    tw="text-lg font-medium text-gray-900"
                  >
                    Order summary
                  </h2>
                  <div tw="bg-white border rounded-md shadow-md border-primary-light/30 px-5 py-6 mb-4">
                    <dl tw="pt-4 pb-6">
                      <dt tw="font-semibold">Order Total</dt>{' '}
                      <dd>{formatMoney(order.total)}</dd>
                      <dt tw="font-semibold">Item Count</dt>{' '}
                      <dd>{order.items.length}</dd>
                      <dt tw="font-semibold">Order placed</dt>
                      <dd>
                        <time dateTime={order.orderDate}>
                          {' '}
                          {order.orderDate}
                        </time>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainerStyles>
      </ContainerStyles>
    </PleaseSignIn>
  );
}

SingleOrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.any,
  }),
};

export default SingleOrderPage;
