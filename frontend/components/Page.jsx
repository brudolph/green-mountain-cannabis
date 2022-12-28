import PropTypes from 'prop-types';
import 'twin.macro';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Footer from './Footer';

export default function Page({ children }) {
  return (
    <>
      <GlobalStyles />
      <Header />
      {children}
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
