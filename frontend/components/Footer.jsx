import 'twin.macro';
import { useUser } from './User';
import { FooterStyles } from './styles/FooterStyles';

export default function Footer() {
  const user = useUser();
  return (
    <FooterStyles>
      <div tw="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {user && (
          <div tw="py-16">
            <div tw="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
              <div tw="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
                <img src="/images/logo-icon.svg" alt="" tw="h-12 w-auto" />
              </div>
              <div tw="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                <div tw="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 tw="text-sm font-medium text-gray-900">Products</h3>
                    <ul tw="mt-6 space-y-6">
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Flower
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Pre Rolls
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Concentrates
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Trim
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Fresh Frozen
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Oil
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          CBD oils and isolates
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Grow &amp; Lab Equipment
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Licenses For Sale
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 tw="text-sm font-medium text-gray-900">Company</h3>
                    <ul tw="mt-6 space-y-6">
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Who we are
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Sustainability
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Press
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Careers
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li tw="text-sm">
                        <a href="/" tw="text-gray-500 hover:text-gray-600">
                          Privacy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 tw="text-sm font-medium text-gray-900">
                    Customer Service
                  </h3>
                  <ul tw="mt-6 space-y-6">
                    <li tw="text-sm">
                      <a href="/" tw="text-gray-500 hover:text-gray-600">
                        Contact
                      </a>
                    </li>
                    <li tw="text-sm">
                      <a href="/" tw="text-gray-500 hover:text-gray-600">
                        Shipping
                      </a>
                    </li>
                    <li tw="text-sm">
                      <a href="/" tw="text-gray-500 hover:text-gray-600">
                        Returns
                      </a>
                    </li>
                    <li tw="text-sm">
                      <a href="/" tw="text-gray-500 hover:text-gray-600">
                        Warranty
                      </a>
                    </li>
                    <li tw="text-sm">
                      <a href="/" tw="text-gray-500 hover:text-gray-600">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div tw="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                <h3 tw="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p tw="mt-6 text-sm text-gray-500">
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form tw="mt-2 flex sm:max-w-md">
                  <label htmlFor="email-address" tw="sr-only">
                    Email address
                  </label>{' '}
                  <input
                    id="email-address"
                    autoComplete="email"
                    required=""
                    tw="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-primary-dark"
                  />
                  <div tw="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      tw="w-full bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div tw="border-t border-gray-100 py-10 text-center">
          <p tw="text-sm text-gray-500">
            © 2022 Green Mountain Cannabis, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </FooterStyles>
  );
}
