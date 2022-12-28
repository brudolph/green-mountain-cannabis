import PropTypes from 'prop-types';
import RequestReset from '../components/RequestReset';
import 'twin.macro';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <div tw="bg-primary-light/20 pt-8 overflow-auto">
          <p tw="text-center font-bold text-xl">
            Sorry, you'll need a token to reset your password.
          </p>
          <p tw="text-center mt-2">
            Fill out the form below to request a password reset.
          </p>
        </div>
        <RequestReset />
      </div>
    );
  }
  return <Reset token={query.token} />;
}

ResetPage.propTypes = {
  query: PropTypes.shape({
    token: PropTypes.string,
  }),
};
