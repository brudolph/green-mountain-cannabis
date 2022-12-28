import tw, { styled } from 'twin.macro';
import React from 'react';

import PropTypes from 'prop-types';

const ErrorStyles = styled.div(tw`p-8 my-8 bg-white border-l-8 border-red-500`);

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error" tw="mb-0">
          <strong tw="font-bold mr-4">Oh No!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error" tw="mb-0">
        <strong tw="font-bold mr-4">Oh No!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
