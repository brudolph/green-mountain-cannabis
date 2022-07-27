import PropTypes from 'prop-types';
import 'twin.macro';
import GlobalStyles from './styles/GlobalStyles';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <GlobalStyles />
      <Header />
        <div tw="bg-primary-light/20">
          <div tw="mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            {children}
          </div>
        </div>
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
