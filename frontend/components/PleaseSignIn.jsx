import PropTypes from 'prop-types';
import { useUser } from './User';
import SignIn from './SignIn';
import NeedsApproved from './NeedsApproved';

function PleaseSignIn({ children }) {
  const user = useUser();
  // 1. Check if they are logged in
  if (!user) return <SignIn />;
  // 2. Check if they have the correct permissions
  if (user?.role?.name === 'NeedsApproved') return <NeedsApproved />;
  return children;
}

PleaseSignIn.propTypes = {
  children: PropTypes.any,
};

export default PleaseSignIn;
