import 'twin.macro';
// import { useUser } from './User';
import { FooterStyles } from '../styles/FooterStyles';
import { footerNav } from './config/footerNav';
import Logo from '../public/static/logo-icon.svg';

export default function Footer() {
  return (
    <FooterStyles>
      <div tw="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div tw="grid grid-cols-12 gap-x-12 items-start">
          <div tw="col-span-6 flex items-center space-x-10 max-w-md">
            <img src={Logo} tw="h-16" alt="Green Mountain Cannabis" />
            <p tw="text-base text-gray-500">
              We bring you wonderful things. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit.
            </p>
          </div>
          <div tw="col-span-6 grid grid-cols-2 gap-8">
            <div tw="mt-12 md:mt-0">
              <h3 tw="text-base font-medium text-gray-900">Customer Service</h3>
              <ul tw="mt-4 space-y-4">
                {footerNav.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      tw="text-base text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 tw="text-base font-medium text-gray-900">Company</h3>
              <ul tw="mt-4 space-y-4">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      tw="text-base text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div tw="pt-8 mt-12 border-t border-gray-200">
          <p tw="text-base text-gray-400 xl:text-center">
            &copy; 2020 Green Mountain Cannabis, All rights reserved.
          </p>
        </div>
      </div>
    </FooterStyles>
  );
}
