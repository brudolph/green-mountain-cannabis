import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import tw from 'twin.macro';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import formatMoney from '../lib/formatMoney';
import PleaseSignIn from '../components/PleaseSignIn';
import { useUser } from '../components/User';
import { MyLink } from '../components/MyLink';
import { Processing } from '../styles/Form';
import LoadingIcon from '../components/icons/LoadingIcon';
import DisplayError from '../components/ErrorMessage';
import { PageContainerStyles, ContainerStyles } from '../styles/OrderStyles';
import ImageWithFallback from '../components/FallbackImage.tsx';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($userid: ID) {
    orders(where: { user: { id: { equals: $userid } } }) {
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

// function countItemsInAnOrder(order) {
//   return order.items.reduce((tally, item) => tally + item.quantity, 0);
// }

export default function OrdersPage() {
  const user = useUser();
  const userid = user?.id;
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
    variables: {
      userid,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (!user) return <PleaseSignIn />;

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
    );

  if (error) return <DisplayError error={error} />;
  const { orders } = data;

  return (
    <PleaseSignIn>
      <Head>
        <title>Your Orders ({orders.length}) | Green Mountain Cannabis</title>
      </Head>
      <ContainerStyles hasBgPrimaryLight20>
        <PageContainerStyles>
          <h1 tw="text-center">Order history</h1>
          <div tw="mx-auto max-w-4xl sm:px-2 lg:px-0 mt-10">
            <h2>You have {orders.length} orders</h2>
          </div>

          <div tw="mt-10">
            <h2 tw="sr-only">Recent orders</h2>
            <div tw="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div tw="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    tw="bg-white border-t border-b border-gray-200 shadow-md sm:rounded-lg sm:border"
                  >
                    <div tw="flex items-center justify-between p-4  sm:px-6 sm:pt-6 sm:pb-2">
                      <dl tw="grid flex-1 grid-cols-1 text-base gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt tw="font-semibold text-gray-900">Order number</dt>
                          <dd tw="mt-1 text-gray-500">{order.id}</dd>
                        </div>
                        <div tw="hidden sm:block">
                          <dt tw="font-semibold text-gray-900">Date placed</dt>
                          <dd tw="mt-1 text-gray-500">
                            <time dateTime={order.createdDatetime}>
                              {order.orderDate}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt tw="font-semibold text-gray-900">Total amount</dt>
                          <dd tw="mt-1 font-medium text-gray-900">
                            <p>{formatMoney(order.total)}</p>
                          </dd>
                        </div>
                      </dl>

                      <Menu as="div" tw="relative flex justify-end lg:hidden">
                        <div tw="flex items-center">
                          <Menu.Button tw="flex items-center p-2 -m-2 text-gray-400 hover:text-gray-500">
                            <span tw="sr-only">
                              Options for order {order.id}
                            </span>
                            <DotsVerticalIcon tw="w-6 h-6" aria-hidden="true" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items tw="absolute right-0 z-10 w-40 mt-2 origin-bottom-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div tw="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href={order.href}
                                    css={[
                                      active
                                        ? tw`text-gray-900 bg-gray-100`
                                        : tw`text-gray-700`,
                                      tw`block px-4 py-2 text-sm`,
                                    ]}
                                  >
                                    View
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      <div tw="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        <MyLink href={`/order/${order.id}`}>View Order</MyLink>
                      </div>
                    </div>

                    {/* Products */}
                    <h3 tw="sr-only">Items</h3>
                    <ul tw="divide-y divide-gray-200">
                      {order.items.map((product) => (
                        <li key={product.id} tw="p-4 sm:p-6">
                          <ul tw="font-medium text-gray-900 sm:flex sm:justify-between">
                            <li tw="flex">
                              <ImageWithFallback
                                tw="object-cover"
                                width={128}
                                height={96}
                                layout="fixed"
                                alt={product.name}
                                src={
                                  product?.photo
                                    ? product?.photo?.image?.publicUrl
                                    : '/failed.jpg'
                                }
                              />
                              <p tw="ml-6">{product.name}</p>
                            </li>
                            <li tw="mt-2 sm:mt-0">
                              <span>Price:</span> {formatMoney(product.price)}
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainerStyles>
      </ContainerStyles>
    </PleaseSignIn>
  );
}
