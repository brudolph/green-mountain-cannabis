import PropTypes from 'prop-types';
import Header from './Header';
import 'twin.macro';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h1 tw="text-2xl font-bold">Page Component</h1>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes,
};
