import PropTypes from 'prop-types';
import 'twin.macro';
import GlobalStyles from './styles/GlobalStyles';
import Header from './Header';
import Footer from './Footer';

export default function Page({ children }) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <div tw="bg-primary-light/20">{children}</div>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
