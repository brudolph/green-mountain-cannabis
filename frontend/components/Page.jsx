import PropTypes from 'prop-types';
import 'twin.macro';
import GlobalStyles from './styles/GlobalStyles';
import Header from './Header';
import SignIn from './SignIn';
import { useUser } from './User';

export default function Page({ children }) {
  const user = useUser();
  return (
    <>
      <GlobalStyles />
      <Header />
      {user && (
        <div tw="bg-primary-light/20">
          <div tw="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            {children}
          </div>
        </div>
      )}
      {!user && (
        <div tw="bg-primary-light/20">
          <div tw="max-w-xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:px-8">
            <SignIn />
          </div>
        </div>
      )}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
